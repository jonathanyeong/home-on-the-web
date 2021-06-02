const siteUrl = 'https://jonathanyeong.com';

const renderXmlRssFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title><![CDATA[Jonathan Yeong's Blog]]></title>
  <link>${siteUrl}</link>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
  <pubDate>${new Date("2021-06-01").toUTCString()}</pubDate>
  <description><![CDATA[I write about a variety topics around being a developer. With technical articles focused around Ruby, Elixir, Javascript, and their respective ecosystems.]]></description>

  ${posts.map(post => `
      <item>
          <title><![CDATA[${post.title}]]></title>
          <link>${siteUrl}/${post.slug}</link>
          <description><![CDATA[${post.description}]]></description>
          <pubDate>${new Date(post.createdAtDate).toUTCString()}</pubDate>
          <guid isPermaLink="true">${siteUrl}/${post.slug}</guid>
          <author>hello@jonathanyeong.com (Jonathan Yeong)</author>
      </item>
  `).join('\n')}
</channel>
</rss>`;

import plants from './garden/_plants'
import tutorials from './tutorials/_tutorials'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const allPlants = await plants();
  // const allTutorials = await tutorials();
  // const allContent = {...allPlants, ...allTutorials}

  // const posts = Object.values(allPlants).map((slug) => {
  //   return {
  //       title: allContent[slug].title,
  //       date: allContent[slug].date,
  //       description: allContent[slug].description,
  //       slug: slug,
  //     };
  // })

  const feed = renderXmlRssFeed(Object.values(allPlants));


  return {
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/rss+xml'
    },
    body: feed
  };
}
