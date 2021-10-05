<script context="module">
  export const prerender = true;
	import metatags from '$lib/stores/metatags';
	const description = "My digital garden where I have thoughts in various stages of done-ness. Technical articles are focused around Ruby, Elixir, Javascript, and their respective ecosystems."

	export async function load({ fetch }) {
		const res = await fetch('/garden.json');
		metatags.title("Jonathan Yeong | Digital Garden");
		metatags.url("https://www.jonathanyeong.com/garden")
		metatags.desc(description)
		metatags.image("https://res.cloudinary.com/jonathan-yeong/image/upload/v1622474271/personal-blog/profile_pic_minified_svw9cq.jpg");

		if (res.ok) {
			const { posts, tags } = await res.json();
			return {
				props: {
					posts,
					tags
				}
			};
		}

	}
</script>


<script>
	export let posts;
	export let tags;
	import PostCard from '$lib/PostCard.svelte';
	import SearchWithFilters from '$lib/SearchFilter/SearchWithFilters.svelte';

	let formattedResults = chronologicallySorted(posts);

	function handleKeydown(event) {
		if (event.keyCode === 220) {
			event.preventDefault();
			document.getElementById("postSearch").focus();
		}
	}

	function chronologicallySorted(p) {
		return [...p].sort((a,b) => {
			const aDate = new Date(a.lastUpdatedDate)
			const bDate = new Date(b.lastUpdatedDate)
			return (aDate > bDate) ? -1 : 1
		})
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<h1 class="title">Digital Garden</h1>
<SearchWithFilters bind:formattedResults={formattedResults} {posts} filters={tags}/>

<div class="garden-posts">
	{#each formattedResults as post}
		<PostCard {post} />
	{/each}
</div>

<style lang="scss">
	.garden-posts {
		margin-top: 48px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
	  grid-gap: 20px;
		margin-bottom: 16px;

		@media (min-width: 768px) {
			grid-gap: 30px;
		}
	}
</style>