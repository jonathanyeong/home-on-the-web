---
title: '2020 blog refresh: the process and lessons learnt'
description: The process and the lessons learnt after doing a redesign of my blog.
  During this redesign I also migrated from Hugo to 11ty.
published: true
tags:
- recap
---
Welcome to my brand new website! I'm stoked that I can finally share it with people. I rushed a little towards the end to get it released. But I'm happy with how it all turned out. Along with a new design, I'm also using a new static site generator. I migrated from [Hugo](https://gohugo.io/) to [Eleventy](https://www.11ty.dev/) (11ty). The project was about two months in the making from design to production. I learnt a few lessons along the way. Let's dive into the details, and the lessons learnt.

## The Design

I was reaching the limits of my theme, [Brevifolia](https://github.com/kendallstrautman/brevifolia-hugo-forestry). Don't get me wrong it served me well over the past year. It was easy to make small customisations with it. But I wanted a more flexible design. I wanted something that could be more than a blogging theme. I ended up using [Figma](https://www.figma.com/) to build the design. I'm no designer, and Figma is still a new tool for me. So the design process took much longer than I thought it would. I wrote up some tips and resources in a post, [starting out with web design](https://www.jonathanyeong.com/posts/tips-for-developers-starting-out-with-web-design/). Below, you can see the evolution of the design.

![Blog design evolution](https://res.cloudinary.com/jonathan-yeong/image/upload/v1599763098/personal-blog/blog_design_evolution.jpg)

## Setup and Migration

During this rebuild, I migrated off Hugo. Bryce Wray's post on [why he left Hugo for 11ty](https://brycewray.com/posts/2019/09/why-left-hugo-eleventy/) inspired me to give it a try. He goes into more detail about why he migrated. But for me, it came down to two points:

* I felt faster developing with 11ty.
* I wanted a light-weight, customisable static site generator and 11ty fit the bill.

The first step was to get my local project setup with 11ty. To do this, I followed the [getting started](https://www.11ty.dev/docs/getting-started/) guide. Another great resource is the list of community-driven [starter projects](https://www.11ty.dev/docs/starter/). I forked the [11ty base blog](https://github.com/11ty/eleventy-base-blog) project and used the folder structure from [Eleventastic](https://github.com/maxboeck/eleventastic).

Next, I copied posts from my Hugo project to 11ty. The only thing I changed was the frontmatter. I moved from toml to yaml (see below). 11ty also lets you [customise your frontmatter](https://www.11ty.dev/docs/data-frontmatter-customize/) format. This customisation would be useful if you're migrating heaps of posts.

```yaml
# toml
+++
date = 2020-07-09
title = "Building a blog with Phoenix: Getting started"
+++

# yaml
---
date: 2020-07-09
title: "Building a blog with Phoenix: Getting started"
published: true
---
```

Now that I could see all my posts in 11ty, I wanted two more features:

* **Excerpts** - Implementing excerpts gave me a little bit of trouble. Hugo had excerpt support out of the box. With 11th, I had to do something a little more custom. Here's a post I wrote about how [I implemented excerpts](https://www.jonathanyeong.com/posts/excerpts-with-eleventy/).
* **Draft Posts** - This [blog post](https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts) by Remy Sharp showed me how to implement draft posts. I added the snippet below to my `.eleventy.js` file. This snippet filters posts if the post date is in the future, and if `published` is set to false.

```js
const now = new Date();
const livePosts = p => p.date <= now && p.data.published;

eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md')
    .filter(livePosts);
});
```

That's it for the migration and setup! I spent the rest of the time building the theme. Onto the lessons learnt.

## Lessons learnt

### Using blocks with Nunjucks + 11ty

Blocks let you define a shell and then override or fill in portions based on your template. I could do things like inject `ogtags` into the `<head>` if I was on a blog post. Unfortunately, I was bumping into an issue where my blocks weren't showing up. And I found out that you can't mix 11ty layout chaining with Nunjucks block inheritance - [this is by design](https://github.com/11ty/eleventy/issues/834#issuecomment-569474008). Fortunately, we can get around this problem. For example, if we wanted to add `ogtags` as a block, you would declare it in the base template.


```html
<html>
    <head>
    {% block ogtags %}
    {% endblock %}
    </head>
</html>
```

Now in your post template, remove `layout: layouts/base.njk` from the frontmatter. Instead, use Nunjucks `extends` (**note**: you can still have other frontmatter data). And that's it! The `meta` tags will now appear in your `<head>` if you're on a post page.

```html
---
templateClass: tmpl-post
---
{% extends 'layouts/base.njk' %}

{% block ogtags %}
<meta property="og:title" content="{{ title }}"/>
<meta property="og:url" content={{ page.url | url | absoluteUrl(metadata.url) }} />
<meta property="og:description" content="{{ description }}" />
<meta property="og:type" content="article" />
{% endblock %}
```



### Take the time to design

I have this horrible habit of trying to design with code (HTML + CSS). I'm more comfortable and productive in code than with Figma. On the flip side, it's hard to compare designs when you're designing with code. It's painful trying to find the right CSS file to undo changes. And using `git stash` to undo everything isn't always what you want. I learnt that it was better to spend extra time designing in Figma before touching code. Making decisions upfront made it easier to go on autopilot later.

### Permalinks - omg... I broke all the permalinks

I screwed the pooch on this one. When I flipped the switch in production, I did not think about permalinks at all. It took a few days before I realised I broke all my canonical links in [Dev.to](http://dev.to). I definitely should've had a checklist before switching the site on in production. Thankfully, with Netlify, the fix was pretty simple. They have a [blog post on redirects](https://docs.netlify.com/routing/redirects/) that solved my problem. The gist of it is:

* Add a `_redirects` file with your redirect rule to the 11ty project.
* Add a passthrough copy in `.eleventy.js`. The passthrough copy will copy your `_redirects` file to the publish directory (`/dist` for me).

```bash
# src/_redirects
/blog-posts/:id /posts/:id 302

# .eleventy.js
eleventyConfig.addPassthroughCopy("src/_redirects");
```

***

That's it for the recap! Towards the end, I was rushing to get the project complete. So there is a list of UI updates and features that I want to build. If you're interested, I'm tracking everything in [Github Projects](https://github.com/jonathanyeong/personal-website-2020/projects/1). I learnt a lot from this process, and I'm super happy I finished a side project. Let me know if you're currently redesigning or rebuilding your website! Find me on [Twitter](https://twitter.com/JonoYeong) or leave a comment down below.