---
createdAtDate: 2021-11-09T00:00:00.000-08:00
lastUpdatedDate: 2021-11-17T00:00:00.000-08:00
title: How I built my blog
seoTitle: How I built my blog
published: true
description: A walkthrough of how this site is built! From the inception to switching it on in production
tags:
  - process
featuredPost: true
---
<script>
  import AlertBox from "$lib/AlertBox.svelte";
</script>

What will you learn:
- What technology can be used to build a blog
- The process I have when building a site

TL;DR - This site is built with SvelteKit and hosted on Netlify. It's open sourced, [take a gander](https://github.com/jonathanyeong/home-on-the-web)!

Some time ago, I embarked on a journey to redesign my website. I convinced myself that I needed a fresh, clean, minimalistic, snazzy, whimsical, `<insert adjective>` site to be able to write content.

While my reasoning may have been flawed. Rebuilding my site allowed me to play with SvelteKit. A framework for Svelte that was fresh out of beta when I first started the rebuild. It was also an opportunity to practice my design skills. Opting this time around to design most of my screens in Figma *before* building.

Throughout this entire process I made heaps of mistakes and discovered what worked and what didn't. All the lessons that I'm excited to share!

## Designing upfront

**Tools**: Figma
**Resources:**
- [Refactoring UI](https://www.refactoringui.com/?ref=biblidev.fr)
- [Figma Youtube Channel](https://www.youtube.com/channel/UCQsVmhSa4X-G3lHlUtejzLA)
- [Type Scale](https://type-scale.com/)
- [Level Up Tuts: Design Systems in Figma](https://leveluptutorials.com/tutorials/design-systems-in-figma/getting-started-and-auto-layout) (Paid)
- [Design + Code: UI Design for Developers](https://designcode.io/ui-design) (Paid)

I'm no design guru so I can't speak too much to colour theory, typography and other stuff. But here's what worked for me.

### Start with the layout

I focused initially on building the layout of my site (both mobile and desktop) using grayscale and blocks. I went around to all the sites that I found aesthetically pleasing and took inspiration of their layouts. Then I used these blocks to play around with how my content would be structured.

This was focused only on the homepage since I thought that would be the most visually complex page. But I would have found value doing it for the posts page as well.

What I was looking for was:
- Visual hierarchy - do the blocks flow and fit together.
- Spacing - Is there room for the blocks to breathe or does it feel cramped?
- Focus - Is there too much information presented at once?

### Setting up a design system

The next thing I set up was a design system. This system standardized the colours and the fonts that I would be using across my design. Building this upfront saved a bunch of time later on. Changes to font sizing or colour could be done in one place and it would adjust throughout all my design files.

### Going from grey blocks to pretty colours

After picking a layout, it was only a matter of replacing those gray blocks with actual content. I used components in Figma to standardize what a Post card would look like. You can also give properties to components. This means you can define components in different active states or theme options, like my post cards which have both a dark and a light theme property.

The goal at this stage was to have my site look as close as possible to the finished product. This step took time. A shit ton of time. Much of it was spent figuring out how to use Figma. But there was also time spent second guessing my design and tinkering with different layouts. Ultimately, these making these decisions up front meant that I could spend more time working on the build.

## The Tech Stack

I have a tendency to get distracted by shiny things. And this blog is no exception. When I found out that SvelteKit was coming into public beta, I jumped on the bandwagon. This involved a **full** rewrite of my site. I was coming from 11ty and nothing survived the transition.

If you're familiar with React and Next.js - SvelteKit offers similar sensibilities. It offers both server side and client side rendering. A built in router. Developer environment optimizations. And Svelte, which has been a joy to use.

Styling is done using SCSS, a css preprocessor. Out of the box, styles in Svelte are scoped per component. Posts are processed using [Mdsvex](https://mdsvex.com/). This package is similar to [MDX](https://mdxjs.com/) for React. It lets me define components and import them into my markdown. For example, this [alert box](https://github.com/jonathanyeong/home-on-the-web/blob/main/src/lib/AlertBox.svelte) is a Svelte component!

<AlertBox content="Hiii I'm a Svelte component!" />

For the search, I use Fuse.js to do the fuzzy search matching. The search and tag filtering probably warrants it's own post. *If you're interested [bug me](https://twitter.com/JonoYeong), I'm incredibly lazy*. But I'll give a quick rundown of it. Fuse.js takes in all my posts, and keys off my post titles and tags. In other words, you can search for both titles and tags. Svelte will then react to typing, by using a *reactive declaration* `$:`,  and it will call Fuse to return results based on the current search. This search should also be scoped to the currently selected tags (or all tags if none are selected).

The site is deployed on Netlify which has been the hosting platform I've used since my 11ty days. It's been great (and free) for my use case. SvelteKit has a [Netlify Adapter](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify) that creates a Netlify function for dynamic server side rendering. Along with hooking into Netlify fun-ness like Netlify redirect rules and forms.

## A Retrospective
### Decisions made
Other than the search and tagging functionality, this build was pretty straightforward. But even so, there are decisions that I made that are hard to reverse. I wanted to share these in case you're facing a similar decision!

- I was thinking about using TailwindCSS and decided against it. Instead, I rolled my own plain SCSS. The main reason behind this was speed. Both in terms of reducing package load during development or production. And also the time it would take to learn Tailwind. Scoped styles in Svelte makes maintaining CSS less cognitively demanding. You don't need to think about the cascades in terms of the application. Only the component.
- Choosing SvelteKit was done out of passion (or FOMO). But one reason I wanted to move off 11ty in the first place was to have greater interactivity. I was inspired by Josh Comeau's site which is full of whimsy. That is something that I wanted to strive for with SvelteKit. It's a work in progress for my site.
- I spent a little time researching other hosting platforms ([Vercel](https://vercel.com/), [Render](https://render.com/), [Begin](https://begin.com/)), but went with Netlify in the end. It was what I was used to. And I was happy with it's free tier. Another reason why I decided to stick with Netlify was DNS records. DNS is a pain to manage, and I don't really want to deal with it.

### Challenges Faced
- Ingesting the markdown files. With my knowledge of svelte, I struggled with this!
- Battling Flash of Unstyled text (FOUT) - I had a bug for a while where I never server side rendered my website. Which meant that web scrapers or people with javascript disabled would just see a blank site. This was because I wrapped my layout component in an if statement. Something that's only evaluated on the client side. My bad.
- The search & tag functionality. I was pretty happy with myself when I got this working. But I think it's overly complex and probably pretty terrible svelte code.
- Meta-tags was really challenging to add.

### Surprises
- How damn good it feels writing in svelte. I haven't spent a lot of time with React, but the time I have it's been very boilerplate-y and I've been in components that are incredibly hard to follow. And while I'm sure at scale Svelte might run into the same problems. But for my personal site, it felt like a breeze to write Svelte. At the end of the day it was plain html and javascript. Yes there's some svelte-ness to be learnt. But otherwise, I was super productive.
- How fast SvelteKit is. When I think of a compiled language, I think of long build times. But SvelteKit uses esbuild (?) & vite under the hood and boy oh boy is it fast!
- How easy it was to write bad CSS. See the aforementioned joy of writing in Svelte. Having scoped styling in built meant that I could write CSS with little to no planning. I will say the part that I did plan was having the right root variables. This made dark theme much more straightforward.
- Including dynamic metatags was surprisingly difficult to add. And I'm pretty sure I can do it better. I was used to 11ty and nunjucks where I can just include a metatag block and it would render in the head of the page. This was a little harder because of how SvelteKit organizes it's components. Or maybe it was just how my site organized the components?
- The build was done on a new netlify project. When it came to cutover to the new design. I pointed my original netlify project to the new github project. Netlify makes that process really nice.

## What's next?
I heard of this new Static site generator, [Astro](https://astro.build/blog/introducing-astro/) that looks very interesting...

Nope. Not going down that path.

What's next is to populate this site with more content. I'm also working on a better flow to get my posts from draft to publish. Doing some refactoring, currently working on refactoring the search bar. And eventually adding more whimsy. If you're curious you can view my [project roadmap](https://github.com/users/jonathanyeong/projects/1/views/4) and you can see the source code for [my site here](https://github.com/jonathanyeong/home-on-the-web).