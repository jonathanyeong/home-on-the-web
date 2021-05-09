<script>
  import Fuse from 'fuse.js'
  export let data = [];
  export let query = "";
  export let options = {};
  export let formatted = [];
  $: fuse = new Fuse(data, options);
  $: if (data) fuse.setCollection(data);
  $: if (query || data) {
    let result = fuse.search(query);
    formatted = result.map((r) => { r.item });
    console.log("formatted is", formatted)

  }

</script>
