const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/tutorials/index.svelte"),
	() => import("../../../src/routes/tutorials/[slug].svelte"),
	() => import("../../../src/routes/garden/index.svelte"),
	() => import("../../../src/routes/garden/[slug].svelte"),
	() => import("../../../src/routes/about/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/tutorials/index.json.js
	[/^\/tutorials\.json$/],

	// src/routes/tutorials/index.svelte
	[/^\/tutorials\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/tutorials/[slug].svelte
	[/^\/tutorials\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/rss.xml.js
	[/^\/rss\.xml$/],

	// src/routes/garden/index.json.js
	[/^\/garden\.json$/],

	// src/routes/garden/index.svelte
	[/^\/garden\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/garden/[slug].svelte
	[/^\/garden\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/about/index.svelte
	[/^\/about\/?$/, [c[0], c[7]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];