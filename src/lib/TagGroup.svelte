<script>
  import { createEventDispatcher } from 'svelte';
  export let tags;

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
	{#each tags as tag, index}
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

    @media (min-width: 768px) {
      margin-left: 4px;
      margin-right: 4px;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
  button {
    color: var(--gray-700);
    font-family: var(--font-family-light);
    font-size: var(--small-text);
    padding: 8px;
    background: var(--white);
    border-radius: 5px;
    border: 1px solid var(--primary-400);
    text-transform: capitalize;
    transition: color 0.1s ease-in-out, background-color 0.08s ease-in-out;
    &:hover {
      cursor: pointer;
      color: var(--white);
      background: var(--primary-400);
    }
  }
  button.selected {
    background-color: var(--primary-400);
    color: var(--white);
  }
</style>
