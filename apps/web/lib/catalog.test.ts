// SPDX-License-Identifier: AGPL-3.0-only

import { describe, expect, it } from "vitest";
import { catalog, getTechnologyRecord } from "./catalog";

describe("catalog", () => {
  it("summarizes technologies from the validated dataset", () => {
    expect(catalog).toEqual([
      expect.objectContaining({
        id: "nodejs",
        categoryLabel: "Runtime",
        cycleCount: 3,
        activeCycleCount: 1,
      }),
    ]);
  });

  it("collects lifecycle records and their referenced sources", () => {
    const record = getTechnologyRecord("nodejs");

    expect(record?.releaseCycles).toHaveLength(3);
    expect(record?.events).toHaveLength(3);
    expect(record?.sources.map(({ id }) => id)).toEqual(["endoflife-date-nodejs"]);
  });

  it("returns undefined for an unknown technology", () => {
    expect(getTechnologyRecord("missing")).toBeUndefined();
  });
});
