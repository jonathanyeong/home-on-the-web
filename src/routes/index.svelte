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
	let	postList =  posts.filter((p) => p.featuredPost).slice(0,6)
	postList = postList.sort((a,b) => {
		const aDate = new Date(a.lastUpdatedDate)
		const bDate = new Date(b.lastUpdatedDate)
		return (aDate > bDate) ? -1 : 1
	})
</script>

<svelte:head>
	<title>Jonathan Yeong</title>
	<meta name="description" content="I write about a variety topics around being a developer. With technical articles focused around Ruby, Elixir, Javascript, and their respective ecosystems." />
	<link rel="canonical" href="https://www.jonathanyeong.com/" />
</svelte:head>

<h1 class="title">Jonathan Yeong</h1>
<p class="subtitle h4">
	Hi there!
	I write about all things developer. Posts in my <a class="garden-link header-links" href="/garden"><span data-content="Digital Garden" aria-hidden="true"></span>Digital Garden</a> are in various stages of done-ness.
	I upload in-depth tutorials and tech related videos on <a class="yt-link header-links" href="https://www.youtube.com/c/jonathanyeong" rel="noopener noreferrer nofollow" target="_blank"><span data-content="Youtube" aria-hidden="true"></span>Youtube</a>.
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
		color: var(--body-text-color);
		text-decoration: none;
		&:visited {
			color: var(--body-text-color);
			text-decoration: none;
		}
	}

	.header-links {
		font-family: var(--font-family-heavy);
		position: relative;
		display: inline-block;
		span {
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			transform: translateX(-100%);
			transition: transform 200ms ease;

			&:before {
				display: inline-block;
				content: attr(data-content);
				color: var(--secondary-400);
				transform: translateX(100%);
				transition: transform 200ms ease;
			}
		}

		&:hover {
			span {
				transform: translateX(0);
			}

			span::before {
				transform: translateX(0);
			}
		}
	}

	.yt-link {
		span::before {
			color: var(--fiery-rose);
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
		color: var(--body-text-color);
		:global(.homepage-arrow) {
			fill: var(--body-text-color);
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