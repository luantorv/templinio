// SPDX-License-Identifier: AGPL-3.0-only

import type { Technology } from "@templinio/schema";

export function SupportPolicy({ technology }: { technology: Technology }) {
  const { supportPolicy } = technology;

  return (
    <section className="section support-policy" aria-labelledby="support-policy-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Policy / Published stages</p>
          <h2 id="support-policy-title">Support policy</h2>
        </div>
        <p>
          Stage names follow the source. A stage marked not published is not inferred from another
          date or from common practice.
        </p>
      </div>
      <div className="support-policy__grid">
        <article>
          <span>01 / Active</span>
          <h3>{supportPolicy.activeSupportLabel ?? "Not published"}</h3>
          <p>{supportPolicy.activeSupportLabel ? "An active-support stage is documented." : "The source defines no separate active-support stage."}</p>
        </article>
        <article>
          <span>02 / Lifecycle</span>
          <h3>{supportPolicy.eolLabel}</h3>
          <p>This label describes the support window ending at the published EOL date.</p>
        </article>
        <article>
          <span>03 / Extended</span>
          <h3>{supportPolicy.extendedSupportLabel ?? "Not published"}</h3>
          <p>{supportPolicy.extendedSupportLabel ? "An extended-support stage is documented." : "The source defines no separate extended-support stage."}</p>
        </article>
      </div>
      {technology.releasePolicyUrl ? (
        <p className="support-policy__link">
          <a href={technology.releasePolicyUrl} rel="noreferrer" target="_blank">
            Read the published release policy <span aria-hidden="true">↗</span>
          </a>
        </p>
      ) : (
        <p className="support-policy__link">No external release-policy URL is published by the source.</p>
      )}
    </section>
  );
}
