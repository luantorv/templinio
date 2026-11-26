// SPDX-License-Identifier: AGPL-3.0-only

import { BrokenDial } from "@/components/broken-dial";
import { DisplayDate } from "@/components/display-date";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dataset, getTechnologyRecord } from "@/lib/catalog";
import { cycleStatusLabels, dateStatusLabels } from "@/lib/lifecycle";

export default function Home() {
  const nodeRecord = getTechnologyRecord("nodejs");
  if (!nodeRecord) {
    throw new Error("The Atlas catalog must include Node.js");
  }
  const source = nodeRecord.sources[0];

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="eyebrow"><span aria-hidden="true">◆</span> Foundation calibration / 00</p>
            <h1 id="hero-title">Software changes.<br />Keep your bearings.</h1>
            <p className="hero__lead">
              Templinio is a public, source-first atlas for understanding software releases,
              support windows, and the events between them.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="/atlas">Explore the Atlas</a>
              <a className="button" href={source.url} rel="noreferrer" target="_blank">
                Verify the source <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="hero__instrument">
            <BrokenDial />
            <div className="hero__reading" aria-label="Foundation status: calibrated">
              <span className="hero__reading-label">Foundation</span>
              <strong>CALIBRATED</strong>
              <span>schema 0.1.0</span>
            </div>
          </div>
        </section>

        <div className="signal-rail" aria-label="Foundation properties">
          <span><i aria-hidden="true" /> Traceable sources</span>
          <span><i aria-hidden="true" /> Static publication</span>
          <span><i aria-hidden="true" /> No tracking</span>
        </div>

        <section className="section" id="foundation" aria-labelledby="foundation-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">System / Foundation</p>
              <h2 id="foundation-title">A small, inspectable core</h2>
            </div>
            <p>
              Phase 0 establishes the contracts that later views will share. No product claims
              are inferred when source data is missing.
            </p>
          </div>
          <div className="feature-grid">
            <article className="panel">
              <span className="panel__index">01</span>
              <h3>Typed data</h3>
              <p>Technology, release cycle, event, and source records share one validated schema.</p>
            </article>
            <article className="panel">
              <span className="panel__index">02</span>
              <h3>Explicit uncertainty</h3>
              <p>Occurred, scheduled, estimated, and unknown dates remain distinct.</p>
            </article>
            <article className="panel">
              <span className="panel__index">03</span>
              <h3>Atomic snapshots</h3>
              <p>Invalid updates never replace the last dataset that passed validation.</p>
            </article>
            <article className="panel">
              <span className="panel__index">04</span>
              <h3>Static by default</h3>
              <p>The site and sample dataset build to portable files without a runtime server.</p>
            </article>
          </div>
        </section>

        <section className="section" id="dataset" aria-labelledby="dataset-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Dataset / Node.js sample</p>
              <h2 id="dataset-title">Known, scheduled, and unknown</h2>
            </div>
            <p>
              A deliberately small fixture exercises temporal semantics and source attribution
              before the Atlas catalog grows.
            </p>
          </div>

          <div className="data-layout">
            <div className="table-panel">
              <div className="table-panel__header">
                <div>
                  <span className="technical-label">Release cycles</span>
                  <strong>{dataset.technologies[0].name}</strong>
                </div>
                <a href="/datasets/nodejs.json">Download JSON</a>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">Node.js release cycle sample data</caption>
                  <thead>
                    <tr><th scope="col">Cycle</th><th scope="col">Released</th><th scope="col">EOL</th><th scope="col">Status</th></tr>
                  </thead>
                  <tbody>
                    {nodeRecord.releaseCycles.slice(0, 6).map((cycle) => (
                      <tr key={cycle.id}>
                        <th scope="row">{cycle.name}{cycle.isLts ? <small>LTS</small> : null}</th>
                      <td><DisplayDate value={cycle.releaseDate} /></td>
                      <td><DisplayDate value={cycle.eolDate} /></td>
                        <td><span className={`status status--${cycle.status}`}><i aria-hidden="true" />{cycleStatusLabels[cycle.status]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="evidence-panel" aria-labelledby="evidence-title">
              <span className="technical-label">Evidence / 01</span>
              <h3 id="evidence-title">Source record</h3>
              <dl>
                <div><dt>Provider</dt><dd>{source.name}</dd></div>
                <div><dt>Retrieved</dt><dd><time dateTime={source.retrievedAt}>{source.retrievedAt.slice(0, 10)}</time></dd></div>
                <div><dt>License</dt><dd><a href={source.licenseUrl} rel="noreferrer" target="_blank">{source.license} <span aria-hidden="true">↗</span></a></dd></div>
                <div><dt>Schema</dt><dd>{dataset.schemaVersion}</dd></div>
              </dl>
              <a className="source-link" href={source.url} rel="noreferrer" target="_blank">Open source record <span aria-hidden="true">↗</span></a>
            </aside>
          </div>

          <div className="event-list" aria-labelledby="events-title">
            <h3 id="events-title">Temporal evidence</h3>
            {nodeRecord.events.slice(0, 3).map((event) => (
              <article className="event" key={event.id}>
                <span className={`event__node event__node--${event.dateStatus}`} aria-hidden="true" />
                <div>
                  <strong>{event.title}</strong>
                  <span><DisplayDate value={event.date} /> · {dateStatusLabels[event.dateStatus]}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
