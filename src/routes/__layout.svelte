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
</style>