---
createdAtDate: 2021-11-09T00:00:00.000-08:00
lastUpdatedDate: 2021-11-09T00:00:00.000-08:00
title: How I built my blog
seoTitle: How I built my blog
published: true
description: A walkthrough of how this site is built! From the inception to switching it on in production
tags:
  - process
featuredPost: true
---

What will you learn:
- What technology can be used to build a blog
- The process I have when building a site

TL;DR - This site is built with SvelteKit and hosted on Netlify. It's open sourced, take a gander!

Some time ago, I embarked on a journey to redesign my website. I convinced myself that I needed a fresh, clean, minimalistic, snazzy, whimsical, <insert adjective> site to be able to write content.

While my reasoning may have been flawed. Rebuilding my site allowed me to play with SvelteKit. A framework for Svelte that was fresh out of beta when I first started the rebuild. It was also an opportunity to practice my design skills. Opting this time around to design most of my screens in Figma *before* building.

Throughout this entire process I made heaps of mistakes and discovered what worked and what didn't. All the lessons that I'm excited to share!

## Designing upfront

**Tools**: Figma
**Resources:**
- [Refactoring UI](https://www.refactoringui.com/?ref=biblidev.fr)
- [Figma Youtube Channel](https://www.youtube.com/channel/UCQsVmhSa4X-G3lHlUtejzLA)
- [Type Scale](https://type-scale.com/)
- There was a design course that I took... can't remember
- Scott Tolinski tutorials Level Up Tuts

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

The goal at this stage was to have my site look as close as possible to the finished product. This step took time. A shit ton of time. Much of it was spent figuring out how to use Figma. But there was also time spent second guessing my design and tinkering with different layouts. In the end, I was happy with the design and moved into the build phase.

<script>
  import AlertBox from "$lib/AlertBox.svelte";
</script>

<AlertBox content="Here there be dragons!! Read at your own peril" />

## Let's talk about tech

While I do my fair share of shiny thing following, I also think the importance of technology can be overinflated. Use any framework or language that you enjoy using or fits your use case. I'll do my best about presenting the reasoning behind my technology choices.

This site is built with SvelteKit and Svelte.

Why? Honestly, it was a shiny thing. But also I had heard of some great developer experiences building with Svelte. And when SvelteKit was announced in beta, I wanted to see it for myself.

What did I like? The stories of developer experience with Svelte is no joke. I found building with Svelte a joy. With SvelteKit's build process as well, developing my site was extremely fast. And relatively forgiving for a newbie Svelte developer.

What didn't I like? The documentation was rough, and because it was so new there wasn't a lot of resources or plugins out there to do the things I wanted. I'll touch on these things later. But the Svelte discord was my go to place for questions.

Within SvelteKit, I'm using MDSvex to process my markdown files and plain CSS to style everything. MdSvex is the svelte equivalent of Mdx

Why? I wanted the option to add components to my markdown file. This would give greater flexibility and interactivity with my blog posts. And I used plain CSS because writing CSS in Svelte is (generally) painfree. Scoped styles is a default in Svelte so I could style a component faster than trying to learn Tailwind.

What did I like? There's a bunch of plugins you can add to Mdsvex to add more to your markdown processing. It hooks into the rehype and remark plugin library. An example, is auto-generating your table of contents.

What didn't I like? I struggled for a very long time trying to figure out how to ingest my markdown files and run it through mdsvex.

Finally, my site is hosted on Netlify. I've had no problems with Netlify, and there are SvelteKit adapters for it and also other hosting sites. And that's it. There's not much more to this site. The search and tagging functionality was hand rolled with Fuse.js to do the search. It works... but it's not great. Something to look into.

## What surprised me: a retrospective

Challenges:
- Ingesting the markdown files. With my knowledge of svelte, I struggled with this!
- Battling FOUT - I had a bug for a while where I never server side rendered my website. Which meant that web scrapers or people with javascript disabled would just see a blank site. This was because I wrapped my layout component in an if statement. Something that's only evaluated on the client side. My bad.
- The search & tag functionality. I was pretty happy with myself when I got this working. But I think it's overly complex and probably pretty terrible svelte code.
- Meta-tags was really challenging to add.

What surprised me was:
- How damn good it feels writing in svelte. I haven't spent a lot of time with React, but the time I have it's been very boilerplate-y and I've been in components that are incredibly hard to follow. And while I'm sure at scale Svelte might run into the same problems. But for my personal site, it felt like a breeze to write Svelte. At the end of the day it was plain html and javascript. Yes there's some svelte-ness to be learnt. But otherwise, I was super productive.
- How fast SvelteKit is. When I think of a compiled language, I think of long build times. But SvelteKit uses esbuild (?) & vite under the hood and boy oh boy is it fast!
- How easy it was to write bad CSS. See the aforementioned joy of writing in Svelte. Having scoped styling in built meant that I could write CSS with little to no planning. I will say the part that I did plan was having the right root variables. This made dark theme much more straightforward.
- Including dynamic metatags was surprisingly difficult to add. And I'm pretty sure I can do it better. I was used to 11ty and nunjucks where I can just include a metatag block and it would render in the head of the page. This was a little harder because of how SvelteKit organizes it's components. Or maybe it was just how my site organized the components?
- The build was done on a new netlify project. When it came to cutover to the new design. I pointed my original netlify project to the new github project. Netlify makes that process really nice.

What's next? Well I should probably write content for this blog. But I have improvements lined up. You can see the github project board to see what's on the roadmap.