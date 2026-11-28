// SPDX-License-Identifier: AGPL-3.0-only

import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { catalog, dataset } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Resources",
  description: "Templinio data downloads, schema, documentation, and limitations.",
};

export default function ResourcesPage() {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <header className="page-hero">
          <p className="eyebrow"><span aria-hidden="true">◆</span> Resources / Data contract</p>
          <h1>Use the Atlas without the interface.</h1>
          <p>
            Download the same validated lifecycle records used by the site, inspect their schema,
            and keep the limits of the data close to the data itself.
          </p>
          <div className="page-hero__meta">
            <span>Schema {dataset.schemaVersion}</span>
            <span>{catalog.length} technologies</span>
            <span>Updated <time dateTime={dataset.generatedAt}>{dataset.generatedAt.slice(0, 10)}</time></span>
          </div>
        </header>

        <section className="section" aria-labelledby="downloads-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Downloads / Portable formats</p>
              <h2 id="downloads-title">Atlas datasets</h2>
            </div>
            <p>JSON preserves the complete typed contract. Markdown offers a compact, readable representation for people and text-oriented agents.</p>
          </div>
          <div className="resource-grid">
            <article>
              <span>Complete catalog</span>
              <h3>All technologies</h3>
              <p>One snapshot containing every technology, release cycle, milestone, and source.</p>
              <div><a href="/datasets/catalog.json">JSON</a><a href="/datasets/catalog.md">Markdown</a></div>
            </article>
            <article>
              <span>Contract</span>
              <h3>JSON Schema {dataset.schemaVersion}</h3>
              <p>Draft 2020-12 structural contract for independent validation and tooling.</p>
              <div><a href="/schemas/templinio.schema.json">JSON Schema</a><a href="https://github.com/luantorv/templinio/tree/main/packages/schema">Runtime schema</a></div>
            </article>
            <article>
              <span>Agent discovery</span>
              <h3>llms.txt</h3>
              <p>Canonical routes, formats, temporal semantics, and source guidance in one small file.</p>
              <div><a href="/llms.txt">Plain text</a><a href="https://github.com/luantorv/templinio/tree/main/docs">Documentation</a></div>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="technology-downloads-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Index / Per technology</p>
              <h2 id="technology-downloads-title">Smaller snapshots</h2>
            </div>
            <p>Use a technology-specific record when the complete catalog is unnecessary.</p>
          </div>
          <ul className="resource-list">
            {catalog.map((technology) => (
              <li key={technology.id}>
                <a href={`/atlas/${technology.id}`}>{technology.name}</a>
                <span><a href={`/datasets/${technology.id}.json`}>JSON</a><a href={`/datasets/${technology.id}.md`}>Markdown</a></span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section limitations" aria-labelledby="limitations-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Limits / Read before relying</p>
              <h2 id="limitations-title">What this data cannot promise</h2>
            </div>
            <p>Templinio is a navigation aid, not a compatibility, security, or vendor-support guarantee.</p>
          </div>
          <div className="limitations__grid">
            <article><span>01</span><h3>Upstream facts can change</h3><p>Release and support dates may be corrected or rescheduled. Verify consequential decisions against the linked source.</p></article>
            <article><span>02</span><h3>Unknown is not supported</h3><p>A missing date remains unknown. Templinio never turns absent policy data into an inferred support window.</p></article>
            <article><span>03</span><h3>Commercial terms vary</h3><p>Extended or commercial support may require contracts, editions, or eligibility that this dataset does not model.</p></article>
            <article><span>04</span><h3>Coverage is deliberately bounded</h3><p>The catalog is curated and does not mirror every product or every upstream field.</p></article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
