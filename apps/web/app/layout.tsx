// SPDX-License-Identifier: AGPL-3.0-only

import type { Metadata } from "next";
import "@fontsource/cinzel/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Templinio — Software Lifecycle Atlas",
    template: "%s — Templinio",
  },
  description: "Traceable software lifecycle data for exploring change over time.",
};

const themeScript = `
  try {
    const stored = localStorage.getItem("templinio-theme");
    const theme = stored === "midnight" || stored === "ivory"
      ? stored
      : (matchMedia("(prefers-color-scheme: light)").matches ? "ivory" : "midnight");
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "midnight";
  }
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="midnight"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
