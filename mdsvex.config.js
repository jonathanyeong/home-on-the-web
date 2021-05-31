import slug from "rehype-slug";
// import link from "rehype-autolink-headings";

const mdsvexConfig = {
	extensions: [".svx", ".md"],
	smartypants: {
		dashes: "oldschool",
	},
	remarkPlugins: [],
	rehypePlugins: [
		slug,
		// [link, {
		// 	behavior: "prepend",
		// 	properties: {className: ['anchor']},
		// 	content: {
		// 		type: 'element',
		// 		tagName: 'svg',
		// 		properties: {
		// 			xmlns: "http://www.w3.org/2000/svg",
		// 			viewBox: "-3 -3 24 24",
		// 			width: "24",
		// 			height: "24",
		// 			preserveAspectRatio: "xMinYMin",
		// 			className: ['jam', 'jam-link'],
		// 			ariaHidden: "true"
		// 		},
		// 		children: [
		// 			{
		// 				type: 'element',
		// 				tagName: 'path',
		// 				properties: {
		// 					d: 'M3.19 9.345a.97.97 0 0 1 1.37 0 .966.966 0 0 1 0 1.367l-2.055 2.052a1.932 1.932 0 0 0 0 2.735 1.94 1.94 0 0 0 2.74 0l4.794-4.787a.966.966 0 0 0 0-1.367.966.966 0 0 1 0-1.368.97.97 0 0 1 1.37 0 2.898 2.898 0 0 1 0 4.103l-4.795 4.787a3.879 3.879 0 0 1-5.48 0 3.864 3.864 0 0 1 0-5.47L3.19 9.344zm11.62-.69a.97.97 0 0 1-1.37 0 .966.966 0 0 1 0-1.367l2.055-2.052a1.932 1.932 0 0 0 0-2.735 1.94 1.94 0 0 0-2.74 0L7.962 7.288a.966.966 0 0 0 0 1.367.966.966 0 0 1 0 1.368.97.97 0 0 1-1.37 0 2.898 2.898 0 0 1 0-4.103l4.795-4.787a3.879 3.879 0 0 1 5.48 0 3.864 3.864 0 0 1 0 5.47L14.81 8.656z',
		// 					ariaHidden: "true"
		// 				},
		// 				children: []
		// 			}
		// 		]
		// 	},
		// }],
	],
};

export default mdsvexConfig;