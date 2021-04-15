const plantData =
        Promise.all(Object.entries(import.meta.glob('/src/content/garden/*.md')).map(
            async ([path, page]) => {
                const { default: Rendered, metadata } = await page();
                const filename = path.split('/').pop();
                return { ...metadata, filename, rendered: Rendered };
            }
        ));

const slugRegex = /^([a-z-0-9]+)(?:\.md)$/;

export default async function plants() {
  let plants = await plantData;
  // We key off slug so we can efficiently access it in [slug].svelte
  const slugs = Object.fromEntries(
    plants.map((plant) => [plant.filename.match(slugRegex)[1], {...plant, slug: plant.filename.match(slugRegex)[1]}])
  );
  return slugs
}