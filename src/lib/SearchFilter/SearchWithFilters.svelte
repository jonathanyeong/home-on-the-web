<script>
	import SearchBar from './SearchBar.svelte';
	import Filters from './Filters.svelte';
	import { chronologicallySorted } from '$lib/chronologicalSort';
	import Fuse from 'fuse.js';

	export let posts = [];
	export let formattedResults = [];
	export let filters = [];
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
	let selectedFilters = [];
	let selectedFilteredPosts = [];

	// If query changes and it's not empty call fuse to return search results
  $: if (query !== "") {
		formattedResults = fuse.search(query).map(r => r.item);
  }

	$: handleFilterUpdate(selectedFilters)

	// If query changes and it's empty and there's no tags - then just return all posts
	// Also the initial state
	$: if (query === "" && !tagToggle) {
		formattedResults = chronologicallySorted(posts);
	}

	// If query changes and it's empty but there's a tag selected. Only show the posts
	// Related to that tag (activeTagPosts)
	$: if (query === "" && tagToggle) {
		formattedResults = chronologicallySorted(selectedFilteredPosts);
	}

	const handleFilterUpdate = (filters) => {
		if (filters.length === 0) {
			console.log("No filters selected")
			tagToggle = false;
			fuse.setCollection(posts);
		} else {
			tagToggle = true;
			console.log("Filters selected!", filters)
			selectedFilteredPosts = posts.filter(post => post.tags.some(t => selectedFilters.indexOf(t) >= 0));
			console.log("Selected filtered posts", selectedFilteredPosts);
			fuse.setCollection(selectedFilteredPosts);
		}


		if (query !== "") {
			formattedResults = fuse.search(query).map(r => r.item);
			console.log("Query is empty formatted results", formattedResults);
		}
	};
</script>

<SearchBar bind:query={query} />
<Filters bind:selectedFilters={selectedFilters} {filters} />
