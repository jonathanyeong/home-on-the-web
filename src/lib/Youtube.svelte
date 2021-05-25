<script>
  export let youtubeId;
</script>

<div class="aspect-ratio">
  <iframe
    src="https://www.youtube-nocookie.com/embed/{youtubeId}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

<style lang="scss">
  .aspect-ratio {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* The height of the item will now be 56.25% of the width. */
    align-self: center;
  }

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>