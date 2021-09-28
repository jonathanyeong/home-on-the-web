<script>
  import { createEventDispatcher } from 'svelte';
  export let filters;

	const dispatch = createEventDispatcher();
  let activeTags = []
  let handleSelect = [];

  function toggleTagToFilter(tag, index) {
    const posOfTag = activeTags.indexOf(tag);
    if (posOfTag >= 0) {
      activeTags.splice(posOfTag, 1)
      handleSelect[index] = false
    } else {
      activeTags = [...activeTags, tag]
      handleSelect[index] = true
    }

    dispatch('tagUpdate', {
      activeTags: activeTags
    });
  }
</script>

<ul>
	{#each filters as tag, index}
		<li><button class:selected="{handleSelect[index]}"  on:click|preventDefault={() => toggleTagToFilter(tag, index)}>{tag}</button></li>
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
