// SPDX-License-Identifier: AGPL-3.0-only

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

export const supportStatusLabels = {
  active: "Active",
  ended: "Ended",
  "not-applicable": "Not applicable",
  unknown: "Unknown",
} as const;

export const eventTypeLabels = {
  release: "Release",
  "lts-start": "LTS start",
  "active-support-end": "Active support end",
  "end-of-life": "End of life",
  "extended-support-end": "Extended support end",
  milestone: "Milestone",
} as const;
