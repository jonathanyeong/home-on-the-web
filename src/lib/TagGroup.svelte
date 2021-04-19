<script>
  import { createEventDispatcher } from 'svelte';
  export let tags;

	const dispatch = createEventDispatcher();
  let activeTags = []

  function toggleTagToFilter(tag) {
    activeTags = [...activeTags, tag]
    // alert(`Active tags are ${activeTags}`)
    dispatch('tagUpdate', {
      activeTags: activeTags
    });
  }
</script>

<ul>
	{#each tags as tag}
		<li><button on:click|preventDefault={() => toggleTagToFilter(tag)}>{tag}</button></li>
	{/each}
</ul>