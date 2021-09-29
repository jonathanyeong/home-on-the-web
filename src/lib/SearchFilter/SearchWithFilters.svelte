<script>
	import SearchBar from '$lib/SearchFilter/SearchBar.svelte';
	import { chronologicallySorted } from '$lib/chronologicalSort';
	import Fuse from 'fuse.js';

	export let posts = [];
	export let formattedResults = [];
	let results = []
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
</script>

<SearchBar bind:query={query} />

