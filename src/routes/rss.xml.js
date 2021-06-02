const siteUrl = 'https://jonathanyeong.com';

const renderXmlRssFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title><![CDATA[Jonathan Yeong's Blog]]></title>
  <subtitle><![CDATA[A digital garden focused around all things developer]]></subtitle>
  <link href=${siteUrl} rel="self"/>
  <link href=${siteUrl}/>
  <description><![CDATA[ I write about a variety topics around being a developer. With technical articles focused around Ruby, Elixir, Javascript, and their respective ecosystems.]]></description>
  	<author>
		<name>Jonathan Yeong</name>
		<email>hello@jonathanyeong.com</email>
	</author>
  ${posts.map(post => `
      <item>
          <title>${post.title}</title>
          <link href=${siteUrl}/${post.slug} />
          <description><![CDATA[${post.description}]]></description>
          <updated>${new Date(post.lastUpdatedDate).toUTCString()}</updated>
          <pubDate>${new Date(post.createdAtDate).toUTCString()}</pubDate>
          <id>${post.slug}</id>
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
