#!/usr/bin/env node
/**
 * Capture screenshots of the o4f-codebase prototype (localhost:3100) for use
 * as ambient visual layers in the marketing site.
 *
 * Uses headless Chrome via CDP. Seeds the mock-auth localStorage so each
 * route renders as a logged-in admin. For routes with extra interaction
 * (e.g. the backtest "Create Session" modal), we run a small per-route
 * setup script before screenshotting.
 */

import { spawn } from 'node:child_process';
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'screens');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = 'http://localhost:3000';

const MOCK_LS = {
  'o4f.settings.v1': JSON.stringify({ theme: 'default-dark', fontSans: 'Inter', fontMono: 'JetBrains Mono' }),
  'o4f_app_store_v1': JSON.stringify({ user: { name: 'Aman', initials: 'A' }, role: 'admin', killEngaged: false, forceManual: false, env: 'TEST' }),
};

const TARGETS = [
  { path: '/',                       file: 'dashboard.png',     post: null },
  { path: '/strategy',               file: 'strategy.png',      post: null },
  { path: '/orders',                 file: 'orders.png',        post: null },
  { path: '/approve',                file: 'approve.png',       post: null },
  { path: '/rms',                    file: 'rms.png',           post: null },
  { path: '/strategies',             file: 'strategies.png',    post: null },
  { path: '/history',                file: 'history.png',       post: null },
  { path: '/admin/test-pipeline',    file: 'pipeline.png',      post: null },
  // Backtest with a real session selected — chart renders with BUY/SELL markers
  {
    path: '/backtest',
    file:  'backtest-chart.png',
    post: `
      // Open the session selector
      const dd = document.querySelector('button.w-full.bg-gray-700');
      dd?.click();
      await new Promise(r => setTimeout(r, 500));
      // Pick the 'test3' session (has cached chart data)
      const sessions = Array.from(document.querySelectorAll('button'));
      const t3 = sessions.find(b => b.textContent.includes('test3') && b.textContent.includes('crossover'));
      t3?.click();
      // Wait for chart to render
      await new Promise(r => setTimeout(r, 4000));

      // Try to enable several indicators by clicking them one by one
      const wantedIndicators = ['ALMA', 'HMA', 'VWMA', 'TWAP', 'MA Ribbon', 'EMA+ST'];
      for (const ind of wantedIndicators) {
        // Open the Indicators menu fresh each time
        const indBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('Indicators'));
        if (!indBtn) break;
        indBtn.click();
        await new Promise(r => setTimeout(r, 350));
        const item = Array.from(document.querySelectorAll('button')).find(b => {
          const t = b.textContent.trim();
          return t.startsWith(ind);
        });
        item?.click();
        await new Promise(r => setTimeout(r, 250));
        // Close menu by clicking elsewhere
        document.body.click();
        await new Promise(r => setTimeout(r, 200));
      }
      await new Promise(r => setTimeout(r, 800));
    `,
  },
  // Also keep the Create Session modal capture as an option
  {
    path: '/backtest',
    file:  'backtest-modal.png',
    post: `
      const dd = document.querySelector('button.w-full.bg-gray-700');
      dd?.click();
      await new Promise(r => setTimeout(r, 400));
      const create = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Create New Session'));
      create?.click();
      await new Promise(r => setTimeout(r, 600));
    `,
  },
];

const OUT_W = 1600;
const OUT_H = 1100;

await mkdir(OUT_DIR, { recursive: true });

const TMP_DIR = join(__dirname, '..', '.cache-screens');
await mkdir(TMP_DIR, { recursive: true });
const profileDir = join(TMP_DIR, 'profile');
if (existsSync(profileDir)) await rm(profileDir, { recursive: true, force: true });

const cdpPort = 9222;
const chrome = spawn(CHROME, [
  `--remote-debugging-port=${cdpPort}`,
  `--user-data-dir=${profileDir}`,
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  `--window-size=${OUT_W},${OUT_H}`,
  'about:blank',
], { stdio: ['ignore', 'pipe', 'pipe'] });

let cdpReady = false;
for (let i = 0; i < 30; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
    if (r.ok) { cdpReady = true; break; }
  } catch {}
  await new Promise(r => setTimeout(r, 200));
}
if (!cdpReady) { chrome.kill(); throw new Error('CDP did not come up'); }

async function getWsUrl() {
  const r = await fetch(`http://127.0.0.1:${cdpPort}/json`);
  const tabs = await r.json();
  return tabs.find(t => t.type === 'page')?.webSocketDebuggerUrl;
}

const ws = new WebSocket(await getWsUrl());
let msgId = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
await new Promise(r => ws.addEventListener('open', r, { once: true }));

function cdp(method, params = {}) {
  const id = ++msgId;
  return new Promise((resolve, reject) => {
    pending.set(id, (msg) => msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result));
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await cdp('Page.enable');
await cdp('Runtime.enable');

// Seed LS at the origin
await cdp('Page.navigate', { url: BASE + '/' });
await new Promise(r => setTimeout(r, 1500));
await cdp('Runtime.evaluate', {
  expression: Object.entries(MOCK_LS).map(([k, v]) => `localStorage.setItem(${JSON.stringify(k)}, ${JSON.stringify(v)});`).join('\n') + ' "ok"',
});

for (const t of TARGETS) {
  console.log('→', t.path);
  await cdp('Page.navigate', { url: BASE + t.path });
  await new Promise(r => setTimeout(r, 2000));
  if (t.post) {
    try {
      await cdp('Runtime.evaluate', { expression: `(async()=>{ ${t.post} })()`, awaitPromise: true });
    } catch (e) {
      console.warn('  post-script failed:', e.message);
    }
  }
  const { data } = await cdp('Page.captureScreenshot', { format: 'png' });
  await writeFile(join(OUT_DIR, t.file), Buffer.from(data, 'base64'));
  console.log('  ✓', t.file);
}

ws.close();
chrome.kill();
console.log('done');
