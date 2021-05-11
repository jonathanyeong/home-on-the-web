<script context="module">
  import plants from './_plants';
  export const prerender = true;

  /**
    * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ page, fetch, session, context }) {
    const { slug } = page.params
    const allPlants = await plants();
    const plant = allPlants[slug]

    if (plant) {
      return {
        props: {
          title: plant.title,
          description: plant.description,
          pageUrl: page.path,
          rendered: plant.rendered,
        },
      };
    } else {
      // not found
      return {
          status: 404,
          error: new Error('Not found'),
      };
    }

  };
</script>

<script>
  export let rendered;
  export let title;
  export let description;
  export let pageUrl; // TODO: This might not return the full URL

  let encodedShareUrl = encodeURI(`https://twitter.com/intent/tweet?text=${title} by @jonoyeong ${pageUrl}`)
</script>

<svelte:head>
	<title>{title}</title>
  <meta property="og:title" content="{title}"/>
  <meta property="og:url" content="{pageUrl}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:type" content="article" />
  <link rel="canonical" href="{pageUrl}" />
</svelte:head>

<div>
  <h1 class="title">{title}</h1>
  {#key rendered}
      <article>
        <svelte:component this={rendered} />
      </article>
  {/key}
  <p>Liked this post? Share it on <a target="_blank" href="{encodedShareUrl}" data-dnt="true">Twitter</a></p>
</div>