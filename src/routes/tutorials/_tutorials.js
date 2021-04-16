const tutorialData =
        Promise.all(Object.entries(import.meta.glob('/src/content/tutorials/*.md')).map(
            async ([path, page]) => {
                const { default: Rendered, metadata } = await page();
                const filename = path.split('/').pop();
                return { ...metadata, filename, rendered: Rendered };
            }
        ));

const slugRegex = /^([a-z-0-9]+)(?:\.md)$/;

export default async function tutorials() {
  let tutorials = await tutorialData;
  const slugs = Object.fromEntries(
    tutorials.map((tutorial) => [tutorial.filename.match(slugRegex)[1], {...tutorial, slug: tutorial.filename.match(slugRegex)[1]}])
  );
  return slugs
}