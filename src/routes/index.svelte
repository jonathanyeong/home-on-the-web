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
	export let posts;

	let postList =  posts.slice(0,8)

	const readableDate = (date) => {
		const dateObj = new Date(date)
		let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
		let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObj);
		let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);
		return `${da} ${mo}, ${ye}`;
	}

	const htmlDate = (date) => {
		const dateObj = new Date(date)
		let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
		let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(dateObj);
		let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dateObj);
		return `${ye}-${mo}-${da}`;
	}
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
	<h2 class="h3">The Digital Garden</h2>
	<div class="garden-posts">
		{#each postList as post}
			<article class="garden-post">
				<div class="garden-post-inner">
					<time class="garden-post-info" datetime="{htmlDate(post.date)}">{readableDate(post.date)}</time>
					<a sveltekit:prefetch class="h4 garden-post-title" href="/garden/{post.slug}">{post.title}</a>
				</div>
			</article>
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
	}
	.garden-posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
	  grid-gap: 16px;
		margin-bottom: 16px;
	}
	.garden-post {
		border-radius: 5px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		position: relative;
		background-color: var(--secondary-400);
		height: 200px;
	}

	.garden-post-inner {
		background: var(--white);
		border: 2px solid var(--primary-400);
		border-radius: 5px;
		display: flex;
		position: relative;
		height: 100%;
		flex-direction: column;
	}

	.garden-post:hover .garden-post-inner {
		transform: translateY(-10px);
	}

	.garden-post-title {
		font-family: var(--font-family-medium);
	}

	.garden-post-info {
		color: var(--gray-400);
		font-size: var(--small-text);
	}

	.garden-post-info,
	.garden-post-title {
		margin: 18px 20px 0;
	}

	.more-posts-container {
		display:flex;
		justify-content: flex-end;
		align-items: center;
		text-align: right;
		margin-bottom: 88px;
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