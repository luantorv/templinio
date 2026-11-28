# SPDX-License-Identifier: AGPL-3.0-only

"""Dependency-free validation for data before static publication."""

from __future__ import annotations

import re
from datetime import date, datetime
from typing import Any
from urllib.parse import urlparse

IDENTIFIER = re.compile(r"^[a-z0-9]+(?:[.-][a-z0-9]+)*$")


class DatasetValidationError(ValueError):
    """Raised when a dataset cannot be safely published."""


def _require_keys(value: dict[str, Any], keys: set[str], location: str) -> None:
    missing = keys - value.keys()
    if missing:
        raise DatasetValidationError(f"{location}: missing {', '.join(sorted(missing))}")


def _identifier(value: Any, location: str) -> str:
    if not isinstance(value, str) or not IDENTIFIER.fullmatch(value):
        raise DatasetValidationError(f"{location}: invalid identifier")
    return value


def _date(value: Any, location: str) -> None:
    if value is None:
        return
    if not isinstance(value, str):
        raise DatasetValidationError(f"{location}: expected date or null")
    try:
        date.fromisoformat(value)
    except ValueError as error:
        raise DatasetValidationError(f"{location}: invalid ISO date") from error


def _datetime(value: Any, location: str) -> None:
    if not isinstance(value, str):
        raise DatasetValidationError(f"{location}: expected date-time")
    try:
        parsed = datetime.fromisoformat(value)
    except ValueError as error:
        raise DatasetValidationError(f"{location}: invalid ISO date-time") from error
    if parsed.tzinfo is None:
        raise DatasetValidationError(f"{location}: timezone is required")


def _url(value: Any, location: str) -> None:
    parsed = urlparse(value) if isinstance(value, str) else None
    if parsed is None or parsed.scheme != "https" or not parsed.netloc:
        raise DatasetValidationError(f"{location}: expected an HTTPS URL")


