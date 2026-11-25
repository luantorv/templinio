# SPDX-License-Identifier: AGPL-3.0-only

from __future__ import annotations

import copy
import unittest
from pathlib import Path

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


if __name__ == "__main__":
    unittest.main()
