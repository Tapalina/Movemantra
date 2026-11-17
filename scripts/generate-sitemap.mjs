// Generates public/sitemap.xml and public/robots.txt from siteConfig and the services list.
// Runs automatically before `npm run build`; run manually with `npm run sitemap`.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { siteConfig } from '../src/data/siteConfig.js';
import { services } from '../src/data/services.js';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const base = siteConfig.siteUrl.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/home-visits', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  { path: '/feedback', priority: '0.4', changefreq: 'yearly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${base}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

writeFileSync(`${publicDir}sitemap.xml`, xml);
writeFileSync(`${publicDir}robots.txt`, robots);
console.log(`sitemap.xml written with ${routes.length} URLs for ${base}`);
