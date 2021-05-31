<script context="module">
	import Fuse from 'fuse.js'
  export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/garden.json');

		if (res.ok) {
			const { posts, tags } = await res.json();
			let options = {
				keys: [
					{
						name: "title",
						weight: 0.3
					},
					{
						name:  "tags",
						weight: 0.7
					}]
			};
			const postsIndex = Fuse.createIndex(options.keys, posts)
			const fuse = new Fuse(posts, options, postsIndex);
			return {
				props: {
					posts,
					tags,
					fuse
				}
			};
		}

	}
</script>


<script>
	export let posts;
	export let tags;
	export let fuse;
	import PostCard from '$lib/PostCard.svelte';
	import TagGroup from '$lib/TagGroup.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	let activeTags = tags;
	let tagToggle = false;
	let query = "";
	let results = []
	let formattedResults = chronologicallySorted(posts);
	let activeTagPosts = []

  $: if (query !== "") {
		results = fuse.search(query).map(r => r.item);
		formattedResults = results
  }

	$: if (query === "" && !tagToggle) {
		formattedResults = chronologicallySorted(posts);
	}

	$: if (query === "" && tagToggle) {
		formattedResults = chronologicallySorted(activeTagPosts);
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

		if (query !== "") {
			results = fuse.search(query).map(r => r.item);
			formattedResults = results
		}
	}

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
<!-- <p class="h4">
	Notes that are in varying stages of "done", ranging from musings to more concrete and researched thoughts.
	Search for any particular post or filter by a tag.
</p> -->
<div class="searchbar">
	<label for="postSearch" class="visually-hidden">Search for post</label>
	<input id="postSearch" placeholder="Search for posts (press \ to focus)" type="text" bind:value={query} />
	<span class="searchbar-icon-container"><SearchIcon className="search-icon" /></span>
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
		grid-template-columns: repeat(auto-fill, minmax(min(230px, 100%), 1fr));
	  grid-gap: 20px;
		margin-bottom: 16px;

		@media (min-width: 768px) {
			grid-gap: 30px;
		}
	}

	.searchbar {
		position: relative;
		display: flex;
	}

	.searchbar-icon-container {
		position:absolute;
		height: 100%;
		left: 15px;
		display: flex;
		align-items: center;

		:global(.search-icon) {
			fill: var(--search-bar-placeholder);
		}
	}

	input {
		color: var(--body-text-color);
		background-color: var(--search-bar-bg);
		font-family: var(--font-family-light);
		font-size: 1rem;
		width: 100%;
		height: 48px;
		padding-top: 5px;
		border-radius: 5px;
		border: 2px solid var(--search-bar-border);
		position: relative;
		padding-left: 40px;

		&::placeholder {
			color: var(--search-bar-placeholder);
			font-size: 1rem;
			font-family: var(--font-family-light);
		}
	}
</style>