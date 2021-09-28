<script>
	import Filters from '$lib/SearchFilter/Filters.svelte';
	import SearchBar from '$lib/SearchFilter/SearchBar.svelte';

	export let fuse;
	export let filters;

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
</script>

<SearchBar />
<Filters {filters} on:tagUpdate={handleTagUpdate}/>
