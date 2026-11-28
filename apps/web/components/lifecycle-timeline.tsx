// SPDX-License-Identifier: AGPL-3.0-only

"use client";

import type { Event as LifecycleEvent, ReleaseCycle } from "@templinio/schema";
import { useEffect, useMemo, useRef, useState } from "react";
import { dateStatusLabels, eventTypeLabels } from "@/lib/lifecycle";

const LANE_HEIGHT_REM = 4;
const AXIS_HEIGHT_REM = 3;

function initialCycleIds(cycles: ReleaseCycle[]) {
  const prioritized = [
    ...cycles.filter(({ status }) => status === "active" || status === "scheduled"),
    ...cycles.filter(({ status }) => status !== "active" && status !== "scheduled"),
  ];
  return new Set(prioritized.slice(0, 6).map(({ id }) => id));
}

function timestamp(value: string) {
  return Date.parse(`${value}T00:00:00Z`);
}

function eventPosition(date: string, start: number, end: number) {
  return ((timestamp(date) - start) / (end - start)) * 100;
}

export function LifecycleTimeline({
  cycles,
  events,
  snapshotDate,
  technologyName,
}: {
  cycles: ReleaseCycle[];
  events: LifecycleEvent[];
  snapshotDate: string;
  technologyName: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const availableEventTypes = useMemo(
    () => Array.from(new Set(events.map(({ type }) => type))),
    [events],
  );
  const [selectedCycleIds, setSelectedCycleIds] = useState(() => initialCycleIds(cycles));
  const [visibleEventTypes, setVisibleEventTypes] = useState(
    () => new Set<LifecycleEvent["type"]>(availableEventTypes),
  );
  const [zoom, setZoom] = useState(1);
  const [cursorDate, setCursorDate] = useState(snapshotDate);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const selectedCycles = cycles.filter(({ id }) => selectedCycleIds.has(id));
  const visibleEvents = events.filter(
    (event) =>
      event.releaseCycleId !== null &&
      selectedCycleIds.has(event.releaseCycleId) &&
      visibleEventTypes.has(event.type),
  );
  const datedVisibleEvents = visibleEvents.filter((event) => event.date !== null);
  const dateValues = [
    ...datedVisibleEvents.map((event) => timestamp(event.date!)),
    timestamp(snapshotDate),
  ];
  const firstYear = new Date(Math.min(...dateValues)).getUTCFullYear();
  const lastYear = new Date(Math.max(...dateValues)).getUTCFullYear();
  const rangeStart = Date.UTC(firstYear, 0, 1);
  const rangeEnd = Date.UTC(lastYear + 1, 0, 1);
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index);
  const canvasWidth = Math.max(960, years.length * 120) * zoom;

  const unknownEventCount = visibleEvents.filter(({ date }) => date === null).length;
  const selectedEvent = events.find(({ id }) => id === selectedEventId);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const snapshotPosition = eventPosition(snapshotDate, rangeStart, rangeEnd) / 100;
    const focusPoint = Math.min(Math.max(snapshotPosition * viewport.scrollWidth, 0), viewport.scrollWidth);
    const maximumScroll = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    viewport.scrollTo({
      left: Math.min(Math.max(focusPoint - viewport.clientWidth / 2, 0), maximumScroll),
      behavior: "auto",
    });
  }, [canvasWidth, rangeEnd, rangeStart, selectedCycleIds, snapshotDate, visibleEventTypes]);

  const toggleCycle = (cycleId: string) => {
    setSelectedCycleIds((current) => {
      const next = new Set(current);
      if (next.has(cycleId)) {
        next.delete(cycleId);
      } else {
        next.add(cycleId);
      }
      return next;
    });
  };

  const toggleEventType = (eventType: LifecycleEvent["type"]) => {
    setVisibleEventTypes((current) => {
      const next = new Set(current);
      if (next.has(eventType)) {
        next.delete(eventType);
      } else {
        next.add(eventType);
      }
      return next;
    });
  };

  const selectCurrentCycles = () => {
    setSelectedCycleIds(
      new Set(
        cycles
          .filter(({ status }) => status === "active" || status === "scheduled")
          .map(({ id }) => id),
      ),
    );
  };

  const pan = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollBy({
      left: direction * viewport.clientWidth * 0.75,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="timeline-panel">
      <div className="timeline-controls">
        <fieldset>
          <legend>Milestones</legend>
          <div className="timeline-controls__checks">
            {availableEventTypes.map((eventType) => (
              <label key={eventType}>
                <input
                  checked={visibleEventTypes.has(eventType)}
                  onChange={() => toggleEventType(eventType)}
                  type="checkbox"
                />
                <span
                  aria-hidden="true"
                  className={`timeline-event-key timeline-event-key--${eventType}`}
                />
                {eventTypeLabels[eventType]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Release cycles</legend>
          <div className="timeline-controls__selection-actions">
            <button onClick={selectCurrentCycles} type="button">Current</button>
            <button onClick={() => setSelectedCycleIds(new Set(cycles.map(({ id }) => id)))} type="button">All</button>
            <button onClick={() => setSelectedCycleIds(new Set())} type="button">Clear</button>
          </div>
          <details>
            <summary>{selectedCycleIds.size} of {cycles.length} selected</summary>
            <div className="timeline-cycle-options">
              {cycles.map((cycle) => (
                <label key={cycle.id}>
                  <input
                    checked={selectedCycleIds.has(cycle.id)}
                    onChange={() => toggleCycle(cycle.id)}
                    type="checkbox"
                  />
                  {cycle.name}{cycle.isLts ? " · LTS" : ""}
                </label>
              ))}
            </div>
          </details>
        </fieldset>

        <fieldset>
          <legend>View</legend>
          <label className="timeline-control-field">
            Zoom <output>{zoom.toFixed(1)}×</output>
            <input
              aria-label="Timeline zoom"
              max="3"
              min="1"
              onChange={(event) => setZoom(Number(event.target.value))}
              step="0.5"
              type="range"
              value={zoom}
            />
          </label>
          <label className="timeline-control-field">
            Cursor date
            <input
              max={`${lastYear}-12-31`}
              min={`${firstYear}-01-01`}
              onChange={(event) => {
                if (event.target.value) {
                  setCursorDate(event.target.value);
                }
              }}
              type="date"
              value={cursorDate}
            />
          </label>
          <div className="timeline-pan-controls" aria-label="Pan timeline">
            <button onClick={() => pan(-1)} type="button">← Earlier</button>
            <button onClick={() => pan(1)} type="button">Later →</button>
          </div>
        </fieldset>
      </div>

      {selectedCycles.length ? (
        <div className="timeline-chart" aria-label={`${technologyName} lifecycle timeline`}>
          <div className="timeline-labels" aria-hidden="true">
            <div className="timeline-labels__axis">Cycle</div>
            {selectedCycles.map((cycle) => <div key={cycle.id}>{cycle.name}{cycle.isLts ? <small>LTS</small> : null}</div>)}
          </div>
          <div className="timeline-viewport" ref={viewportRef} tabIndex={0}>
            <div
              className="timeline-canvas"
              style={{
                height: `${AXIS_HEIGHT_REM + selectedCycles.length * LANE_HEIGHT_REM}rem`,
                width: `${canvasWidth}px`,
              }}
            >
              <div className="timeline-axis">
                {years.map((year) => (
                  <span
                    key={year}
                    style={{ left: `${eventPosition(`${year}-01-01`, rangeStart, rangeEnd)}%` }}
                  >
                    {year}
                  </span>
                ))}
              </div>
              <div className="timeline-grid" aria-hidden="true">
                {years.map((year) => (
                  <span
                    key={year}
                    style={{ left: `${eventPosition(`${year}-01-01`, rangeStart, rangeEnd)}%` }}
                  />
                ))}
              </div>
              <div
                className="timeline-cursor"
                style={{ left: `${eventPosition(cursorDate, rangeStart, rangeEnd)}%` }}
              >
                <span>{cursorDate}</span>
              </div>
              {selectedCycles.map((cycle) => {
                const laneEvents = visibleEvents
                  .filter((event) => event.releaseCycleId === cycle.id && event.date)
                  .sort((first, second) => timestamp(first.date!) - timestamp(second.date!));

                return (
                  <div className="timeline-lane" key={cycle.id}>
                    <span className="sr-only">{cycle.name}</span>
                    {laneEvents.map((event, index) => {
                      const start = eventPosition(event.date!, rangeStart, rangeEnd);
                      const nextEvent = laneEvents[index + 1];
                      const end = nextEvent?.date
                        ? eventPosition(nextEvent.date, rangeStart, rangeEnd)
                        : 100;

                      return (
                        <button
                          aria-label={`${event.title}: ${event.date}, ${dateStatusLabels[event.dateStatus]}`}
                          className={`timeline-event timeline-event--type-${event.type} timeline-event--${event.dateStatus}${selectedEventId === event.id ? " timeline-event--selected" : ""}`}
                          key={event.id}
                          onClick={() => {
                            setCursorDate(event.date!);
                            setSelectedEventId(event.id);
                          }}
                          style={{
                            left: `${start}%`,
                            width: `max(1.5rem, ${Math.max(end - start, 0)}%)`,
                          }}
                          title={`${eventTypeLabels[event.type]} · ${event.date}`}
                          type="button"
                        >
                          <span className="timeline-event__hand" aria-hidden="true" />
                          <span className="timeline-event__tick" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="timeline-empty">Select at least one release cycle to draw the timeline.</p>
      )}

      <div className="timeline-footnote">
        <p>{unknownEventCount ? `${unknownEventCount} filtered milestone${unknownEventCount === 1 ? " has" : "s have"} no date and cannot be placed on the scale.` : "All filtered milestones have a published date."}</p>
        <a href="#release-cycles">Use the complete table view</a>
      </div>

      <p className="timeline-selection" aria-live="polite">
        {selectedEvent ? (
          <><strong>{eventTypeLabels[selectedEvent.type]}:</strong> {selectedEvent.title} · {selectedEvent.date} · {dateStatusLabels[selectedEvent.dateStatus]}</>
        ) : "Select a milestone on the timeline to inspect it."}
      </p>
    </div>
  );
}
