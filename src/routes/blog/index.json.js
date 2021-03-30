import allPosts from './_posts';

export async function get() {
  const posts = await allPosts();

	return {
		body: Object.keys(posts).map(slug => ({
			slug,
			...posts[slug]
		}))
	};
}