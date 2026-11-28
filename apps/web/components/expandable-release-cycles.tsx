// SPDX-License-Identifier: AGPL-3.0-only

"use client";

import type { ReleaseCycle, Technology } from "@templinio/schema";
import Link from "next/link";
import { useState } from "react";
import { DisplayDate } from "./display-date";
import { ListControls } from "./list-controls";
import { cycleStatusLabels, supportStatusLabels } from "@/lib/lifecycle";
import { getReleaseCycleSlug } from "@/lib/release-cycle";

const INITIAL_COUNT = 10;
const LOAD_STEP = 10;

export function ExpandableReleaseCycles({
  cycles,
  technologyId,
  technologyName,
  supportPolicy,
}: {
  cycles: ReleaseCycle[];
  technologyId: string;
  technologyName: string;
  supportPolicy: Technology["supportPolicy"];
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleCycles = cycles.slice(0, visibleCount);

  return (
    <div className="table-panel">
      <div className="table-scroll">
        <table>
          <caption className="sr-only">{technologyName} release cycles</caption>
          <thead>
            <tr>
              <th scope="col">Cycle</th>
              <th scope="col">Released</th>
              {supportPolicy.activeSupportLabel ? <th scope="col">{supportPolicy.activeSupportLabel} ends</th> : null}
              <th scope="col">{supportPolicy.eolLabel} ends</th>
              {supportPolicy.extendedSupportLabel ? <th scope="col">{supportPolicy.extendedSupportLabel} ends</th> : null}
              <th scope="col">Maintained</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleCycles.map((cycle) => (
              <tr key={cycle.id}>
                <th scope="row">
                  <Link href={`/atlas/${technologyId}/${getReleaseCycleSlug(cycle)}`}>{cycle.name}</Link>
                  {cycle.isLts ? <small>LTS</small> : null}
                </th>
                <td><DisplayDate value={cycle.releaseDate} /></td>
                {supportPolicy.activeSupportLabel ? (
                  <td>{cycle.activeSupportStatus === "not-applicable" ? supportStatusLabels[cycle.activeSupportStatus] : <DisplayDate value={cycle.activeSupportEndDate} />}</td>
                ) : null}
                <td><DisplayDate value={cycle.eolDate} /></td>
                {supportPolicy.extendedSupportLabel ? (
                  <td>{cycle.extendedSupportStatus === "not-applicable" ? supportStatusLabels[cycle.extendedSupportStatus] : <DisplayDate value={cycle.extendedSupportEndDate} />}</td>
                ) : null}
                <td>{cycle.isMaintained === null ? "Unknown" : cycle.isMaintained ? "Yes" : "No"}</td>
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
