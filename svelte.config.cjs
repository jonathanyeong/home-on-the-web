const { mdsvex } = require("mdsvex");
const mdsvexConfig = require("./mdsvex.config.cjs");
const sveltePreprocess = require('svelte-preprocess');
const netlify = require('@sveltejs/adapter-netlify');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		mdsvex(mdsvexConfig),
		sveltePreprocess()],
	kit: {

		adapter: netlify(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
