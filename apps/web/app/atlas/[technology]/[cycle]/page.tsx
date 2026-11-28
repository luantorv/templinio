// SPDX-License-Identifier: AGPL-3.0-only

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DatasetFreshness } from "@/components/dataset-freshness";
import { DisplayDate } from "@/components/display-date";
import { ExpandableEvents } from "@/components/expandable-events";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SupportPolicy } from "@/components/support-policy";
import { dataset, getReleaseCycleRecord } from "@/lib/catalog";
import { cycleStatusLabels, supportStatusLabels } from "@/lib/lifecycle";
import { getReleaseCycleSlug } from "@/lib/release-cycle";

type ReleaseCyclePageProps = {
  params: Promise<{ technology: string; cycle: string }>;
};

function SupportDate({
  date,
  status,
}: {
  date: string | null;
  status: "active" | "ended" | "not-applicable" | "unknown";
}) {
  if (status === "not-applicable") {
    return <>{supportStatusLabels[status]}</>;
  }

  return <><DisplayDate value={date} /><small>{supportStatusLabels[status]}</small></>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return dataset.releaseCycles.map((cycle) => ({
    technology: cycle.technologyId,
    cycle: getReleaseCycleSlug(cycle),
  }));
}

export async function generateMetadata({ params }: ReleaseCyclePageProps): Promise<Metadata> {
  const { technology, cycle } = await params;
  const record = getReleaseCycleRecord(technology, cycle);

  return record
    ? {
        title: `${record.technology.name} ${record.cycle.name} lifecycle`,
        description: `Release and support milestones for ${record.technology.name} ${record.cycle.name}.`,
      }
    : { title: "Release cycle not found" };
}

export default async function ReleaseCyclePage({ params }: ReleaseCyclePageProps) {
  const { technology: technologyId, cycle: cycleSlug } = await params;
  const record = getReleaseCycleRecord(technologyId, cycleSlug);

  if (!record) {
    notFound();
  }

  const { technology, cycle, events, sources } = record;

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />

      <main id="main-content">
        <header className="technology-hero cycle-hero">
          <nav aria-label="Breadcrumb">
            <a href="/atlas">Atlas</a><span aria-hidden="true">/</span>
            <a href={`/atlas/${technology.id}`}>{technology.name}</a><span aria-hidden="true">/</span>
            <span>{cycle.name}</span>
          </nav>
          <div className="technology-hero__layout">
            <div>
              <p className="eyebrow">Release cycle / {cycleStatusLabels[cycle.status]}</p>
              <h1>{technology.name} {cycle.name}</h1>
              <p className="technology-hero__lead">
                A source-backed view of this cycle&apos;s release and support milestones.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#cycle-events">Inspect milestones</a>
                <a className="button" href={`/atlas/${technology.id}`}>All {technology.name} cycles</a>
              </div>
            </div>
            <dl className="technology-summary">
              <div><dt>Released</dt><dd><DisplayDate value={cycle.releaseDate} /></dd></div>
              <div><dt>LTS</dt><dd>{cycle.isLts === null ? "Unknown" : cycle.isLts ? "Yes" : "No"}</dd></div>
              <div><dt>Maintained</dt><dd>{cycle.isMaintained === null ? "Unknown" : cycle.isMaintained ? "Yes" : "No"}</dd></div>
              <div><dt>Dataset updated</dt><dd><time dateTime={dataset.generatedAt}>{dataset.generatedAt.slice(0, 10)}</time></dd></div>
            </dl>
          </div>
          <DatasetFreshness generatedAt={dataset.generatedAt} />
        </header>

        <section className="section" aria-labelledby="cycle-support-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Window / Support stages</p>
              <h2 id="cycle-support-title">Published support window</h2>
            </div>
            <p>Unknown dates stay unknown. Not applicable means the provider explicitly defines no stage for this cycle.</p>
          </div>
          <dl className="cycle-support-grid">
            <div><dt>Release</dt><dd><DisplayDate value={cycle.releaseDate} /></dd></div>
            <div><dt>LTS starts</dt><dd><DisplayDate value={cycle.ltsStartDate} /></dd></div>
            <div>
              <dt>{technology.supportPolicy.activeSupportLabel ?? "Active support"}</dt>
              <dd><SupportDate date={cycle.activeSupportEndDate} status={cycle.activeSupportStatus} /></dd>
            </div>
            <div><dt>{technology.supportPolicy.eolLabel}</dt><dd><DisplayDate value={cycle.eolDate} /></dd></div>
            <div>
              <dt>{technology.supportPolicy.extendedSupportLabel ?? "Extended support"}</dt>
              <dd><SupportDate date={cycle.extendedSupportEndDate} status={cycle.extendedSupportStatus} /></dd>
            </div>
            <div><dt>Overall status</dt><dd><span className={`status status--${cycle.status}`}><i aria-hidden="true" />{cycleStatusLabels[cycle.status]}</span></dd></div>
          </dl>
        </section>

        <SupportPolicy technology={technology} />

        <section className="section" id="cycle-events" aria-labelledby="cycle-events-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Trace / Evidence</p>
              <h2 id="cycle-events-title">Milestones and sources</h2>
            </div>
            <p>Every date below retains the source record and its temporal certainty.</p>
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
            Portable technology records: <a href={`/datasets/${technology.id}.json`}>JSON</a>{" · "}
            <a href={`/datasets/${technology.id}.md`}>Markdown</a>
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
