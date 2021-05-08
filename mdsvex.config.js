import slug from "rehype-slug";
import link from "rehype-autolink-headings";

const mdsvexConfig = {
	extensions: [".svx", ".md"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [],
	rehypePlugins: [
		slug,
		[link, {
			behavior: "wrap",
		}],
	],
};

export default mdsvexConfig;