// SPDX-License-Identifier: AGPL-3.0-only

export function BrokenDial() {
  const ticks = Array.from({ length: 20 }, (_, index) => index * 18);

  return (
    <svg
      aria-hidden="true"
      className="broken-dial"
      focusable="false"
      viewBox="0 0 480 480"
    >
      <g className="dial-orbits" fill="none">
        <circle cx="240" cy="240" r="185" />
        <path d="M97 124A185 185 0 0 1 401 149" />
        <path d="M408 315A185 185 0 0 1 146 400" />
        <ellipse cx="240" cy="240" rx="220" ry="112" transform="rotate(-18 240 240)" />
      </g>
      <g className="dial-ticks">
        {ticks.map((angle) => (
          <line
            key={angle}
            x1="240"
            x2="240"
            y1="47"
            y2={angle % 90 === 0 ? "70" : "60"}
            transform={`rotate(${angle} 240 240)`}
          />
        ))}
      </g>
      <g className="dial-hands">
        <path d="M240 240 338 142" />
        <path d="M240 240 201 340" />
        <circle cx="240" cy="240" r="7" />
      </g>
      <path className="dial-circuit" d="M45 314h82l24-24h62" fill="none" />
      <circle className="dial-node" cx="45" cy="314" r="5" />
      <circle className="dial-node" cx="213" cy="290" r="5" />
    </svg>
  );
}
