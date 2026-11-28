// SPDX-License-Identifier: AGPL-3.0-only

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CatalogEntry } from "@/lib/catalog";

export function CatalogSearch({ entries }: { entries: CatalogEntry[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredEntries = useMemo(
    () => entries.filter((entry) => {
      const searchableText = [entry.name, entry.description, entry.categoryLabel, ...entry.aliases]
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(normalizedQuery);
    }),
    [entries, normalizedQuery],
  );

  return (
    <div className="catalog-browser">
      <label className="catalog-search">
        <span>Search the atlas</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Name, alias, or category"
          autoComplete="off"
        />
      </label>

      <p className="catalog-result-count" role="status" aria-live="polite">
        {filteredEntries.length} {filteredEntries.length === 1 ? "technology" : "technologies"}
      </p>

      {filteredEntries.length > 0 ? (
        <div className="catalog-grid">
          {filteredEntries.map((entry) => (
            <article className="catalog-card" key={entry.id}>
              <div className="catalog-card__heading">
                <span className="technical-label">{entry.categoryLabel}</span>
                <span>{entry.activeCycleCount} active</span>
              </div>
              <h2><Link href={`/atlas/${entry.id}`}>{entry.name}</Link></h2>
              <p>{entry.description}</p>
              <dl>
                <div><dt>Cycles</dt><dd>{entry.cycleCount}</dd></div>
                <div><dt>Aliases</dt><dd>{entry.aliases.join(", ") || "None"}</dd></div>
              </dl>
              <Link className="catalog-card__link" href={`/atlas/${entry.id}`}>
                Inspect lifecycle <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <strong>No technologies match “{query.trim()}”.</strong>
          <p>Try a product name, alias, or category.</p>
        </div>
      )}
    </div>
  );
}
