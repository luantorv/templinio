// SPDX-License-Identifier: AGPL-3.0-only

"use client";

export function ThemeToggle() {
  const toggle = () => {
    const active = document.documentElement.dataset.theme;
    const next = active === "midnight" ? "ivory" : "midnight";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("templinio-theme", next);
  };

  return (
    <button
      aria-label="Toggle color theme"
      className="theme-toggle"
      onClick={toggle}
      type="button"
    >
      <span aria-hidden="true" className="theme-toggle__glyph">
        ◐
      </span>
      <span className="theme-toggle__label">Theme</span>
    </button>
  );
}
