<script context="module">
  import plants from './_plants';
  export const prerender = true;

  /**
    * @type {import('@sveltejs/kit').Load}
  */
  export async function load({ page, fetch, session, context }) {
    const { slug } = page.params
    const allPlants = await plants();
    const plant = allPlants[slug]

    if (plant) {
      return {
        props: {
          title: plant.title,
          description: plant.description,
          pageUrl: page.path,
          rendered: plant.rendered,
        },
      };
    } else {
      // not found
      return {
          status: 404,
          error: new Error('Not found'),
      };
    }

  };
</script>

<script>
  export let rendered;
  export let title;
  export let description;
  export let pageUrl;
</script>


<div>
    <h1>{title}</h1>
    {#key rendered}
        <article>
          <svelte:component this={rendered} />
        </article>
    {/key}
</div>