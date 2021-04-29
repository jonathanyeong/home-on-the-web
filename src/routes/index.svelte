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
	export let posts;

	let postList =  posts.slice(0,8)

</script>

<svelte:head>
	<title>Jonathan Yeong's Site</title>
</svelte:head>

<h1 class="title">Jonathan Yeong</h1>
<p>
	Welcome to my home on the web! I’m a backend developer writing about learning, developer growth,
	and tech I’m currently using. You can also find me on <a class="yt-link" href="https://www.youtube.com/channel/UClb6km0HLkGUOEjHlp5WdPA" target="_blank">Youtube</a>,
	where I record Elixir tutorials, and connect with me on <a class="twitter-link" href="https://twitter.com/JonoYeong" target="_blank">Twitter</a>.
</p>

<main>
	<h2 class="h3">The Digital Garden</h2>
	<div class="garden-posts">
		{#each postList as post}
			<article class="garden-post">
				<div class="garden-post-inner">
					<a sveltekit:prefetch href="/garden/{post.slug}">{post.title}</a>
				</div>
			</article>
		{/each}
	</div>

	<a href="/garden">More from the garden</a>
</main>

<style lang="scss">
	.title {
		color: var(--primary-400);
	}

	a {
		color: var(--gray-700);
		font-family: var(--font-family-heavy);
		text-decoration: none;
		&:visited {
			color: var(--gray-700);
			text-decoration: none;
		}
	}
	.garden-posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
		grid-auto-flow: column;
	  grid-gap: 1rem;
	}
	.garden-post {
		border-radius: 5px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		position: relative;
		background-color: var(--secondary-400);
		height: 100%;
	}

	.garden-post-inner {
		background: var(--white);
		border-radius: 5px;
		display: block;
		position: relative;
		height: 100%;
	}

	.garden-post:hover .garden-post-inner {
		transform: translate(-10px, -10px);
	}

</style>