// SPDX-License-Identifier: AGPL-3.0-only

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-mark" aria-hidden="true">◈</span>
        <strong>Templinio</strong>
      </div>
      <p>
        Open source under <a href="https://www.gnu.org/licenses/agpl-3.0.html">AGPL-3.0-only</a>.
      </p>
      <p>
        <a href="/resources">Data resources</a> · <a href="https://github.com/luantorv/templinio">Source code</a> · Built by{" "}
        <a href="https://github.com/luantorv">@luantorv</a>
      </p>
    </footer>
  );
}
