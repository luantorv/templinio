# Contributing to Templinio

Thank you for helping improve Templinio. The project is in an early foundation phase, so small,
focused changes with a clear reason are the easiest to review.

## Before opening a change

- Use an issue or discussion before starting a large feature, a new data source, or a schema
  breaking change.
- Do not add product routes for roadmap features that do not exist yet.
- Never include secrets, private manifests, copied proprietary data, or generated datasets whose
  redistribution terms have not been checked.
- Treat external data as untrusted and preserve unknown values instead of inferring facts.

## Development workflow

```sh
nix develop
npm ci
npm run check
```

Add tests for behavior changes. Dataset changes must include provenance and pass both the Python
validator and the TypeScript schema. UI changes should be checked in both themes, at narrow and
wide widths, with keyboard navigation and reduced motion enabled.

## Commits

Use Conventional Commits and keep each commit focused on one coherent change. The subject must
describe the change on its own, use the imperative mood, and remain within 80 characters. Prefer
a clear subject without a body or footer; reserve broader motivation and review context for the
pull request.

Every commit must have a human author who takes responsibility for the change. Commits authored
solely by an automated agent or bot are not accepted. When an agent materially contributes, it
may appear in a `Co-authored-by` trailer, but the human contributor must remain the commit author.

## Pull requests

Explain the problem, the chosen scope, and how the change was verified. Keep unrelated refactors
separate. Maintainers may ask for a source or license to be removed when its redistribution terms
are unclear.

There is no Contributor License Agreement. By submitting a contribution, you agree that it is
licensed under the repository's `AGPL-3.0-only` license and that you have the right to contribute
it. Third-party material must keep its original license and attribution.

## Conduct

Be respectful, specific, and patient. Harassment, discrimination, personal attacks, and sharing
someone else's private information are not acceptable. Maintainers may edit or remove harmful
content and restrict participation when necessary. Report conduct concerns privately to the
maintainer through the contact options on their GitHub profile.
