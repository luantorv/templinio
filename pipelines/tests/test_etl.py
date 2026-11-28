# SPDX-License-Identifier: AGPL-3.0-only

from __future__ import annotations

import copy
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.error import HTTPError

from pipelines.templinio_etl.catalog import (
    load_catalog_products,
    merge_datasets,
    normalize_catalog,
    publish_catalog,
)
from pipelines.templinio_etl.io import fetch_product, load_json
from pipelines.templinio_etl.normalize import normalize_endoflife_product
from pipelines.templinio_etl.validate import DatasetValidationError, validate_dataset

FIXTURE = Path(__file__).parents[2] / "data" / "fixtures" / "endoflife-date.nodejs.json"


class EndOfLifePipelineTest(unittest.TestCase):
    def setUp(self) -> None:
        self.dataset = normalize_endoflife_product(load_json(FIXTURE))

    def test_normalizes_known_scheduled_and_unknown_dates(self) -> None:
        statuses = {event["dateStatus"] for event in self.dataset["events"]}
        self.assertEqual(statuses, {"occurred", "scheduled", "unknown"})
        current_cycle = self.dataset["releaseCycles"][0]
        self.assertEqual(current_cycle["ltsStartDate"], "2026-10-28")
        self.assertEqual(current_cycle["activeSupportStatus"], "active")
        self.assertEqual(current_cycle["activeSupportEndDate"], "2027-10-27")
        self.assertEqual(current_cycle["extendedSupportStatus"], "not-applicable")
        validate_dataset(self.dataset)

    def test_is_deterministic(self) -> None:
        payload = load_json(FIXTURE)
        self.assertEqual(
            normalize_endoflife_product(payload),
            normalize_endoflife_product(payload),
        )

    def test_rejects_a_dangling_source(self) -> None:
        invalid = copy.deepcopy(self.dataset)
        invalid["events"][0]["sourceIds"] = ["missing"]
        with self.assertRaisesRegex(DatasetValidationError, "unknown source"):
            validate_dataset(invalid)

    def test_builds_and_publishes_a_multi_product_catalog(self) -> None:
        source = load_json(FIXTURE)
        second_product = copy.deepcopy(source["result"])
        second_product.update(
            {
                "name": "python",
                "label": "Python",
                "aliases": [],
                "category": "lang",
                "tags": ["lang"],
                "links": {
                    "html": "https://endoflife.date/python",
                    "releasePolicy": "https://devguide.python.org/versions/",
                },
            }
        )
        products = load_catalog_products(
            {
                "products": [
                    {"id": "nodejs", "description": "JavaScript runtime."},
                    {"id": "python", "description": "Programming language."},
                ]
            }
        )
        datasets = normalize_catalog(
            {"generated_at": source["generated_at"], "result": [source["result"], second_product]},
            products,
        )
        aggregate = merge_datasets(datasets)

        self.assertEqual(
            [technology["id"] for technology in aggregate["technologies"]],
            ["nodejs", "python"],
        )
        self.assertEqual(aggregate["technologies"][1]["category"], "language")
        validate_dataset(aggregate)

        with tempfile.TemporaryDirectory() as temporary_directory:
            destination = Path(temporary_directory)
            publish_catalog(datasets, destination)
            self.assertTrue((destination / "nodejs.json").is_file())
            self.assertTrue((destination / "python.json").is_file())
            self.assertIn("# Templinio Atlas", (destination / "catalog.md").read_text())
            self.assertIn("| 26 |", (destination / "nodejs.md").read_text())
            validate_dataset(load_json(destination / "catalog.json"))

    def test_rejects_a_catalog_with_duplicate_products(self) -> None:
        with self.assertRaisesRegex(DatasetValidationError, "duplicate product"):
            load_catalog_products(
                {
                    "products": [
                        {"id": "nodejs", "description": "First."},
                        {"id": "nodejs", "description": "Duplicate."},
                    ]
                }
            )

    @patch("pipelines.templinio_etl.io.time.sleep")
    @patch("pipelines.templinio_etl.io.urlopen")
    def test_retries_a_transient_source_error(self, urlopen, sleep) -> None:
        payload = load_json(FIXTURE)
        response = io.BytesIO(json.dumps(payload).encode())
        response.status = 200
        urlopen.side_effect = [
            HTTPError(
                "https://endoflife.date/api/v1/products/nodejs/",
                503,
                "Service unavailable",
                {},
                None,
            ),
            response,
        ]

        self.assertEqual(fetch_product("nodejs"), payload)
        self.assertEqual(urlopen.call_count, 2)
        sleep.assert_called_once_with(1)

    @patch("pipelines.templinio_etl.io.time.sleep")
    @patch("pipelines.templinio_etl.io.urlopen")
    def test_does_not_retry_a_permanent_source_error(self, urlopen, sleep) -> None:
        urlopen.side_effect = HTTPError(
            "https://endoflife.date/api/v1/products/missing/",
            404,
            "Not found",
            {},
            None,
        )

        with self.assertRaisesRegex(RuntimeError, "HTTP 404"):
            fetch_product("missing")
        self.assertEqual(urlopen.call_count, 1)
        sleep.assert_not_called()


if __name__ == "__main__":
    unittest.main()
