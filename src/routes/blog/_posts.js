const posts =
        Promise.all(Object.entries(import.meta.glob('/src/posts/*.md')).map(
            async ([path, page]) => {
                const { metadata } = await page();
                const filename = path.split('/').pop();
                return { ...metadata, filename };
            }
        ));

const slugRegex = /^([a-z-0-9]+)(?:\.md)$/;

export default async function allPosts() {
  let allPosts = await posts;
  const slugs = Object.fromEntries(
    allPosts.map((post) => [post.filename.match(slugRegex)[1], post])
  );
  return slugs
}