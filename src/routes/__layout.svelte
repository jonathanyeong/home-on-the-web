<script>
	import 'prismjs-tomorrow-theme/prism-tomorrow.css';
	import '../app.scss';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	let onLoad = false;

	onMount(() => {
		setTimeout(() => onLoad = true, 50)
	});
</script>

{#if onLoad}
	<div class="container" in:fly="{{ y: 100, duration: 200 }}">
		<Navbar />
		<slot />
	</div>
	<Footer />
{/if}

<style lang="scss">
	.container {
		max-width: var(--twelve-column-width);
  	margin: 0 auto;
		padding: 8px;

		@media (min-width: 835px) {
			padding: 0;
		}
	}
</style>