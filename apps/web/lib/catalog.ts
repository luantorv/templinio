// SPDX-License-Identifier: AGPL-3.0-only

import { templinioDatasetSchema } from "@templinio/schema";
import fixture from "../../../data/fixtures/templinio.fixture.json";

export const dataset = templinioDatasetSchema.parse(fixture);

export const categoryLabels = {
  runtime: "Runtime",
  language: "Language",
  framework: "Framework",
  database: "Database",
  "operating-system": "Operating system",
  tool: "Tool",
} as const;

export const cycleStatusLabels = {
  active: "Active",
  "end-of-life": "End of life",
  scheduled: "Scheduled",
  unknown: "Unknown",
} as const;

export const dateStatusLabels = {
  occurred: "Occurred",
  scheduled: "Scheduled",
  estimated: "Estimated",
  unknown: "Unknown",
} as const;

export const catalog = dataset.technologies.map((technology) => {
  const cycles = dataset.releaseCycles.filter(({ technologyId }) => technologyId === technology.id);

  return {
    ...technology,
    categoryLabel: categoryLabels[technology.category],
    cycleCount: cycles.length,
    activeCycleCount: cycles.filter(({ status }) => status === "active").length,
  };
});

export type CatalogEntry = (typeof catalog)[number];

export function getTechnologyRecord(id: string) {
  const technology = dataset.technologies.find((candidate) => candidate.id === id);

  if (!technology) {
    return undefined;
  }

  const releaseCycles = dataset.releaseCycles.filter(({ technologyId }) => technologyId === id);
  const events = dataset.events.filter(({ technologyId }) => technologyId === id);
  const referencedSourceIds = new Set([
    ...technology.sourceIds,
    ...releaseCycles.flatMap(({ sourceIds }) => sourceIds),
    ...events.flatMap(({ sourceIds }) => sourceIds),
  ]);
  const sources = dataset.sources.filter(({ id: sourceId }) => referencedSourceIds.has(sourceId));

  return { technology, releaseCycles, events, sources };
}
