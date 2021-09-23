import slug from "rehype-slug";

const mdsvexConfig = {
	extensions: [".svx", ".md"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [],
	rehypePlugins: [
		slug,
	],
};

export default mdsvexConfig;