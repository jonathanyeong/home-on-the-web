const postData =
        Promise.all(Object.entries(import.meta.glob('/src/content/garden/*.md')).map(
            async ([path, page]) => {
                const { default: Rendered, metadata } = await page();
                const filename = path.split('/').pop();
                return { ...metadata, filename, rendered: Rendered };
            }
        ));

const slugRegex = /^([a-z-0-9]+)(?:\.md)$/;

export default async function posts() {
  let posts = await postData;

  posts = posts.filter((post) => post.published || Date.parse(post.publishedAt) <= Date.now())
  // We key off slug so we can efficiently access it in [slug].svelte
  const slugs = Object.fromEntries(
    posts.map((post) => [post.filename.match(slugRegex)[1], {...post, slug: post.filename.match(slugRegex)[1]}])
  );
  return slugs
}