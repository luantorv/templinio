// SPDX-License-Identifier: AGPL-3.0-only

import { describe, expect, it } from "vitest";
import { datasetAgeInDays, isDatasetStale } from "./freshness";

describe("dataset freshness", () => {
  const now = Date.parse("2026-11-27T12:00:00Z");

  it("measures completed days without reporting future snapshots as negative", () => {
    expect(datasetAgeInDays("2026-11-25T00:00:00Z", now)).toBe(2);
    expect(datasetAgeInDays("2026-11-28T00:00:00Z", now)).toBe(0);
  });

  it("marks a snapshot stale at the configured boundary", () => {
    expect(isDatasetStale("2026-11-14T12:00:00Z", now)).toBe(false);
    expect(isDatasetStale("2026-11-13T12:00:00Z", now)).toBe(true);
  });
});
