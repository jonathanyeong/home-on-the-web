import plants from './_plants';

export async function get() {
  const posts = await plants();

	return {
		body: Object.values(posts)
	};
}