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
          rendered: plant.rendered
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
  import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
  export let rendered;
  export let title;
  export let description;
  export let pageUrl;

  const fullUrl = `https://jonathanyeong.com${pageUrl}`
  let encodedShareUrl = encodeURI(`https://twitter.com/intent/tweet?text=${title} by @jonoyeong ${fullUrl}`)
</script>

<svelte:head>
	<title>{title}</title>
  <meta property="og:title" content="{title}"/>
  <meta property="og:url" content="{fullUrl}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:type" content="article" />
  <link rel="canonical" href="{fullUrl}" />
</svelte:head>

<div>
  <h1 class="title">{title}</h1>
  {#key rendered}
      <article class="prose">
        <svelte:component this={rendered} />
      </article>
  {/key}
  <hr />
  <p class="twitter-share-container">Liked this post? Share it on <a target="_blank" href="{encodedShareUrl}" data-dnt="true" class="twitter-share-link"><TwitterIcon className="twitter-share-icon" /> Twitter</a></p>
</div>

<style lang="scss">
  hr {
    border: 1px solid var(--gray-200);
  }
  .twitter-share-container {
    text-align: center;
  }

  .twitter-share-container :global(.twitter-share-icon) {
    fill: var(--primary-400);
    position: absolute;
    left: 0;
    top: -4px;
  }
  .twitter-share-link {
    text-decoration: none;
    color: var(--primary-400);
    font-family: var(--font-family-medium);
    position: relative;
    padding-left: 25px;
  }


</style>