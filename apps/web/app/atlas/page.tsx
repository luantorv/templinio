// SPDX-License-Identifier: AGPL-3.0-only

import type { Metadata } from "next";
import { CatalogSearch } from "@/components/catalog-search";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { catalog, dataset } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Atlas",
  description: "Browse traceable software lifecycle and support data.",
};

export default function AtlasPage() {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <header className="page-hero">
          <p className="eyebrow"><span aria-hidden="true">◆</span> Atlas / Catalog</p>
          <h1>Find your place in software time.</h1>
          <p>
            Browse release cycles, support milestones, and their source records. Missing data stays
            visible instead of becoming a guess.
          </p>
          <div className="page-hero__meta">
            <span>{catalog.length} technologies</span>
            <span>{dataset.releaseCycles.length} release cycles</span>
            <span>Updated <time dateTime={dataset.generatedAt}>{dataset.generatedAt.slice(0, 10)}</time></span>
          </div>
        </header>

        <section className="section catalog-section" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Index / All technologies</p>
              <h2 id="catalog-title">Lifecycle catalog</h2>
            </div>
            <p>Search by technology name, alias, or category. Every record links back to its evidence.</p>
          </div>
          <CatalogSearch entries={catalog} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
