<script>
	import SearchBar from '$lib/SearchFilter/SearchBar.svelte';
	import { chronologicallySorted } from '$lib/chronologicalSort';
	import Fuse from 'fuse.js';

	export let posts = [];
	export let formattedResults = [];
	const options = {
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

	const postsIndex = Fuse.createIndex(options.keys, posts);
	const fuse = new Fuse(posts, options, postsIndex);

	let query = "";
	let tagToggle = false;

	// If query changes and it's not empty call fuse to return search results
  $: if (query !== "") {
		formattedResults = fuse.search(query).map(r => r.item);
  }

	// If query changes and it's empty and there's no tags - then just return all posts
	// Also the initial state
	$: if (query === "" && !tagToggle) {
		formattedResults = chronologicallySorted(posts);
	}

	// If query changes and it's empty but there's a tag selected. Only show the posts
	// Related to that tag (activeTagPosts)
	$: if (query === "" && tagToggle) {
		formattedResults = chronologicallySorted(activeTagPosts);
	}
</script>

<SearchBar bind:query={query} />

