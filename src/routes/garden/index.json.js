import plants from './_plants';

export async function get() {
  const posts = await plants();
	const tags = [ ...new Set(Object.values(posts).map((post) => post.tags).flat())]
	return {
		body: {
			posts: Object.values(posts),
			tags: tags
		}
	};
}