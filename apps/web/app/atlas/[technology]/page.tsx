// SPDX-License-Identifier: AGPL-3.0-only

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatasetFreshness } from "@/components/dataset-freshness";
import { ExpandableEvents } from "@/components/expandable-events";
import { ExpandableReleaseCycles } from "@/components/expandable-release-cycles";
import { LifecycleTimeline } from "@/components/lifecycle-timeline";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SupportPolicy } from "@/components/support-policy";
import { catalog, dataset, getTechnologyRecord } from "@/lib/catalog";
import { categoryLabels } from "@/lib/lifecycle";

type TechnologyPageProps = {
  params: Promise<{ technology: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.map(({ id }) => ({ technology: id }));
}

export async function generateMetadata({ params }: TechnologyPageProps): Promise<Metadata> {
  const { technology: technologyId } = await params;
  const record = getTechnologyRecord(technologyId);

  return record
    ? {
        title: `${record.technology.name} lifecycle`,
        description: record.technology.description,
      }
    : { title: "Technology not found" };
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const { technology: technologyId } = await params;
  const record = getTechnologyRecord(technologyId);

  if (!record) {
    notFound();
  }

  const { technology, releaseCycles, events, sources } = record;

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <header className="technology-hero">
          <nav aria-label="Breadcrumb">
            <a href="/atlas">Atlas</a><span aria-hidden="true">/</span><span>{technology.name}</span>
          </nav>
          <div className="technology-hero__layout">
            <div>
              <p className="eyebrow">{categoryLabels[technology.category]} / Lifecycle record</p>
              <h1>{technology.name}</h1>
              <p className="technology-hero__lead">{technology.description}</p>
              <div className="hero__actions">
                <a className="button button--primary" href="#release-cycles">Inspect release cycles</a>
                {technology.releasePolicyUrl ? (
                  <a className="button" href={technology.releasePolicyUrl} rel="noreferrer" target="_blank">
                    Release policy <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </div>
            <dl className="technology-summary">
              <div><dt>Release cycles</dt><dd>{releaseCycles.length}</dd></div>
              <div><dt>Evidence records</dt><dd>{sources.length}</dd></div>
              <div><dt>Dataset updated</dt><dd><time dateTime={dataset.generatedAt}>{dataset.generatedAt.slice(0, 10)}</time></dd></div>
            </dl>
          </div>
          <DatasetFreshness generatedAt={dataset.generatedAt} />
        </header>

        <SupportPolicy technology={technology} />

        <section className="section" aria-labelledby="timeline-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Timeline / Compare cycles</p>
              <h2 id="timeline-title">Lifecycle over time</h2>
            </div>
            <p>Zoom, pan, filter milestones, and compare multiple release cycles. The cursor starts at the snapshot date.</p>
          </div>
          <LifecycleTimeline
            cycles={releaseCycles}
            events={events}
            snapshotDate={dataset.generatedAt.slice(0, 10)}
            technologyName={technology.name}
          />
        </section>

        <section className="section" id="release-cycles" aria-labelledby="release-cycles-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Branches / Versions</p>
              <h2 id="release-cycles-title">Release cycles</h2>
            </div>
            <p>Dates reflect the cited sources. Unknown values are preserved explicitly.</p>
          </div>
          <ExpandableReleaseCycles
            cycles={releaseCycles}
            technologyId={technology.id}
            technologyName={technology.name}
            supportPolicy={technology.supportPolicy}
          />
        </section>

        <section className="section" aria-labelledby="evidence-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Trace / Evidence</p>
              <h2 id="evidence-title">Events and sources</h2>
            </div>
            <p>Temporal claims and their provenance remain inspectable side by side.</p>
          </div>
          <div className="data-layout">
            <ExpandableEvents events={events} />
            <div className="source-stack">
              {sources.map((source, index) => (
                <aside className="evidence-panel" key={source.id}>
                  <span className="technical-label">Evidence / {String(index + 1).padStart(2, "0")}</span>
                  <h3>{source.name}</h3>
                  <dl>
                    <div><dt>Retrieved</dt><dd><time dateTime={source.retrievedAt}>{source.retrievedAt.slice(0, 10)}</time></dd></div>
                    <div><dt>License</dt><dd><a href={source.licenseUrl} rel="noreferrer" target="_blank">{source.license} <span aria-hidden="true">↗</span></a></dd></div>
                    <div><dt>Schema</dt><dd>{dataset.schemaVersion}</dd></div>
                  </dl>
                  <a className="source-link" href={source.url} rel="noreferrer" target="_blank">Open source record <span aria-hidden="true">↗</span></a>
                </aside>
              ))}
            </div>
          </div>
          <p className="dataset-download">
            Portable records: <a href={`/datasets/${technology.id}.json`}>JSON</a>{" · "}
            <a href={`/datasets/${technology.id}.md`}>Markdown</a>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
