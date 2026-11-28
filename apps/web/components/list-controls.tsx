// SPDX-License-Identifier: AGPL-3.0-only

type ListControlsProps = {
  noun: string;
  visibleCount: number;
  totalCount: number;
  initialCount: number;
  step: number;
  onChange: (count: number) => void;
};

export function ListControls({
  noun,
  visibleCount,
  totalCount,
  initialCount,
  step,
  onChange,
}: ListControlsProps) {
  if (totalCount <= initialCount) {
    return null;
  }

  const remainingCount = totalCount - visibleCount;
  const isExpanded = remainingCount <= 0;
  const nextCount = Math.min(totalCount, visibleCount + step);

  return (
    <div className="list-controls">
      <p aria-live="polite">
        Showing {Math.min(visibleCount, totalCount)} of {totalCount} {noun}
      </p>
      <div>
        {isExpanded ? (
          <button type="button" onClick={() => onChange(initialCount)}>Show fewer {noun}</button>
        ) : (
          <>
            <button type="button" onClick={() => onChange(nextCount)}>
              Load {Math.min(step, remainingCount)} more {noun}
            </button>
            {remainingCount > step ? (
              <button type="button" onClick={() => onChange(totalCount)}>
                Show all {totalCount} {noun}
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
