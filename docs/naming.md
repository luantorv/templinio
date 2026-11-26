# Name availability review

`Templinio` is the adopted name for both the product and its design system. This is a
preliminary availability review, not a trademark clearance or legal opinion.

Checks performed on 2026-11-25 found no relevant exact-name collision for a software product,
design system, or registered mark in general web and preliminary trademark searches. At the
time of the check:

- the unscoped package name `templinio` returned `404` on npm, PyPI, and RubyGems;
- the GitHub username `templinio` returned `404`;
- `templinio.com` and `templinio.app` were registered;
- RDAP returned no registration record for `templinio.design`, `templinio.dev`,
  `templinio.org`, or `templinio.net`;
- the crates.io check was inconclusive because the registry rejected the request;
- `templinio` is also an Esperanto common word for “timeline”, a useful association but not an
  exclusive coined term.

The workspace packages use the private scope `@templinio/*`; that npm scope has not been
reserved. No domain is claimed by the project yet, so the JSON Schema uses a stable URN rather
than a domain-based identifier. The local directory and GitHub repository already use the
`templinio` slug.

Before publishing packages, adopting a custom domain, or making a substantial brand investment,
reserve the intended package scope and domain, repeat the registry checks, and perform a
jurisdiction-specific trademark search that includes similar names. WIPO explicitly recommends
searching similar as well as identical marks and consulting national or regional registers.

## Evidence

- [npm package lookup](https://registry.npmjs.org/templinio)
- [PyPI project lookup](https://pypi.org/project/templinio/)
- [GitHub username lookup](https://github.com/templinio)
- [`.com` RDAP record](https://rdap.verisign.com/com/v1/domain/templinio.com)
- [`.design` RDAP lookup](https://rdap.nic.design/domain/templinio.design)
- [`.dev` RDAP lookup](https://pubapi.registry.google/rdap/domain/templinio.dev)
- [WIPO name-availability guidance](https://www.wipo.int/en/web/madrid-system/check-availability)
