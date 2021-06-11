<script>
	import 'prismjs-tomorrow-theme/prism-tomorrow.css';
	import './_global.css';
	import metatags from '$lib/stores/metatags';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
	import { fly } from 'svelte/transition';
</script>

<svelte:head>
	{#each Object.entries($metatags) as [property, content]}
		{#if content}
			{#if ['title', 'description', 'image'].includes(property)}
				<meta name={property} {content} />
			{:else}
				<meta {property} {content} />
			{/if}
		{/if}
	{/each}
	<title>{$metatags.title}</title>
	<link rel="canonical" href="{$metatags.url}" />
</svelte:head>

<div class="container" in:fly="{{ y: 100, duration: 200 }}">
	<div class="main-content" >
		<Navbar />
		<slot />
	</div>
	<div class="footer-container">
		<Footer />
	</div>
</div>


<style lang="scss">
	:global {
    @import '_prose.scss';
	}

	.container.loading {
		visibility: hidden;
	}
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