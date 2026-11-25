// SPDX-License-Identifier: AGPL-3.0-only

export function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      focusable="false"
      viewBox="0 0 40 40"
    >
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="currentColor" />
      <path d="M20 1.5v7M20 31.5v7M1.5 20h7M31.5 20h7" stroke="currentColor" />
      <path d="M20 20 28 12M20 20l-4 9" stroke="var(--signal)" strokeWidth="2" />
      <circle cx="20" cy="20" r="2.25" fill="var(--accent)" />
      <path d="M11.5 7.8A15.5 15.5 0 0 1 33 29" fill="none" stroke="var(--accent)" />
    </svg>
  );
}
