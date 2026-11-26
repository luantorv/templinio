// SPDX-License-Identifier: AGPL-3.0-only

export function DisplayDate({ value }: { value: string | null }) {
  return value ? <time dateTime={value}>{value}</time> : <span className="unknown">Unknown</span>;
}
