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
	let	postList =  posts.slice(0,9)
</script>

<svelte:head>
	<title>Jonathan Yeong's Site</title>
</svelte:head>

<h1 class="title">Jonathan Yeong</h1>
<p class="subtitle h4">
	Welcome to my home on the web! I’m a backend developer writing about learning, developer growth,
	and tech I’m currently using. You can also find me on <a class="yt-link header-links" href="https://www.youtube.com/channel/UClb6km0HLkGUOEjHlp5WdPA" rel="noopener noreferrer nofollow" target="_blank">Youtube</a>,
	where I record Elixir tutorials, and connect with me on <a class="twitter-link header-links" href="https://twitter.com/JonoYeong" rel="noopener noreferrer nofollow" target="_blank">Twitter</a>.
</p>

<main>
	<h2 class="h3">Picked from the Garden</h2>
	<div class="garden-posts">
		{#each postList as post}
			<PostCard {post} />
		{/each}
	</div>
	<p class="more-posts-container">
		<a href="/garden" class="more-posts-link"><span>More from the garden</span> <ArrowRight className="homepage-arrow"/></a>
	</p>
</main>

<style lang="scss">
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
		  transition: width 0.3s ease-in-out 0s;
		}

		&:hover::before {
			width: 100%;
		}
	}

	.yt-link {
		&:before {
			background: var(--fiery-rose);
		}
	}

	.twitter-link {
		&:before {
			background: var(--twitter-pastel);
		}
	}
	.garden-posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
	  grid-gap: 20px;
		margin-bottom: 16px;

		@media (min-width: 768px) {
			grid-gap: 30px;
		}
	}


	.more-posts-container {
		display:flex;
		justify-content: flex-end;
		align-items: center;
		text-align: right;
	}

	.more-posts-link {
		position: relative;
		font-family: var(--font-family-medium);
		display: flex;
		align-items: center;
		color: var(--gray-700);
		:global(.homepage-arrow) {
			fill: var(--gray-700);
		}
		&:hover > span::before {
			opacity: 1;
		}
		span {
			position: relative;
			&:before {
				content: '';
				background: var(--secondary-400);
				width: 100%;
				height: 2px;
				position: absolute;
				bottom: -1px;
				opacity: 0;
				transition: opacity 0.1s ease-in-out;
			}

		}
	}

</style>