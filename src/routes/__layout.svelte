<script>
	import 'prismjs-tomorrow-theme/prism-tomorrow.css';
	import '../app.scss';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
	import metatags from '$lib/stores/metatags';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	let onLoad = false;

	onMount(() => {
		setTimeout(() => onLoad = true, 50)
	});
</script>

<svelte:head>
	<meta property="twitter:creator" content="@JonoYeong" />
	<meta property="twitter:card" content="summary" />
	{#each Object.entries($metatags) as [property, content]}
		{#if content}
			{#if ['title', 'description'].includes(property)}
				<meta name={property} {content} />
			{:else}
				<meta {property} {content} />
			{/if}
		{/if}
	{/each}
</svelte:head>

{#if onLoad}
	<div class="container">
		<div class="main-content" in:fly="{{ y: 100, duration: 200 }}">
			<Navbar />
			<slot />
		</div>
		<div class="footer-container">
			<Footer />
		</div>
	</div>

{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: space-between;
		padding: 8px;

		@media (min-width: 835px) {
			padding: 0;
		}
	}

	.main-content {
		max-width: var(--twelve-column-width);
		width: 100%;
  	margin: 0 auto;
	}
	.footer-container {
		margin: -8px;
		@media (min-width: 835px) {
			margin: 0;
		}
	}
</style>