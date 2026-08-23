#!/usr/bin/env node
/**
 * banner.mjs — генератор шапки для README (dark / light).
 * Никаких внешних сервисов: чистый SVG, который лежит в репозитории.
 *
 *   node scripts/banner.mjs --out assets
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const argv = process.argv.slice(2);
const arg = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : d;
};
const OUT = arg('out', 'assets');

const THEMES = {
  dark: {
    bg: '#0a0c0f',
    panel: '#0e1216',
    line: '#1b2129',
    text: '#e6edf3',
    dim: '#98a4b2',
    muted: '#66727f',
    faint: '#39424d',
    accent: '#8fdcf5',
    glow: '#8fdcf5',
    glowOpacity: 0.12,
  },
  light: {
    bg: '#ffffff',
    panel: '#fafbfc',
    line: '#e4e8ec',
    text: '#0d1116',
    dim: '#4a5560',
    muted: '#6b7681',
    faint: '#aab4be',
    accent: '#1f6d8c',
    glow: '#1f6d8c',
    glowOpacity: 0.09,
  },
};

const W = 1000;
const H = 286;

const META = [
  ['ROLE', 'System Administrator'],
  ['CODE', 'Python · PHP · JS · C'],
  ['NET', 'MikroTik · Cisco'],
  ['NEXT', 'DevOps Engineer'],
];

function render(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="FovBert — системный администратор, разработчик, безопасность">
<defs>
  <radialGradient id="g" cx="50%" cy="0%" r="70%">
    <stop offset="0%" stop-color="${t.glow}" stop-opacity="${t.glowOpacity}"/>
    <stop offset="100%" stop-color="${t.glow}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="n" x1="0" y1="0" x2="0" y2="1">
    <stop offset="25%" stop-color="${t.text}"/>
    <stop offset="100%" stop-color="${t.muted}"/>
  </linearGradient>
  <clipPath id="c"><rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="15"/></clipPath>
</defs>

<style>
  .s{font-family:"Segoe UI",Helvetica,Arial,sans-serif}
  .m{font-family:"JetBrains Mono","DejaVu Sans Mono",Consolas,monospace}
</style>

<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="15" fill="${t.panel}" stroke="${t.line}"/>
<g clip-path="url(#c)"><rect width="${W}" height="${H}" fill="url(#g)"/></g>

<!-- kicker -->
<circle cx="56" cy="49" r="4" fill="${t.accent}"/>
<text class="m" x="70" y="53" font-size="12" letter-spacing="4.2" fill="${t.muted}">SYSADMIN · DEVELOPER · SECURITY</text>

<!-- имя -->
<text class="s" x="54" y="132" font-size="80" font-weight="700" letter-spacing="-3.4" fill="url(#n)">FovBert</text>

<!-- роль -->
<text class="s" x="56" y="166" font-size="16" fill="${t.dim}">Системный администратор и разработчик · сети, серверы, безопасность</text>

<!-- разделитель -->
<line x1="56" y1="196" x2="${W - 56}" y2="196" stroke="${t.line}"/>

<!-- мета-колонки -->
${META.map(([k, v], i) => {
  const x = 56 + i * 240;
  return `<text class="m" x="${x}" y="222" font-size="9.5" letter-spacing="2.6" fill="${t.faint}">${k}</text>
<text class="s" x="${x}" y="245" font-size="13" fill="${t.dim}">${v}</text>`;
}).join('\n')}

<!-- телеграм справа сверху -->
<text class="m" x="${W - 56}" y="53" font-size="12" letter-spacing="1.6" fill="${t.accent}" text-anchor="end">@fovbert1</text>
</svg>
`;
}

const write = async (p, d) => {
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, d, 'utf8');
  console.log('  +', p);
};

await write(join(OUT, 'header-dark.svg'), render(THEMES.dark));
await write(join(OUT, 'header-light.svg'), render(THEMES.light));
console.log('шапка готова.');
