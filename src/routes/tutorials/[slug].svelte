<script context="module">
    import tutorials from './_tutorials';
    export const prerender = true;

    const slugRegex = /^([a-z-0-9]+)(?:\.md)$/;

    /**
	    * @type {import('@sveltejs/kit').Load}
     */
    export async function load({ page, fetch, session, context }) {
        const { slug } = page.params;
        const allTutorials = await tutorials();
        const tutorial = allTutorials[slug]

        if (tutorial) {
            return {
                props: {
                title: tutorial.title,
                description: tutorial.description,
                pageUrl: page.path,
                rendered: tutorial.rendered,
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
    export let rendered;
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
    {#key rendered}
        <article>
          <svelte:component this={rendered} />
        </article>
    {/key}
</div>
