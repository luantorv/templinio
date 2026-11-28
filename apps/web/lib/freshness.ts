// SPDX-License-Identifier: AGPL-3.0-only

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const DATASET_STALE_AFTER_DAYS = 14;

export function datasetAgeInDays(generatedAt: string, now = Date.now()) {
  const generatedAtTimestamp = Date.parse(generatedAt);

  if (Number.isNaN(generatedAtTimestamp)) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.max(0, Math.floor((now - generatedAtTimestamp) / MILLISECONDS_PER_DAY));
}

export function isDatasetStale(
  generatedAt: string,
  now = Date.now(),
  staleAfterDays = DATASET_STALE_AFTER_DAYS,
) {
  return datasetAgeInDays(generatedAt, now) >= staleAfterDays;
}
