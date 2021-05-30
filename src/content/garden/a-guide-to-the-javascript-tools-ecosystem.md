---
createdAtDate: 2021-01-21T00:00:00.000-08:00
lastUpdatedDate: 2021-01-21T00:00:00.000-08:00
title: A guide to the Javascript tools ecosystem
seoTitle: A guide to the JS tools ecosystem, Snowpack, Vite, etc.
published: true
cover_image: https://res.cloudinary.com/jonathan-yeong/image/upload/v1611244940/personal-blog/cover_images/a-guide-to-js-tooling-ecosystem_dlbaid.png
description: This post is a guide to the Javascript tool ecosystem. I look at the
  tools out there, try to define some of the features that they have, and talk about
  what I would choose for my next project.
tags:
  - tooling
  - javascript
featuredPost: true
---
I'm relatively new to the Javascript (JS) tooling ecosystem and it's... overwhelming. There seem to be many tools that solve the same problem. Sure there are tools more popular than others, and maybe some industry-standard tools. For example, Webpack is the default module bundler for Rails. But I still want to figure out if these defacto tools are the best choice. This post will explore the types of tools out there, the features they have, and then my pick on what tool to use. I'll update this post as I gather more information or if anything changes!

## What do I mean by JS tools?

A JS tool is any package or application that helps improve your development and/or production process. Some examples are linters, module bundlers, transpilers, or package managers. Even an IDE (integrated development environment) is a tool! Without it writing JS would be much harder. The scope of JS tools is huge, so I'm going to focus on module bundlers and no module bundlers for now.

## Module bundlers

### What are they?

A module bundler transforms your development assets into static assets that are production-ready. For example, a module bundler will take all of your JS files and combine them into a single file. This "bundling" can happen during development and before you push to production. Here are some popular module bundlers:

* [Webpack](https://www.notion.so/1-b2d6a623bad44e2194a82f3de37600b3) - seems to be the most widely used
* [Parcel](https://parceljs.org/)
* [Rollup](https://rollupjs.org/guide/en/)
* [Esbuild](https://esbuild.github.io/) - not ready for production yet

These bundlers share a lot of the same features. Let's go through these features and why you might want to use a module bundler.

#### No-config bundling

Recently, module bundlers have been improving their support of no configuration bundling. I can see why this trend is growing. At my company the Webpack config is huge. Honestly, it looks like hieroglyphics to me. You can imagine if your application isn't building you wouldn't want to debug a config. With no-config bundling, you specify your entry files and your module bundler will intelligently detect what the defaults are and output the right bundle.

For example, to build something in Parcel you will just need to specify an entry file (or multiple):

```bash
parcel index.html about.html
```

Parcel, will assume some sensible defaults and bundle the right javascript files for you. All the bundles are inferred automatically. No-config bundling also exists in Webpack (version 4.0 up), Rollup, and Esbuild.

#### Tree shaking

At a high level, tree shaking is a process where the module bundler will analyze your JS code and remove any unused code. There are some nuances though, so let's get into them. For older browsers, to load JS from a different file you would have to use require. Here's an example:

```javascript
//main.js
const foobar = require('./foobar.js');
foobar.foo()
```

Because you're requiring the entire `foobar` file, the module bundler doesn't know what code is being used or not. So tree shaking becomes much harder.

With the advent of ECMAScript modules (ESM), we can now import only the functions we'll use. Side note: [here's a fantastic article about how ESM works](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/).

```javascript
//foobar.js
export default foo = () => {
  "foo"
}

export default bar = () => {
  "bar"
}

//main.js
import { foo } from './foobar.js'

foo()
```

This import statement is only possible now that [major browsers support ESM (except IE)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#import). And now that we can directly import what functions we need, it makes the life of a tree-shaker much easier.

Generally, tree-shaking will check a couple of things:

1. What functions are imported from a file?
2. Is it safe to remove the unused code from that file?

The first point is answered by checking the import statements. The second point is a bit harder to determine. The problem is code that causes side effects. A side effect occurs when the code that is imported will run something on import. If a module bundler is not sure if the code has side effects it won't remove it. You will have to mark it explicitly as side effect free.

#### Code splitting

With tree shaking there's a potential to remove a lot of unused code. But what if we need the code but only on certain events? That's where code splitting comes in. Code splitting breaks apart a single JS bundle into multiple bundles. These bundles are then **lazy-loaded**, which means that they are only loaded when they're needed. By lazy loading these extra bundles, the initial bundle load will be small. For Webpack, Rollup, and Parcel you can achieve zero-config code splitting via dynamic imports. Dynamic imports use promises to import code. Let's see what code splitting looks like using the example below.

```javascript
//foobar.js
export default foo = (a) => {
  "foo" + a
}

//main.js
form.addEventListener("submit", e => {
  e.preventDefault();
  // Dynamic import
  import('.foobar.js').then(foobar => {
    console.log(foobar.foo("HII"));
  });
});
```

#### Hot module replacement (HMR)

Both Parcel and Webpack support hot module replacement as an opt-in feature. This feature is a way to improve the developer experience. Let's take a look at a world without it. Imagine we have a large application where the bundle size is large - even with code splitting and tree shaking. After making a change in development and saving the file, the entire bundle gets rebuilt and you have to refresh the page to pull in the new changes. With HMR only the modules that are changed will be reloaded. HMR is a way to develop faster and allows you to maintain the state of the page.

### Why use module bundlers?

Module bundlers provide some amazing features that let you optimize JS code that gets loaded into the browser. Without them, it would be harder to develop large applications. In many cases, you'll be running your module bundler in development. But module bundlers are primarily for production. Production is where the bundle size matters for the client. If you're running a smaller project with little to no JS, you might not need a module bundler.

## No module bundlers or unbundled development

Module bundlers are great for production since they will build an optimized JS file. But what about development? Do we care about optimizing a JS file over optimizing our developer experience? If the answer is no, that's where no module bundlers come in. The two that I've found are:

* [Snowpack](https://www.snowpack.dev/)
* [Vite](https://vitejs.dev/)
* [Preactjs/wmr](https://github.com/preactjs/wmr)

A no module bundler is a tool that leverages ESM imports to pull in the files needed during development. But it does so without bundling them together. Here's how they work; when you first start up the dev server the tool will build all your files and then cache them. Now when you edit a file it will invalidate that cache and rebuilds only that file. This process is leagues faster than bundling your entire application and then serving the code.

When we get to production, unbundled development is still inefficient. We still want to use features like tree shaking or minification to generate an optimized bundle for the browser. These tools differ a little in functionality when building for production. Snowpack is bundler agnostic, through plugins you can utilize Webpack, Rollup, or Parcel to do your bundling. And since v3, experimentally, you can use the inbuilt ESbuild as a bundler. Vite is tightly coupled with Rollup to do the bundling.

## Closing thoughts

I'm just scratching the surface with the JS tooling ecosystem. There's much more than module bundlers or no module bundlers! And things are bound to change. This post is one that I'll be updating frequently as new features get introduced.

After looking at a few different module and no module bundlers. I wanted to share my thoughts on what I would use. If I were starting a JS project right now I would take Snowpack in a heartbeat. I love the development experience it brings, and it's unopinionated with the bundler. With Snowpack 3 you can experimentally use ESBuild as your bundler. Or pull in any other module bundler with a plugin.

I hope you enjoyed this deep dive into JS tool ecosystem. What would want to see covered next, or explained in more detail?