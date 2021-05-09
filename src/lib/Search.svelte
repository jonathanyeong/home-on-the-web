<script>
  import Fuse from 'fuse.js'
  export let data = [];
  export let query = "";
  export let options = {};
  $: fuse = new Fuse(data, options);
  $: if (data) fuse.setCollection(data);
  $: if (query || data) {
    result = fuse.search(query);
    formatted = result.map((r) => {
      return JSON.parse(r.item)
    });
  }

</script>
