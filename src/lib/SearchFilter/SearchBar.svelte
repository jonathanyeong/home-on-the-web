<script>
  import SearchIcon from '$lib/icons/SearchIcon.svelte';

	export let query = "";
</script>

<div class="searchbar">
	<label for="postSearch" class="visually-hidden">Search for post</label>
	<input id="postSearch" placeholder="Search for posts (press \ to focus)" type="text" bind:value={query} />
	<span class="searchbar-icon-container"><SearchIcon className="search-icon" /></span>
</div>

<style lang="scss">
	.searchbar {
		position: relative;
		display: flex;
	}

	.searchbar-icon-container {
		position:absolute;
		height: 100%;
		left: 15px;
		display: flex;
		align-items: center;

		:global(.search-icon) {
			fill: var(--search-bar-placeholder);
		}
	}

	input {
		color: var(--body-text-color);
		background-color: var(--search-bar-bg);
		font-family: var(--font-family-light);
		font-size: 1rem;
		width: 100%;
		height: 48px;
		padding-top: 5px;
		border-radius: 5px;
		border: 2px solid var(--search-bar-border);
		position: relative;
		padding-left: 40px;

		&::placeholder {
			color: var(--search-bar-placeholder);
			font-size: 1rem;
			font-family: var(--font-family-light);
		}
	}
</style>