import posts from './_posts';

export async function get() {
  const postsData = await posts();
	const tags = [ ...new Set(Object.values(postsData).map((post) => post.tags).flat())]
	return {
		body: {
			posts: Object.values(postsData),
			tags: tags
		}
	};
}