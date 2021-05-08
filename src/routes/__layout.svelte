<script>
	import 'prismjs-tomorrow-theme/prism-tomorrow.css';
	import '../app.scss';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div class="container">
	<Navbar />
	<slot />
</div>
<Footer />

<style lang="scss">
	.container {
		max-width: var(--twelve-column-width);
  	margin: 0 auto;
	}
</style>