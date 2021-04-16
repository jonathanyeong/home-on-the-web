import tutorials from './_tutorials';

export async function get() {
  const posts = await tutorials();

	return {
		body: Object.values(posts)
	};
}