// SPDX-License-Identifier: AGPL-3.0-only

"use client";

import type { Event as LifecycleEvent } from "@templinio/schema";
import { useState } from "react";
import { DisplayDate } from "./display-date";
import { ListControls } from "./list-controls";
import { dateStatusLabels, eventTypeLabels } from "@/lib/lifecycle";

const INITIAL_COUNT = 10;
const LOAD_STEP = 10;

export function ExpandableEvents({ events }: { events: LifecycleEvent[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleEvents = events.slice(0, visibleCount);

  return (
    <div className="event-list technology-events" aria-label="Temporal evidence">
      <h3>Temporal evidence</h3>
      {visibleEvents.map((event) => (
        <article className="event" key={event.id}>
          <span className={`event__node event__node--${event.dateStatus}`} aria-hidden="true" />
          <div>
            <strong>{event.title}</strong>
            <span>{eventTypeLabels[event.type]} · <DisplayDate value={event.date} /> · {dateStatusLabels[event.dateStatus]}</span>
          </div>
        </article>
      ))}
      <ListControls
        noun="events"
        visibleCount={visibleEvents.length}
        totalCount={events.length}
        initialCount={INITIAL_COUNT}
        step={LOAD_STEP}
        onChange={setVisibleCount}
      />
    </div>
  );
}
