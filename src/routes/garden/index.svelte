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
<ol>
	{#each formatted as post}
		<li><a sveltekit:prefetch href="/garden/{post.slug}">{post.title} - {post.tags}</a></li>
	{/each}
</ol>