<script context="module">
	import Fuse from 'fuse.js'
  export const prerender = true;
	import metatags from '$lib/stores/metatags';
	const description = "My digital garden where I have thoughts in various stages of done-ness. Technical articles are focused around Ruby, Elixir, Javascript, and their respective ecosystems."

	export async function load({ fetch }) {
		const res = await fetch('/garden.json');
		metatags.title("Jonathan Yeong | Digital Garden");
		metatags.url("https://www.jonathanyeong.com/garden")
		metatags.desc(description)
		metatags.image("https://res.cloudinary.com/jonathan-yeong/image/upload/v1622474271/personal-blog/profile_pic_minified_svw9cq.jpg");

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
	import SearchWithFilters from '$lib/SearchFilter/SearchWithFilters.svelte';

	let activeTags = tags;
	let query = "";
	let results = []
	let formattedResults = chronologicallySorted(posts);
	let activeTagPosts = []

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
<SearchWithFilters bind:formattedResults={formattedResults} {posts} filters={tags}/>
<!-- <TagGroup {tags} on:tagUpdate={handleTagUpdate}/> -->

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
</style>