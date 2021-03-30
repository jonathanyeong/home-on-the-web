const posts =
        Promise.all(Object.entries(import.meta.glob('/src/posts/*.md')).map(
            async ([path, page]) => {
                const { metadata } = await page();
                const filename = path.split('/').pop();
                return { ...metadata, filename };
            }
        ));

console.log(`Posts are: ${posts}`);
export default posts;