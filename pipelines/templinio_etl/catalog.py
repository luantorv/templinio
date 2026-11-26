# SPDX-License-Identifier: AGPL-3.0-only

"""Build and publish a multi-technology Atlas snapshot."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from .io import publish_json
from .normalize import normalize_endoflife_product
from .validate import DatasetValidationError, validate_dataset


def load_catalog_products(config: dict[str, Any]) -> list[dict[str, str]]:
    products = config.get("products")
    if not isinstance(products, list) or not products:
        raise DatasetValidationError("catalog.products: expected a non-empty array")

    normalized: list[dict[str, str]] = []
    seen: set[str] = set()
    for index, product in enumerate(products):
        location = f"catalog.products[{index}]"
        if not isinstance(product, dict):
            raise DatasetValidationError(f"{location}: expected an object")
        product_id = product.get("id")
        description = product.get("description")
        if not isinstance(product_id, str) or not product_id:
            raise DatasetValidationError(f"{location}.id: expected a product id")
        if product_id in seen:
            raise DatasetValidationError(f"{location}.id: duplicate product")
        if not isinstance(description, str) or not description.strip():
            raise DatasetValidationError(f"{location}.description: expected text")
        seen.add(product_id)
        normalized.append({"id": product_id, "description": description.strip()})
    return normalized


def normalize_catalog(
    payload: dict[str, Any], products: list[dict[str, str]]
) -> list[dict[str, Any]]:
    generated_at = payload.get("generated_at")
    results = payload.get("result")
    if not isinstance(results, list):
        raise DatasetValidationError("source.result: expected a product array")

    products_by_id = {
        product.get("name"): product
        for product in results
        if isinstance(product, dict) and isinstance(product.get("name"), str)
    }
    missing = [product["id"] for product in products if product["id"] not in products_by_id]
    if missing:
        raise DatasetValidationError(f"source.result: missing products: {', '.join(missing)}")

    datasets = [
        normalize_endoflife_product(
            {"generated_at": generated_at, "result": products_by_id[product["id"]]},
            description=product["description"],
        )
        for product in products
    ]
    for dataset in datasets:
        validate_dataset(dataset)
    return datasets


def merge_datasets(datasets: list[dict[str, Any]]) -> dict[str, Any]:
    if not datasets:
        raise DatasetValidationError("catalog: expected at least one dataset")

    merged = {
        "schemaVersion": "0.1.0",
        "generatedAt": max(dataset["generatedAt"] for dataset in datasets),
        "sources": [],
        "technologies": [],
        "releaseCycles": [],
        "events": [],
    }
    for dataset in datasets:
        for collection in ("sources", "technologies", "releaseCycles", "events"):
            merged[collection].extend(dataset[collection])
    validate_dataset(merged)
    return merged


def publish_catalog(datasets: list[dict[str, Any]], destination: Path) -> None:
    """Publish product files first and the aggregate snapshot only after all succeed."""
    aggregate = merge_datasets(datasets)
    for dataset in datasets:
        technology_id = dataset["technologies"][0]["id"]
        publish_json(dataset, destination / f"{technology_id}.json")
    publish_json(aggregate, destination / "catalog.json")
