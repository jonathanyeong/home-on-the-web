<script context="module">
  export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/garden.json');
		const {posts} = await res.json();
		return {
			props: {
				posts: posts,
			}
		};
	}
</script>

<script>
	import ArrowRight from '$lib/icons/ArrowRight.svelte';
	import PostCard from '$lib/PostCard.svelte';
	export let posts = [];
	let	postList =  posts.slice(0,8)
</script>

<svelte:head>
	<title>Jonathan Yeong's Site</title>
</svelte:head>

<h1 class="title">Jonathan Yeong</h1>
<p class="subtitle h4">
	Welcome to my home on the web! I’m a backend developer writing about learning, developer growth,
	and tech I’m currently using. You can also find me on <a class="yt-link header-links" href="https://www.youtube.com/channel/UClb6km0HLkGUOEjHlp5WdPA" target="_blank">Youtube</a>,
	where I record Elixir tutorials, and connect with me on <a class="twitter-link header-links" href="https://twitter.com/JonoYeong" target="_blank">Twitter</a>.
</p>

<main>
	<h2 class="h3">Picked from the Garden</h2>
	<div class="garden-posts">
		{#each postList as post}
			<PostCard date={post.date} slug={post.slug} title={post.title} />
		{/each}
	</div>
	<p class="more-posts-container">
		<a href="/garden" class="more-posts-link">More from the garden <ArrowRight className="homepage-arrow"/></a>
	</p>
</main>

<style lang="scss">
	.title {
		color: var(--primary-400);
		margin-top: 64px;
	}

	.subtitle {
		font-family: var(--font-family-light);
		max-width: 820px;
		margin-bottom: 56px;
	}

	a {
		color: var(--gray-700);
		text-decoration: none;
		&:visited {
			color: var(--gray-700);
			text-decoration: none;
		}
	}

	.header-links {
		font-family: var(--font-family-heavy);
		position: relative;
		display: inline-block;

		&:before {
			content:'';
			position: absolute;
			width: 16px;
			height: 6px;
			bottom: 5px;
		}
	}

	.yt-link {
		&:before {
			background: var(--fiery-rose);
		}
	}

	.twitter-link {
		&:before {
			background: var(--heliotrope-gray);
		}
	}
	.garden-posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
	  grid-gap: 16px;
		margin-bottom: 16px;
	}


	.more-posts-container {
		display:flex;
		justify-content: flex-end;
		align-items: center;
		text-align: right;
	}

	.more-posts-link {
		font-family: var(--font-family-medium);
		display: flex;
		align-items: center;
		color: var(--gray-700);
		:global(.homepage-arrow) {
			fill: var(--gray-700);
		}
	}

</style>