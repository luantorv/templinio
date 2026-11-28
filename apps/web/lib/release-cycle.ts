// SPDX-License-Identifier: AGPL-3.0-only

import type { ReleaseCycle } from "@templinio/schema";

export function getReleaseCycleSlug(cycle: ReleaseCycle) {
  const prefix = `${cycle.technologyId}-`;
  if (!cycle.id.startsWith(prefix)) {
    throw new Error(`Release cycle ${cycle.id} does not match ${cycle.technologyId}`);
  }
  return cycle.id.slice(prefix.length);
}
