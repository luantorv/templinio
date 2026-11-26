# Privacy and operations

## Privacy baseline

The Phase 0 site is a static export. It has no account system, analytics, advertising, cookies,
server-side functions, or user file input. The only browser storage is the local theme preference
under `templinio-theme`. External links are explicit; lifecycle data is fetched during the ETL,
not by a visitor's browser. As with any hosted static site, the hosting and DNS providers may
process ordinary request metadata such as IP address and user agent under their own policies.

Future project imports are expected to run locally. They must not be uploaded or queried against
external services by default, and package names that may be private require an explicit privacy
decision before network lookup.

## Budget

The operating budget is **USD 0/month** until the maintainer explicitly authorizes otherwise. Do
not attach a payment method, enable metered add-ons, analytics, image optimization, databases, or
on-demand services as part of an ordinary deployment.

The production landing is hosted on [Vercel Hobby](https://templinio.vercel.app/) for personal,
non-commercial use. As checked on 2026-11-25, its documented general limits include 100 GB fast
data transfer, 6,000 build minutes, 100 deployments per day, a 45-minute build limit, and a 100 MB
CLI source upload limit. The static proof is about 1.1 MB and contains no functions, comfortably
below the relevant build and file limits.

Limits and terms can change. Recheck [Vercel limits](https://vercel.com/docs/limits), the
[Hobby plan](https://vercel.com/docs/plans/hobby), and its non-commercial restriction periodically
and before changing the deployment model. If a free quota is exhausted, the expected response is
degraded availability or a paused update—not variable billing.

## Deployment status

As of 2026-11-26, `main` deploys to production and `staging` creates persistent preview
deployments. Vercel records the Git commit for each deployment, and the landing links to the
matching source repository. The initial production deployment was checked for a successful page
response, static assets, and a valid downloadable dataset.

Before each substantive public release:

- run `npm ci && npm run check` from a clean checkout;
- verify output size and that no secrets or private notes are in `apps/web/out`;
- connect only the personal Git repository allowed by Hobby terms;
- record the deployed commit and expose the matching source repository link;
- confirm analytics and paid features remain disabled;
- smoke-test source links, keyboard use, both themes, and a narrow viewport.
