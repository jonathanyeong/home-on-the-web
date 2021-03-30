import posts from './_posts';

export async function get() {
	return {
		body: await posts
	};
}