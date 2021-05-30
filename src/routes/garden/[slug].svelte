<script context="module">
  import plants from './_plants';
  export const prerender = true;

  /**
    * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ page, fetch, session, context }) {
    const { slug } = page.params
    const allPlants = await plants();
    const post = allPlants[slug]

    if (post) {
      return {
        props: {
          post,
          pageUrl: page.path
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
  import { readableDate, htmlDate } from '$lib/dateParser';

  export let post;
  export let pageUrl;

  const { rendered, title, description, tags, createdAtDate, lastUpdatedDate } = post
  const fullUrl = `https://jonathanyeong.com${pageUrl}`
  let encodedShareUrl = encodeURI(`https://twitter.com/intent/tweet?text=${title} by @jonoyeong ${fullUrl}`)

  function readableTags(postTags) {
		const hashTags = postTags.map((tag) => {
			return `#${tag}`
		})
		return hashTags.join(', ');
	}
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
  <p class="post-meta">
    <span>
      <time datetime="{htmlDate(createdAtDate)}">{readableDate(createdAtDate)}</time>
      {#if lastUpdatedDate && lastUpdatedDate !== createdAtDate}
        - Updated <time datetime="{htmlDate(lastUpdatedDate)}">{readableDate(lastUpdatedDate)}</time>
      {/if}
    </span><span>•</span><span>{readableTags(tags)}</span></p>
  <hr class="post-header-divider" />
  {#key rendered}
      <article class="prose">
        <svelte:component this={rendered} />
      </article>
  {/key}
  <hr />
  <p class="twitter-share-container">Liked this post? Share it on <a target="_blank" href="{encodedShareUrl}" data-dnt="true" class="twitter-share-link"><TwitterIcon className="twitter-share-icon" /> Twitter</a></p>
</div>

<style lang="scss">
  .post-header-divider {
    margin-bottom: 2rem;
  }
  .title {
    margin-bottom: 0.8rem;
  }
  .post-meta {
    text-transform: uppercase;
    font-family: var(--font-family-heavy);
    font-size: var(--small-text);
    color: var(--gray-400);
    span {
      margin-right: 10px;
    }
  }
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