const siteUrl = 'https://jonathanyeong.com';

const render = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.jonathanyeong.com/</loc>
    <lastmod>${new Date("2021-06-02").toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>https://www.jonathanyeong.com/about</loc>
    <lastmod>${new Date("2021-06-02").toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>https://www.jonathanyeong.com/garden</loc>
    <lastmod>2021-06-02</lastmod>
    <changefreq>yearly</changefreq>
  </url>
  ${posts.map(post => `
    <url>
      <loc>https://www.jonathanyeong.com/garden/${post.slug}</loc>
      <lastmod>${new Date(post.lastUpdatedDate).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
    </url>
  `
  ).join('\n')}
</urlset>
`

import plants from './garden/_plants'
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const allPlants = await plants();

  const feed = render(Object.values(allPlants));


  return {
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/xml'
    },
    body: feed
  };
}
