// SPDX-License-Identifier: AGPL-3.0-only

import { z } from "zod";

const identifier = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/, "Use a stable lowercase identifier");

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected an ISO 8601 date");
const isoDateTime = z.string().datetime({ offset: true });

export const sourceSchema = z.object({
  id: identifier,
  name: z.string().min(1),
  url: z.string().url(),
  retrievedAt: isoDateTime,
  license: z.string().min(1),
  licenseUrl: z.string().url(),
});

export const technologySchema = z.object({
  id: identifier,
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["runtime", "language", "framework", "database", "operating-system", "tool"]),
  homepage: z.string().url(),
  aliases: z.array(z.string().min(1)).default([]),
  sourceIds: z.array(identifier).min(1),
});

export const releaseCycleSchema = z.object({
  id: identifier,
  technologyId: identifier,
  name: z.string().min(1),
  releaseDate: isoDate.nullable(),
  eolDate: isoDate.nullable(),
  isLts: z.boolean().nullable(),
  status: z.enum(["active", "end-of-life", "scheduled", "unknown"]),
  sourceIds: z.array(identifier).min(1),
});

export const eventSchema = z.object({
  id: identifier,
  technologyId: identifier,
  releaseCycleId: identifier.nullable(),
  type: z.enum(["release", "support-start", "end-of-life", "milestone"]),
  title: z.string().min(1),
  date: isoDate.nullable(),
  dateStatus: z.enum(["occurred", "scheduled", "estimated", "unknown"]),
  sourceIds: z.array(identifier).min(1),
});

export const templinioDatasetSchema = z
  .object({
    schemaVersion: z.literal("0.1.0"),
    generatedAt: isoDateTime,
    sources: z.array(sourceSchema).min(1),
    technologies: z.array(technologySchema).min(1),
    releaseCycles: z.array(releaseCycleSchema),
    events: z.array(eventSchema),
  })
  .superRefine((dataset, context) => {
    const sourceIds = new Set(dataset.sources.map(({ id }) => id));
    const technologyIds = new Set(dataset.technologies.map(({ id }) => id));
    const cycleIds = new Set(dataset.releaseCycles.map(({ id }) => id));

    const checkSources = (ids: string[], path: (string | number)[]) => {
      ids.forEach((id, index) => {
        if (!sourceIds.has(id)) {
          context.addIssue({
            code: "custom",
            message: `Unknown source id: ${id}`,
            path: [...path, index],
          });
        }
      });
    };

    dataset.technologies.forEach((technology, index) =>
      checkSources(technology.sourceIds, ["technologies", index, "sourceIds"]),
    );

    dataset.releaseCycles.forEach((cycle, index) => {
      if (!technologyIds.has(cycle.technologyId)) {
        context.addIssue({
          code: "custom",
          message: `Unknown technology id: ${cycle.technologyId}`,
          path: ["releaseCycles", index, "technologyId"],
        });
      }
      checkSources(cycle.sourceIds, ["releaseCycles", index, "sourceIds"]);
    });

    dataset.events.forEach((event, index) => {
      if (!technologyIds.has(event.technologyId)) {
        context.addIssue({
          code: "custom",
          message: `Unknown technology id: ${event.technologyId}`,
          path: ["events", index, "technologyId"],
        });
      }
      if (event.releaseCycleId && !cycleIds.has(event.releaseCycleId)) {
        context.addIssue({
          code: "custom",
          message: `Unknown release cycle id: ${event.releaseCycleId}`,
          path: ["events", index, "releaseCycleId"],
        });
      }
      checkSources(event.sourceIds, ["events", index, "sourceIds"]);
    });
  });

export type Source = z.infer<typeof sourceSchema>;
export type Technology = z.infer<typeof technologySchema>;
export type ReleaseCycle = z.infer<typeof releaseCycleSchema>;
export type Event = z.infer<typeof eventSchema>;
export type TemplinioDataset = z.infer<typeof templinioDatasetSchema>;
