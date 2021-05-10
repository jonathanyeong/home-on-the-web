<script context="module">
  export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/garden.json');
		const {posts, tags} = await res.json();
		return {
			props: {
				posts: posts,
				tags: tags
			}
		};
	}
</script>


<script>
	import PostCard from '$lib/PostCard.svelte';
	import TagGroup from '$lib/TagGroup.svelte';
  export let posts;
	export let tags;
	import Fuse from 'fuse.js'

	let activeTags = tags;
	let query = "";
	let options = { keys: ["title"] };
	let result = []
	let formatted = [];

	$: postList = posts.filter(post => post.tags.some(t => activeTags.indexOf(t) >= 0));
	$: fuse = new Fuse(postList, options);
  $: if (postList) fuse.setCollection(postList);
	$: if (query === "") formatted = postList
  $: if (query !== "") {
    result = fuse.search(query);
		formatted = result.map((r) => { return r.item });
  }
	function handleTagUpdate(event) {
		if (event.detail.activeTags.length === 0) {
			activeTags = tags;
		} else {
			activeTags = event.detail.activeTags;
		}
	}
</script>

<h1>Welcome to the Garden</h1>
<input placeholder="Search!" type="text" bind:value={query} />
<p>Tag list is:</p>
<TagGroup {tags} on:tagUpdate={handleTagUpdate}/>
<div class="garden-posts">
	{#each formatted as post}
		<PostCard date={post.date} slug={post.slug} title={post.title} />
	{/each}
</div>

<style lang="scss">
	.garden-posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
	  grid-gap: 16px;
		margin-bottom: 16px;
	}
</style>