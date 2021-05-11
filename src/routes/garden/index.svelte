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

	function handleKeydown(event) {
		if (event.keyCode === 220) {
			event.preventDefault();
			document.getElementById("postSearch").focus();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<h1 class="title">Digital Garden</h1>
<p class="h4">
	Notes that are in varying stages of "done", ranging from musings to more concrete and researched thoughts.
	Search for any particular post or filter by a tag.
</p>
<div class="searchbar">
	<label for="postSearch" class="visually-hidden">Search for post</label>
	<input id="postSearch" placeholder="Search for posts (press \ to focus)" type="text" bind:value={query} />
</div>
<TagGroup {tags} on:tagUpdate={handleTagUpdate}/>
<div class="garden-posts">
	{#each formatted as post}
		<PostCard {post} />
	{/each}
</div>

<style lang="scss">
	h1 {
		color: var(--primary-400);
	}
	.garden-posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
	  grid-gap: 16px;
		margin-bottom: 16px;
	}
	input {
		color: var(--gray-700);
		font-family: var(--font-family-light);
		font-size: 1rem;
		background-image: url('/searchIcon.svg');
  	background-position: 10px 15px;
  	background-repeat: no-repeat;
		width: 100%;
		height: 48px;
		padding-top: 5px;
		border-radius: 5px;
		border: 2px solid var(--gray-300);
		position: relative;
		padding-left: 40px;

		&::placeholder {
			color: var(--gray-400);
			font-size: 1rem;
			font-family: var(--font-family-light);
		}
	}
</style>