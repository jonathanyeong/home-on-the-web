# Home on the Web

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6e74da5-c5f3-480b-8ae7-c7706679401c/deploy-status)](https://app.netlify.com/sites/elastic-engelbart-26e6d9/deploys)

Built with SvelteKit and deployed on Netlify. This project is my blog/digital garden found [here](https://jonathanyeong.com). This repo is a learning project so it might not be the best svelte code. If you see something particularly egregious feel free to [create an issue](https://github.com/jonathanyeong/home-on-the-web/issues/new), or reach out to me on [Twitter](https://twitter.com/JonoYeong)!

## Features

- Ability to filter based on tags of a post. Filtering respects the current search objects.
- Search provided via Fuse.js
- Dark/Light theme
- Netlify Deploy Previews to share draft links

## Getting started

To get this project up and running on your local machine:

```
git clone git@github.com:jonathanyeong/home-on-the-web.git
cd home-on-the-web
npm install
npm run dev
```

If you wanted to build the site on your local machine and emulate what it would look like in production:

```
npm run build
npm run preview
```

*Note:* running build will also output any warnings from compiling Svelte.

## Project Breakdown

Posts are found in `src/content/garden`, these posts are plain markdown but can contain Svelte components. These components are transformed using the mdsvex processor. Posts are slurped by `src/routes/garden/_plants.js` and transformed to JS objects that I can then use throughout the site. The homepage of the site is found in `src/routes/index.svelte` and the about page is found in `src/about/index.svelte`.

The `_redirects` file is read by Netlify and creates a redirect rule from `/posts/:id` to `/garden/:id`. This redirect is necessary since the previous site had a different URL structure.