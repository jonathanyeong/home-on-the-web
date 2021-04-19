<script>
  import { createEventDispatcher } from 'svelte';
  export let tags;

	const dispatch = createEventDispatcher();
  let activeTags = []

  function toggleTagToFilter(tag) {
    const posOfTag = activeTags.indexOf(tag);

    if (posOfTag >= 0) {
      activeTags.splice(posOfTag, 1)
    } else {
      activeTags = [...activeTags, tag]
    }

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