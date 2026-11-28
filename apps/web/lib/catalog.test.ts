// SPDX-License-Identifier: AGPL-3.0-only

import { describe, expect, it } from "vitest";
import { catalog, getReleaseCycleRecord, getTechnologyRecord } from "./catalog";
import { getReleaseCycleSlug } from "./release-cycle";

describe("catalog", () => {
  it("summarizes technologies from the validated dataset", () => {
    const node = catalog.find(({ id }) => id === "nodejs");

    expect(catalog).toHaveLength(15);
    expect(node).toEqual(expect.objectContaining({ id: "nodejs", categoryLabel: "Runtime" }));
    expect(node?.cycleCount).toBeGreaterThan(0);
    expect(node?.activeCycleCount).toBeGreaterThan(0);
  });

  it("collects lifecycle records and their referenced sources", () => {
    const record = getTechnologyRecord("nodejs");

    expect(record?.releaseCycles.length).toBeGreaterThan(0);
    expect(record?.events.length).toBeGreaterThanOrEqual((record?.releaseCycles.length ?? 0) * 2);
    expect(record?.sources.map(({ id }) => id)).toEqual(["endoflife-date-nodejs"]);
  });

  it("resolves a stable release-cycle route", () => {
    const technology = getTechnologyRecord("nodejs");
    const cycle = technology?.releaseCycles[0];

    expect(cycle).toBeDefined();
    const record = getReleaseCycleRecord("nodejs", getReleaseCycleSlug(cycle!));
    expect(record?.cycle.id).toBe(cycle?.id);
    expect(record?.events.every(({ releaseCycleId }) => releaseCycleId === cycle?.id)).toBe(true);
  });

  it("returns undefined for an unknown technology", () => {
    expect(getTechnologyRecord("missing")).toBeUndefined();
  });
});
