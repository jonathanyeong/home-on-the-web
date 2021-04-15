<script context="module">
  export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/garden.json');
		return {
			props: {
				posts: await res.json()
			}
		};
	}
</script>


<script>
  export let posts;
</script>

<h1>Welcome to the Garden</h1>
<ul>
	{#each posts as post}
		<li><a sveltekit:prefetch href="/garden/{post.slug}">{post.title}</a></li>
	{/each}
</ul>