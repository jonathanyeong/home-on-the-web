---
createdAtDate: 2021-11-09T00:00:00.000-08:00
lastUpdatedDate: 2021-11-09T00:00:00.000-08:00
publishedAt: 2021-11-16T00:00:00.000-08:00
title: How I built my digital garden
seoTitle: How I built my digital garden
published: false
description: A walkthrough of how this site is built! From the inception to switching it on in production
tags:
  - process
featuredPost: true
---

TL;DR - I'm using SvelteKit, MdSvex, and SCSS. It's deployed on netlify using the netlify-adapter. You can find my site here.

The process from inception of a new site to production was pretty long. Here's the timeline:

I started the Github project on March 30, 2021.

Design phase started end of May (I think it was earlier) and it was ongiong for a couple of months.

I spent design time upfront before getting too deep into the code. Although once I settled on the basic structure I was able to build out the components without styling.

I focused on wireframing first for the design. Using shapes to layout the various pieces of information.

And then I went through and did higher fidelity designs. Something that really helped me when designing and then with the code was having a system to track fonts, font sizes, and colours.

I fleshed out most of the light theme pages and did on test page for a dark theme. But it was all good other than that!

The next step was the build phase. By the time I finished with the design I was already working on some of the svelte kit components. The challenges I faced were:

- Ingesting the markdown files. With my knowledge of svelte, I struggled with this!
- Battling FOUT - I had a bug for a while where I never server side rendered my website. Which meant that web scrapers or people with javascript disabled would just see a blank site. This was because I wrapped my layout component in an if statement. Something that's only evaluated on the client side. My bad.
- The search & tag functionality. I was pretty happy with myself when I got this working. But I think it's overly complex and probably pretty terrible svelte code.
- Meta-tags was really challenging to add.

What surprised me was:
- How damn good it feels writing in svelte. I haven't spent a lot of time with React, but the time I have it's been very boilerplate-y and I've been in components that are incredibly hard to follow. And while I'm sure at scale Svelte might run into the same problems. But for my personal site, it felt like a breeze to write Svelte. At the end of the day it was plain html and javascript. Yes there's some svelte-ness to be learnt. But otherwise, I was super productive.
- How fast SvelteKit is. When I think of a compiled language, I think of long build times. But SvelteKit uses esbuild (?) & vite under the hood and boy oh boy is it fast!
- How easy it was to write bad CSS. See the aforementioned joy of writing in Svelte. Having scoped styling in built meant that I could write CSS with little to no planning. I will say the part that I did plan was having the right root variables. This made dark theme much more straightforward.
- Including dynamic metatags was surprisingly difficult to add. And I'm pretty sure I can do it better. I was used to 11ty and nunjucks where I can just include a metatag block and it would render in the head of the page. This was a little harder because of how SvelteKit organizes it's components. Or maybe it was just how my site organized the components?

The build was done on a new netlify project. When it came to cutover to the new design. I pointed my original netlify project to the new github project. Netlify makes that process really nice.

What's next? Well I should probably write content for this blog. But I have improvements lined up. You can see the github project board to see what's on the roadmap.

