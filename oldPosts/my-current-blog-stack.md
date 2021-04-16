---
date: 2019-09-10
title: "2019 blog refresh"
published: true
tags:
- recap
---
I like to refresh my blog now and then. Partly because I want to update the UI but mostly because I forget how I built it in the first place. I've finished my refresh this week and it's about time I wrote something. Judging by the age of my previous blog posts, it's been quite a long time since I've done anything with my blog.

For future me and those that are interested, here's my blog stack and some decisions I made along the way.

This blog is a static site that runs on [Hugo](https://gohugo.io/). I love static sites for a few reasons:

* They're very fast - both load and build time.
* Simple to write content for. Writing in markdown is gold.
* Theme-able.
* You treat it like any other Github project.
* Easy to get started.

Here's where my blog lives on [Github](https://github.com/jonathanyeong/2019-blog).

Next, is [Forestry](https://forestry.io/), the "static CMS that commits". First of all, Forestry is free but you can pay for more users. Forestry works by connecting to your site on Github. From then on any posts you make or edit will show up as commits on your Github repo.

Forestry also has a nice text editor with both WYSIWYG and markdown support. You can also add "snippets" which is how you get [Hugo shortcodes](https://gohugo.io/content-management/shortcodes/) in your post. The real power behind Forestry is its customizability. It can hook into front matter templates meaning you can setup any type of post. If you wanted to post a page instead of a blog post Forestry can do that for you. If you wanted to load up configs and edit them in your CMS, Forestry can do that for you too. One minor annoyance, I wish it auto-saved whilst writing a blog post. But overall I'm a big fan.

I used one of Forestry's starter templates to get started quickly. I didn't want to play with the UI this time around. Trying to build out a custom theme was the part that always took the most time. And with my design skills, it was rarely worth it. In the end, I used the [Brevifolia Hugo theme](https://github.com/emilkovacs/brevifolia-hugo-forestry).

Finally, to serve my site I use [Netlify](https://www.netlify.com/). It's also free! This is another app that connects to the blog's Github repo. It tracks any commits that go onto master. When a commit is pushed it will run a deploy script that will build and publish the site. It's a great tool to help you build and deploy static sites. It has a ton of features such as A/B testing, easy HTTPS support, analytics (paid). Netlify supposedly also has a pretty robust CDN according to this [blog post](https://www.netlify.com/blog/2017/03/28/why-you-dont-need-cloudflare-with-netlify/). So I know that my site can handle load, if it ever gets to that point.

That's it! Having a static site has made my life easy in terms of infrastructure. The benefits to this stack are:

* The only cost is paying for the domain name. Everything else is free!
* The site loads very fast.
* Going with someone else's theme has taken a load off my mind. Whilst I've made a few customizations, the site looks good out of the box.
* This whole stack is about setting and forgetting (until I need to refresh again).