<script>
  export let filters = [];
  export let selectedFilters = [];

  let toggleFilterClass = []
  function toggleTagToFilter(filter, index) {
    const posOfFilter = selectedFilters.indexOf(filter);
    if (posOfFilter >= 0) {
      selectedFilters.splice(posOfFilter, 1)
      toggleFilterClass[index] = false
    } else {
      selectedFilters = [...selectedFilters, filter]
      toggleFilterClass[index] = true
    }
  }
</script>

<ul>
	{#each filters as filter, index}
		<li><button class:selected="{toggleFilterClass[index]}"  on:click|preventDefault={() => toggleTagToFilter(filter, index)}>{filter}</button></li>
	{/each}
</ul>


<style lang="scss">
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    flex-wrap: wrap;
    gap: 8px;
  }

  li {
    margin: 0;
  }
  button {
    color: var(--body-text-color);
    font-family: var(--font-family-light);
    font-size: var(--small-text);
    padding: 8px;
    background: var(--tag-btn-bg);
    border-radius: 5px;
    border: 1px solid var(--primary-400);
    text-transform: capitalize;
    transition: color 0.1s ease-in-out, background-color 0.08s ease-in-out;

    &:hover {
      cursor: pointer;
      color: var(--tag-btn-bg-hover-text);
      background: var(--tag-btn-bg-hover);
    }
  }
  button.selected {
    color: var(--tag-btn-bg-hover-text);
    background: var(--tag-btn-bg-hover);
  }
</style>