def validate_dataset(dataset: Any) -> None:
    """Validate structure, dates, URLs and entity references."""
    if not isinstance(dataset, dict):
        raise DatasetValidationError("dataset: expected an object")
    _require_keys(
        dataset,
        {"schemaVersion", "generatedAt", "sources", "technologies", "releaseCycles", "events"},
        "dataset",
    )
    if dataset["schemaVersion"] != "0.2.0":
        raise DatasetValidationError("schemaVersion: unsupported version")
    _datetime(dataset["generatedAt"], "generatedAt")

    collections = ("sources", "technologies", "releaseCycles", "events")
    if any(not isinstance(dataset[name], list) for name in collections):
        raise DatasetValidationError("entity collections must be arrays")
    if not dataset["sources"] or not dataset["technologies"]:
        raise DatasetValidationError("at least one source and technology are required")

    source_ids: set[str] = set()
    for index, source in enumerate(dataset["sources"]):
        location = f"sources[{index}]"
        _require_keys(
            source, {"id", "name", "url", "retrievedAt", "license", "licenseUrl"}, location
        )
        source_id = _identifier(source["id"], f"{location}.id")
        if source_id in source_ids:
            raise DatasetValidationError(f"{location}.id: duplicate id")
        source_ids.add(source_id)
        _url(source["url"], f"{location}.url")
        _url(source["licenseUrl"], f"{location}.licenseUrl")
        _datetime(source["retrievedAt"], f"{location}.retrievedAt")

    technology_ids: set[str] = set()
    for index, technology in enumerate(dataset["technologies"]):
        location = f"technologies[{index}]"
        _require_keys(
            technology,
            {
                "id",
                "name",
                "description",
                "category",
                "releasePolicyUrl",
                "supportPolicy",
                "aliases",
                "sourceIds",
            },
            location,
        )
        technology_id = _identifier(technology["id"], f"{location}.id")
        if technology_id in technology_ids:
            raise DatasetValidationError(f"{location}.id: duplicate id")
        technology_ids.add(technology_id)
        if technology["category"] not in {
            "runtime",
            "language",
            "framework",
            "database",
            "operating-system",
            "tool",
        }:
            raise DatasetValidationError(f"{location}.category: invalid category")
        if technology["releasePolicyUrl"] is not None:
            _url(technology["releasePolicyUrl"], f"{location}.releasePolicyUrl")
        support_policy = technology["supportPolicy"]
        if not isinstance(support_policy, dict):
            raise DatasetValidationError(f"{location}.supportPolicy: expected an object")
        _require_keys(
            support_policy,
            {"activeSupportLabel", "eolLabel", "extendedSupportLabel"},
            f"{location}.supportPolicy",
        )
        for label in ("activeSupportLabel", "extendedSupportLabel"):
            if support_policy[label] is not None and not isinstance(support_policy[label], str):
                raise DatasetValidationError(
                    f"{location}.supportPolicy.{label}: expected text or null"
                )
        if not isinstance(support_policy["eolLabel"], str) or not support_policy["eolLabel"]:
            raise DatasetValidationError(f"{location}.supportPolicy.eolLabel: expected text")
        _validate_sources(technology["sourceIds"], source_ids, f"{location}.sourceIds")

    cycle_ids: set[str] = set()
    for index, cycle in enumerate(dataset["releaseCycles"]):
        location = f"releaseCycles[{index}]"
        _require_keys(
            cycle,
            {
                "id",
                "technologyId",
                "name",
                "releaseDate",
                "ltsStartDate",
                "activeSupportEndDate",
                "activeSupportStatus",
                "eolDate",
                "extendedSupportEndDate",
                "extendedSupportStatus",
                "isLts",
                "isMaintained",
                "status",
                "sourceIds",
            },
            location,
        )
        cycle_id = _identifier(cycle["id"], f"{location}.id")
        if cycle_id in cycle_ids:
            raise DatasetValidationError(f"{location}.id: duplicate id")
        cycle_ids.add(cycle_id)
        if cycle["technologyId"] not in technology_ids:
            raise DatasetValidationError(f"{location}.technologyId: unknown technology")
        if cycle["status"] not in {"active", "end-of-life", "scheduled", "unknown"}:
            raise DatasetValidationError(f"{location}.status: invalid status")
        if cycle["isLts"] is not None and not isinstance(cycle["isLts"], bool):
            raise DatasetValidationError(f"{location}.isLts: expected boolean or null")
        if cycle["isMaintained"] is not None and not isinstance(cycle["isMaintained"], bool):
            raise DatasetValidationError(f"{location}.isMaintained: expected boolean or null")
        support_statuses = {"active", "ended", "not-applicable", "unknown"}
        for field in ("activeSupportStatus", "extendedSupportStatus"):
            if cycle[field] not in support_statuses:
                raise DatasetValidationError(f"{location}.{field}: invalid support status")
        _date(cycle["releaseDate"], f"{location}.releaseDate")
        _date(cycle["ltsStartDate"], f"{location}.ltsStartDate")
        _date(cycle["activeSupportEndDate"], f"{location}.activeSupportEndDate")
        _date(cycle["eolDate"], f"{location}.eolDate")
        _date(cycle["extendedSupportEndDate"], f"{location}.extendedSupportEndDate")
        _validate_sources(cycle["sourceIds"], source_ids, f"{location}.sourceIds")

    event_ids: set[str] = set()
    for index, event in enumerate(dataset["events"]):
        location = f"events[{index}]"
        _require_keys(
            event,
            {
                "id",
                "technologyId",
                "releaseCycleId",
                "type",
                "title",
                "date",
                "dateStatus",
                "sourceIds",
            },
            location,
        )
        event_id = _identifier(event["id"], f"{location}.id")
        if event_id in event_ids:
            raise DatasetValidationError(f"{location}.id: duplicate id")
        event_ids.add(event_id)
        if event["technologyId"] not in technology_ids:
            raise DatasetValidationError(f"{location}.technologyId: unknown technology")
        if event["releaseCycleId"] is not None and event["releaseCycleId"] not in cycle_ids:
            raise DatasetValidationError(f"{location}.releaseCycleId: unknown cycle")
        if event["type"] not in {
            "release",
            "lts-start",
            "active-support-end",
            "end-of-life",
            "extended-support-end",
            "milestone",
        }:
            raise DatasetValidationError(f"{location}.type: invalid event type")
        if event["dateStatus"] not in {"occurred", "scheduled", "estimated", "unknown"}:
            raise DatasetValidationError(f"{location}.dateStatus: invalid date status")
        if (event["date"] is None) != (event["dateStatus"] == "unknown"):
            raise DatasetValidationError(f"{location}: unknown dates must be null and explicit")
        _date(event["date"], f"{location}.date")
        _validate_sources(event["sourceIds"], source_ids, f"{location}.sourceIds")


def _validate_sources(values: Any, known: set[str], location: str) -> None:
    if not isinstance(values, list) or not values:
        raise DatasetValidationError(f"{location}: expected a non-empty array")
    for index, value in enumerate(values):
        _identifier(value, f"{location}[{index}]")
        if value not in known:
            raise DatasetValidationError(f"{location}[{index}]: unknown source")
