// SPDX-License-Identifier: AGPL-3.0-only

import fixture from "../../../data/fixtures/templinio.fixture.json";
import { describe, expect, it } from "vitest";
import { templinioDatasetSchema } from "../src/index";

describe("templinioDatasetSchema", () => {
  it("accepts the foundation fixture", () => {
    expect(templinioDatasetSchema.parse(fixture)).toEqual(fixture);
  });

  it("rejects dangling source references", () => {
    const invalid = structuredClone(fixture);
    invalid.technologies[0].sourceIds = ["missing-source"];

    expect(() => templinioDatasetSchema.parse(invalid)).toThrow(/Unknown source id/);
  });
});
