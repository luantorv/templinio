// SPDX-License-Identifier: AGPL-3.0-only

"use client";

import type { ReleaseCycle } from "@templinio/schema";
import { useState } from "react";
import { DisplayDate } from "./display-date";
import { ListControls } from "./list-controls";
import { cycleStatusLabels } from "@/lib/lifecycle";

const INITIAL_COUNT = 10;
const LOAD_STEP = 10;

export function ExpandableReleaseCycles({
  cycles,
  technologyName,
}: {
  cycles: ReleaseCycle[];
  technologyName: string;
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleCycles = cycles.slice(0, visibleCount);

  return (
    <div className="table-panel">
      <div className="table-scroll">
        <table>
          <caption className="sr-only">{technologyName} release cycles</caption>
          <thead>
            <tr><th scope="col">Cycle</th><th scope="col">Released</th><th scope="col">EOL</th><th scope="col">Status</th></tr>
          </thead>
          <tbody>
            {visibleCycles.map((cycle) => (
              <tr key={cycle.id}>
                <th scope="row">{cycle.name}{cycle.isLts ? <small>LTS</small> : null}</th>
                <td><DisplayDate value={cycle.releaseDate} /></td>
                <td><DisplayDate value={cycle.eolDate} /></td>
                <td><span className={`status status--${cycle.status}`}><i aria-hidden="true" />{cycleStatusLabels[cycle.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ListControls
        noun="release cycles"
        visibleCount={visibleCycles.length}
        totalCount={cycles.length}
        initialCount={INITIAL_COUNT}
        step={LOAD_STEP}
        onChange={setVisibleCount}
      />
    </div>
  );
}
