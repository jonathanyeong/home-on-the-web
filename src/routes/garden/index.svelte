<script context="module">
  export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/garden.json');

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
	import TagGroup from '$lib/TagGroup.svelte';
	import Fuse from 'fuse.js'

	let activeTags = tags;
	let tagToggle = false;
	let query = "";
	let options = { keys: ["title"] };
	let results = []
	let formattedResults = posts;
	let activeTagPosts = []
	const fuse = new Fuse(posts, options);

  $: if (query !== "") {
		results = fuse.search(query).map(r => r.item);
		formattedResults = results
  }

	$: if (query === "" && !tagToggle) {
		formattedResults = posts;
	}

	$: if (query === "" && tagToggle) {
		formattedResults = activeTagPosts;
	}

	function handleTagUpdate(event) {
		if (event.detail.activeTags.length === 0) {
			tagToggle = false;
			activeTags = tags;
			fuse.setCollection(posts);
		} else {
			tagToggle = true;
			activeTags = event.detail.activeTags;
			activeTagPosts = posts.filter(post => post.tags.some(t => activeTags.indexOf(t) >= 0));
			fuse.setCollection(activeTagPosts);
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
<!-- <p class="h4">
	Notes that are in varying stages of "done", ranging from musings to more concrete and researched thoughts.
	Search for any particular post or filter by a tag.
</p> -->
<div class="searchbar">
	<label for="postSearch" class="visually-hidden">Search for post</label>
	<input id="postSearch" placeholder="Search for posts (press \ to focus)" type="text" bind:value={query} />
</div>
<TagGroup {tags} on:tagUpdate={handleTagUpdate}/>

<div class="garden-posts">
	{#each formattedResults as post}
		<PostCard {post} />
	{/each}
</div>

<style lang="scss">
	.garden-posts {
		margin-top: 48px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
	  grid-gap: 16px;
		margin-bottom: 16px;
	}
	.searchbar {
		display: flex;
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