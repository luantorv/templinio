// SPDX-License-Identifier: AGPL-3.0-only

import { templinioDatasetSchema } from "@templinio/schema";
import snapshot from "../public/datasets/catalog.json";
import { categoryLabels } from "./lifecycle";
import { getReleaseCycleSlug } from "./release-cycle";

export const dataset = templinioDatasetSchema.parse(snapshot);

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

export function getReleaseCycleRecord(technologyId: string, cycleSlug: string) {
  const technology = dataset.technologies.find(({ id }) => id === technologyId);
  const cycle = dataset.releaseCycles.find(
    (candidate) =>
      candidate.technologyId === technologyId && getReleaseCycleSlug(candidate) === cycleSlug,
  );

  if (!technology || !cycle) {
    return undefined;
  }

  const events = dataset.events.filter(({ releaseCycleId }) => releaseCycleId === cycle.id);
  const referencedSourceIds = new Set([
    ...technology.sourceIds,
    ...cycle.sourceIds,
    ...events.flatMap(({ sourceIds }) => sourceIds),
  ]);
  const sources = dataset.sources.filter(({ id }) => referencedSourceIds.has(id));

  return { technology, cycle, events, sources };
}
