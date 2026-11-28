# SPDX-License-Identifier: AGPL-3.0-only

"""Normalize the documented endoflife.date v1 product response."""

from __future__ import annotations

import re
from datetime import date, datetime
from typing import Any

SOURCE_LICENSE_URL = "https://github.com/endoflife-date/endoflife.date/blob/master/LICENSE"
NON_IDENTIFIER_CHARACTERS = re.compile(r"[^a-z0-9]+")


def _event_date_status(value: str | None, generated_on: date) -> str:
    if value is None:
        return "unknown"
    return "scheduled" if date.fromisoformat(value) > generated_on else "occurred"


def _cycle_status(release: dict[str, Any], generated_on: date) -> str:
    release_date = release.get("releaseDate")
    eol_date = release.get("eolFrom")
    if release_date and date.fromisoformat(release_date) > generated_on:
        return "scheduled"
    if release.get("isEol") is True:
        return "end-of-life" if eol_date else "unknown"
    if release.get("isEol") is False:
        return "active"
    return "unknown"


def _support_status(
    release: dict[str, Any], field: str, *, policy_applies: bool, nullable: bool = False
) -> str:
    if not policy_applies:
        return "not-applicable"
    if field not in release:
        return "unknown"
    value = release[field]
    if value is True:
        return "ended"
    if value is False:
        return "active"
    if nullable and value is None:
        return "not-applicable"
    return "unknown"


def _category(product: dict[str, Any]) -> str:
    tags = set(product.get("tags", []))
    if "javascript-runtime" in tags:
        return "runtime"
    if "lang" in tags:
        return "language"
    category = product.get("category")
    if category in {"runtime", "language", "framework", "database", "operating-system", "tool"}:
        return category
    if category in {"lang", "programming-language"}:
        return "language"
    if category in {"os", "linux-distribution"}:
        return "operating-system"
    return "tool"


def _identifier_part(value: str) -> str:
    return NON_IDENTIFIER_CHARACTERS.sub("-", value.lower()).strip("-")


def normalize_endoflife_product(
    payload: dict[str, Any], *, description: str | None = None
) -> dict[str, Any]:
    """Convert a documented API v1 product response to the Templinio schema."""
    product = payload["result"]
    generated_at = payload["generated_at"]
    generated_on = datetime.fromisoformat(generated_at).date()
    technology_id = product["name"]
    source_id = f"endoflife-date-{technology_id}"
    source_url = product.get("links", {}).get("html", f"https://endoflife.date/{technology_id}")
    labels = product.get("labels", {})
    active_support_label = labels.get("eoas")
    eol_label = labels.get("eol") or "End of life"
    extended_support_label = labels.get("eoes")

    cycles: list[dict[str, Any]] = []
    events: list[dict[str, Any]] = []
    for release in product.get("releases", []):
        cycle_id = f"{technology_id}-{_identifier_part(release['name'])}"
        release_date = release.get("releaseDate")
        lts_start_date = release.get("ltsFrom")
        active_support_end_date = release.get("eoasFrom")
        eol_date = release.get("eolFrom")
        extended_support_end_date = release.get("eoesFrom")
        active_support_status = _support_status(
            release, "isEoas", policy_applies=active_support_label is not None
        )
        extended_support_status = _support_status(
            release,
            "isEoes",
            policy_applies=extended_support_label is not None,
            nullable=True,
        )
        cycles.append(
            {
                "id": cycle_id,
                "technologyId": technology_id,
                "name": release["name"],
                "releaseDate": release_date,
                "ltsStartDate": lts_start_date,
                "activeSupportEndDate": active_support_end_date,
                "activeSupportStatus": active_support_status,
                "eolDate": eol_date,
                "extendedSupportEndDate": extended_support_end_date,
                "extendedSupportStatus": extended_support_status,
                "isLts": release.get("isLts"),
                "isMaintained": release.get("isMaintained"),
                "status": _cycle_status(release, generated_on),
                "sourceIds": [source_id],
            }
        )
        events.append(
            {
                "id": f"{cycle_id}-release",
                "technologyId": technology_id,
                "releaseCycleId": cycle_id,
                "type": "release",
                "title": f"{product['label']} {release['name']} released",
                "date": release_date,
                "dateStatus": _event_date_status(release_date, generated_on),
                "sourceIds": [source_id],
            }
        )
        if release.get("isLts") is True and lts_start_date:
            events.append(
                {
                    "id": f"{cycle_id}-lts-start",
                    "technologyId": technology_id,
                    "releaseCycleId": cycle_id,
                    "type": "lts-start",
                    "title": f"{product['label']} {release['name']} LTS starts",
                    "date": lts_start_date,
                    "dateStatus": _event_date_status(lts_start_date, generated_on),
                    "sourceIds": [source_id],
                }
            )
        if active_support_status != "not-applicable":
            events.append(
                {
                    "id": f"{cycle_id}-active-support-end",
                    "technologyId": technology_id,
                    "releaseCycleId": cycle_id,
                    "type": "active-support-end",
                    "title": f"{product['label']} {release['name']} active support ends",
                    "date": active_support_end_date,
                    "dateStatus": _event_date_status(active_support_end_date, generated_on),
                    "sourceIds": [source_id],
                }
            )
        events.append(
            {
                "id": f"{cycle_id}-eol",
                "technologyId": technology_id,
                "releaseCycleId": cycle_id,
                "type": "end-of-life",
                "title": (
                    f"{product['label']} {release['name']} end of life"
                    if eol_date
                    else f"{product['label']} {release['name']} end-of-life date is unknown"
                ),
                "date": eol_date,
                "dateStatus": _event_date_status(eol_date, generated_on),
                "sourceIds": [source_id],
            }
        )
        if extended_support_status != "not-applicable":
            events.append(
                {
                    "id": f"{cycle_id}-extended-support-end",
                    "technologyId": technology_id,
                    "releaseCycleId": cycle_id,
                    "type": "extended-support-end",
                    "title": f"{product['label']} {release['name']} extended support ends",
                    "date": extended_support_end_date,
                    "dateStatus": _event_date_status(extended_support_end_date, generated_on),
                    "sourceIds": [source_id],
                }
            )

    return {
        "schemaVersion": "0.2.0",
        "generatedAt": generated_at,
        "sources": [
            {
                "id": source_id,
                "name": f"endoflife.date — {product['label']}",
                "url": source_url,
                "retrievedAt": generated_at,
                "license": "MIT",
                "licenseUrl": SOURCE_LICENSE_URL,
            }
        ],
        "technologies": [
            {
                "id": technology_id,
                "name": product["label"],
                "description": description or f"Lifecycle information for {product['label']}.",
                "category": _category(product),
                "releasePolicyUrl": product.get("links", {}).get("releasePolicy"),
                "supportPolicy": {
                    "activeSupportLabel": active_support_label,
                    "eolLabel": eol_label,
                    "extendedSupportLabel": extended_support_label,
                },
                "aliases": product.get("aliases", []),
                "sourceIds": [source_id],
            }
        ],
        "releaseCycles": cycles,
        "events": events,
    }
