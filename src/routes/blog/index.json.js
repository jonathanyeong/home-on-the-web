import posts from './_posts';

posts.then((post) => {
  console.log("In index.json", post);
});
export function get() {
	return {
		body: [{
      slug: "posts/firstpost.md",
      title: "stubbed from json"
    }]
	};
}