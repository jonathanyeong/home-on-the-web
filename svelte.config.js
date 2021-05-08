import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import sveltePreprocess from 'svelte-preprocess'
import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
	}
};

export default config;
