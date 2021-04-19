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

<style>
  button.selected {
    background-color: pink;
    color: white;
  }
</style>

<ul>
	{#each tags as tag, index}
		<li><button class:selected="{handleSelect[index]}"  on:click|preventDefault={() => toggleTagToFilter(tag, index)}>{tag}</button></li>
	{/each}
</ul>