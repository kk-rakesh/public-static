import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync, mkdirSync } from 'fs';
import { readFileSync } from 'node:fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// Generates a static index.html for every route so GitHub Pages
// serves a real file for direct URL visits (no 404.html hack needed).
function staticRoutesPlugin() {
  return {
    name: 'static-routes',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtml = path.resolve(distDir, 'index.html');

      const routes = ['/blogs'];

      // Discover blog detail routes from the built blogs index
      const blogsIndex = path.resolve(__dirname, 'public', 'blogs', 'index.json');
      if (existsSync(blogsIndex)) {
        const { blogs } = JSON.parse(readFileSync(blogsIndex, 'utf-8'));
        for (const blog of (blogs as { id: string; slug: string }[])) {
          routes.push(`/blogs/${blog.slug}`);
        }
      }

      for (const route of routes) {
        const dir = path.resolve(distDir, route.slice(1));
        mkdirSync(dir, { recursive: true });
        cpSync(indexHtml, path.resolve(dir, 'index.html'));
      }

      console.log(`[static-routes] Generated ${routes.length} route(s):`, routes);
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), staticRoutesPlugin()],
    appType: 'spa',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
