# SPDX-License-Identifier: AGPL-3.0-only

"""Render a portable Markdown representation of an Atlas dataset."""

from __future__ import annotations

from typing import Any


def _cell(value: Any) -> str:
    if value is None:
        return "Unknown"
    if value is True:
        return "Yes"
    if value is False:
        return "No"
    return str(value).replace("|", "\\|").replace("\n", " ")


def render_markdown(dataset: dict[str, Any]) -> str:
    lines = [
        "# Templinio Atlas lifecycle data",
        "",
        "A source-backed, machine-readable view of software release and support lifecycles.",
        "",
        f"- Schema: `{dataset['schemaVersion']}`",
        f"- Generated: `{dataset['generatedAt']}`",
        "- Unknown values are preserved; missing support stages are not inferred.",
        "",
    ]
    cycles_by_technology: dict[str, list[dict[str, Any]]] = {}
    for cycle in dataset["releaseCycles"]:
        cycles_by_technology.setdefault(cycle["technologyId"], []).append(cycle)

    for technology in dataset["technologies"]:
        policy = technology["supportPolicy"]
        lines.extend(
            [
                f"## {technology['name']}",
                "",
                technology["description"],
                "",
                f"- Identifier: `{technology['id']}`",
                f"- Active support stage: {_cell(policy['activeSupportLabel'])}",
                f"- Lifecycle/EOL stage: {_cell(policy['eolLabel'])}",
                f"- Extended support stage: {_cell(policy['extendedSupportLabel'])}",
                (
                    f"- Release policy: {technology['releasePolicyUrl']}"
                    if technology["releasePolicyUrl"]
                    else "- Release policy: Not published"
                ),
                "",
                "| Cycle | Released | LTS starts | Active support ends | EOL | "
                "Extended support ends | Maintained | Status |",
                "| --- | --- | --- | --- | --- | --- | --- | --- |",
            ]
        )
        for cycle in cycles_by_technology.get(technology["id"], []):
            lines.append(
                "| "
                + " | ".join(
                    _cell(value)
                    for value in (
                        cycle["name"],
                        cycle["releaseDate"],
                        cycle["ltsStartDate"],
                        cycle["activeSupportEndDate"],
                        cycle["eolDate"],
                        cycle["extendedSupportEndDate"],
                        cycle["isMaintained"],
                        cycle["status"],
                    )
                )
                + " |"
            )
        lines.append("")

    lines.extend(["## Sources", ""])
    for source in dataset["sources"]:
        lines.append(
            f"- [{source['name']}]({source['url']}) — retrieved {source['retrievedAt']}; "
            f"license [{source['license']}]({source['licenseUrl']})"
        )
    lines.extend(
        [
            "",
            "## Limitations",
            "",
            "Templinio republishes a curated subset of upstream lifecycle facts. Dates can change,",
            "commercial support may require separate eligibility, and absence of a "
            "published date is",
            "not evidence that support exists. Verify consequential decisions against "
            "the linked source.",
        ]
    )
    return "\n".join(lines) + "\n"
