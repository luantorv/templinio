# SPDX-License-Identifier: AGPL-3.0-only

"""Command-line entry point for validating and publishing snapshots."""

from __future__ import annotations

import argparse
from pathlib import Path

from .catalog import load_catalog_products, normalize_catalog, publish_catalog
from .io import fetch_product, fetch_products, load_json, publish_json
from .normalize import normalize_endoflife_product
from .validate import validate_dataset


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="templinio-etl")
    commands = parser.add_subparsers(dest="command", required=True)

    validate = commands.add_parser("validate", help="validate a Templinio dataset")
    validate.add_argument("input", type=Path, nargs="+")

    transform = commands.add_parser("transform", help="normalize a saved API response")
    transform.add_argument("input", type=Path)
    transform.add_argument("output", type=Path)

    fetch = commands.add_parser("fetch", help="fetch, validate and atomically publish a product")
    fetch.add_argument("product")
    fetch.add_argument("output", type=Path)

    catalog = commands.add_parser(
        "fetch-catalog", help="fetch, validate and publish the configured Atlas catalog"
    )
    catalog.add_argument("config", type=Path)
    catalog.add_argument("output", type=Path)
    return parser


def main() -> None:
    arguments = _parser().parse_args()
    if arguments.command == "validate":
        for input_path in arguments.input:
            validate_dataset(load_json(input_path))
            print(f"valid: {input_path}")
        return

    if arguments.command == "fetch-catalog":
        products = load_catalog_products(load_json(arguments.config))
        product_ids = [product["id"] for product in products]
        datasets = normalize_catalog(fetch_products(product_ids), products)
        publish_catalog(datasets, arguments.output)
        print(f"published: {len(datasets)} products to {arguments.output}")
        return

    payload = (
        load_json(arguments.input)
        if arguments.command == "transform"
        else fetch_product(arguments.product)
    )
    dataset = normalize_endoflife_product(payload)
    validate_dataset(dataset)
    publish_json(dataset, arguments.output)
    print(f"published: {arguments.output}")


if __name__ == "__main__":
    main()
