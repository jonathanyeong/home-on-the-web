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
	let activeTags = tags;

	$: postList = posts.filter(post => post.tags.some(t => activeTags.indexOf(t) >= 0));

	function handleTagUpdate(event) {
		if (event.detail.activeTags.length === 0) {
			activeTags = tags;
		} else {
			activeTags = event.detail.activeTags;
		}
	}
</script>

<h1>Welcome to the Garden</h1>
<p>Tag list is:</p>
<TagGroup tags={tags} on:tagUpdate={handleTagUpdate}/>
<ol>
	{#each postList as post}
		<li><a sveltekit:prefetch href="/garden/{post.slug}">{post.title} - {post.tags}</a></li>
	{/each}
</ol>