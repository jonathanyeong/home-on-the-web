<script context="module">
  export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/tutorials.json');
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

<h1>Welcome to the blog!</h1>
<p>I should display a list of posts</p>
<ul>
	{#each posts as post}
		<li><a sveltekit:prefetch href="/tutorials/{post.slug}">{post.title}</a></li>
	{/each}
</ul>