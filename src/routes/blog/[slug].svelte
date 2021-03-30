<script context="module">
    import allPosts from './_posts';

    export const prerender = true;

    const slugRegex = /^([a-z-0-9]+)(?:\.md)$/;

    /**
	    * @type {import('@sveltejs/kit').Load}
     */
    export async function load({ page, fetch, session, context }) {
        const { slug } = page.params;
        console.log("slug is", slug);
        /**
         * @type { { title: string, description: string, filename: string }[] }
         */
        const posts = await allPosts();

        if (slug in posts) {
            const pages = Object.fromEntries(
                await Promise.all(
                    Object.entries(import.meta.glob('/src/posts/*.md')).map(
                        async ([path, page]) => {
                            const filename = path.split('/').pop();
                            const slug = filename.match(slugRegex)[1];
                            return [slug, page];
                        }
                    )
                )
            );

            const { default: Rendered } = await pages[slug]();

            return {
                props: {
                    title: posts[slug].title,
                    description: posts[slug].description,
                    Rendered,
                },
            };
        } else {
            // not found
            return {
                status: 404,
                error: new Error('Not found'),
            };
        }
    }
</script>

<script>
    export let Rendered;
</script>


<div class="container mx-auto overflow-y-hidden px-3 md:pl-7">
    {#key Rendered}
        <article
            class="prose prose-lg py-8">
            <Rendered />
        </article>
    {/key}
</div>
