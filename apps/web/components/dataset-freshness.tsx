// SPDX-License-Identifier: AGPL-3.0-only

"use client";

import { useSyncExternalStore } from "react";
import { datasetAgeInDays, isDatasetStale } from "@/lib/freshness";

const CHECK_INTERVAL_MS = 60 * 60 * 1000;

function subscribe(callback: () => void) {
  const interval = window.setInterval(callback, CHECK_INTERVAL_MS);
  return () => window.clearInterval(interval);
}

type DatasetFreshnessProps = {
  generatedAt: string;
};

export function DatasetFreshness({ generatedAt }: DatasetFreshnessProps) {
  const isStale = useSyncExternalStore(
    subscribe,
    () => isDatasetStale(generatedAt),
    () => false,
  );

  if (!isStale) {
    return null;
  }

  const ageInDays = datasetAgeInDays(generatedAt);

  return (
    <p className="freshness-notice" role="status">
      <strong>Freshness warning.</strong> This snapshot is {ageInDays} days old. Check its sources
      before relying on recent lifecycle changes.
    </p>
  );
}
