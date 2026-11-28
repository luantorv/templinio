# SPDX-License-Identifier: AGPL-3.0-only

"""Safe network and filesystem operations for the ETL."""

from __future__ import annotations

import json
import os
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

API_ROOT = "https://endoflife.date/api/v1/products"
RETRYABLE_HTTP_STATUSES = frozenset({429, 500, 502, 503, 504})
MAX_RETRY_DELAY_SECONDS = 30.0


def _retry_delay(error: HTTPError | URLError | TimeoutError, attempt: int) -> float:
    if isinstance(error, HTTPError) and error.headers:
        retry_after = error.headers.get("Retry-After")
        if retry_after:
            try:
                return min(max(float(retry_after), 0.0), MAX_RETRY_DELAY_SECONDS)
            except ValueError:
                pass
    return min(2**attempt, MAX_RETRY_DELAY_SECONDS)


def fetch_product(
    product: str,
    timeout: float = 20.0,
    max_attempts: int = 4,
) -> dict[str, Any]:
    """Fetch one product, retrying only rate limits and transient network failures."""
    if max_attempts < 1:
        raise ValueError("max_attempts must be at least 1")

    request = Request(
        f"{API_ROOT}/{product}/",
        headers={"Accept": "application/json", "User-Agent": "templinio-etl/0.1.0"},
    )
    for attempt in range(max_attempts):
        try:
            with urlopen(request, timeout=timeout) as response:  # noqa: S310 — constant HTTPS root
                if response.status != 200:
                    raise RuntimeError(f"endoflife.date returned HTTP {response.status}")
                return json.load(response)
        except HTTPError as error:
            if error.code not in RETRYABLE_HTTP_STATUSES or attempt == max_attempts - 1:
                raise RuntimeError(f"endoflife.date returned HTTP {error.code}") from error
            time.sleep(_retry_delay(error, attempt))
        except (TimeoutError, URLError) as error:
            if attempt == max_attempts - 1:
                raise RuntimeError("endoflife.date request failed after retries") from error
            time.sleep(_retry_delay(error, attempt))

    raise AssertionError("unreachable")


def fetch_products(products: list[str], max_workers: int = 4) -> dict[str, Any]:
    """Fetch a bounded product set concurrently and expose it as one source response."""
    with ThreadPoolExecutor(max_workers=min(max_workers, len(products))) as executor:
        payloads = list(executor.map(fetch_product, products))
    return {
        "generated_at": max(payload["generated_at"] for payload in payloads),
        "result": [payload["result"] for payload in payloads],
    }


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as stream:
        return json.load(stream)


def publish_json(dataset: dict[str, Any], destination: Path) -> None:
    """Atomically replace the published snapshot after validation has succeeded."""
    destination.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(
        prefix=f".{destination.name}.", suffix=".tmp", dir=destination.parent
    )
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as stream:
            json.dump(dataset, stream, indent=2, ensure_ascii=False)
            stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary_name, destination)
    except BaseException:
        Path(temporary_name).unlink(missing_ok=True)
        raise


def publish_text(content: str, destination: Path) -> None:
    """Atomically replace a UTF-8 text artifact."""
    destination.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(
        prefix=f".{destination.name}.", suffix=".tmp", dir=destination.parent
    )
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as stream:
            stream.write(content)
            if not content.endswith("\n"):
                stream.write("\n")
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary_name, destination)
    except BaseException:
        Path(temporary_name).unlink(missing_ok=True)
        raise
