// SPDX-License-Identifier: AGPL-3.0-only

import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Templinio home">
        <BrandMark />
        <span className="brand__name">Templinio</span>
        <span className="brand__version">v0.1</span>
      </a>
      <nav aria-label="Primary navigation" className="site-nav">
        <a href="/atlas">Atlas</a>
        <a href="/#foundation">Foundation</a>
        <a href="/datasets/nodejs.json">JSON</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
