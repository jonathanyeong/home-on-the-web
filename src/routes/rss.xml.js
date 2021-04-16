import allPosts from './tutorial/_posts.jss.js'

const siteUrl = 'https://jonathanyeong.com';

const renderXmlRssFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
    <title><![CDATA[Jonathan's Blog]]></title>
    <link>${siteUrl}</link>
  <description><![CDATA[A developer's blog. Might be useful. Maybe.]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
        <url>${siteUrl}/profile-pic-small.jpg</url>
        <title><![CDATA[Jonathan's Blog]]></title>
        <link>${siteUrl}</link>
    </image>
    ${posts.map(post => `
        <item>
            <title>${post.title}</title>
      <link>${siteUrl}/${post.slug}</link>
      <guid isPermaLink="false">${siteUrl}/${post.slug}</guid>
            <description><![CDATA[${post.description}]]></description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
    `).join('\n')}
</channel>
</rss>`;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  let posts = await allPosts()

  posts = Object.keys(posts).map((slug) => {
    return {
        title: posts[slug].title,
        date: posts[slug].date,
        description: posts[slug].description,
        slug: slug,
      };
  })

  const feed = renderXmlRssFeed(posts);


  return {
    headers: {
      'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
      'Content-Type': 'application/rss+xml'
    },
    body: feed
  };
}
