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
                    pageUrl: page.path,
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
    export let title;
    export let description;
    export let pageUrl;
    export let coverImage;
</script>

<svelte:head>
	<title>{title}</title>
    <meta property="og:title" content="{title}"/>
    <meta property="og:url" content="{pageUrl}" />
    <meta property="og:description" content="{description}" />

    {#if coverImage}
        <meta name="twitter:card" content="summary_large_image">
        <meta property="og:image" content="{coverImage}" />
        <meta property="twitter:image" content="{coverImage}" />
    {/if}
    <meta property="og:type" content="article" />
</svelte:head>


<div>
    <h1>{title}</h1>
    {#key Rendered}
        <article>
            <Rendered />
        </article>
    {/key}
</div>
