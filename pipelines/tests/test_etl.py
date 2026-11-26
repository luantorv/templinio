# SPDX-License-Identifier: AGPL-3.0-only

from __future__ import annotations

import copy
import tempfile
import unittest
from pathlib import Path

from pipelines.templinio_etl.catalog import (
    load_catalog_products,
    merge_datasets,
    normalize_catalog,
    publish_catalog,
)
from pipelines.templinio_etl.io import load_json
from pipelines.templinio_etl.normalize import normalize_endoflife_product
from pipelines.templinio_etl.validate import DatasetValidationError, validate_dataset

FIXTURE = Path(__file__).parents[2] / "data" / "fixtures" / "endoflife-date.nodejs.json"


class EndOfLifePipelineTest(unittest.TestCase):
    def setUp(self) -> None:
        self.dataset = normalize_endoflife_product(load_json(FIXTURE))

    def test_normalizes_known_scheduled_and_unknown_dates(self) -> None:
        statuses = {event["dateStatus"] for event in self.dataset["events"]}
        self.assertEqual(statuses, {"occurred", "scheduled", "unknown"})
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


if __name__ == "__main__":
    unittest.main()
