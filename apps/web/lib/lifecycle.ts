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
