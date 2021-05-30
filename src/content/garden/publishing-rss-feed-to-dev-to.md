---
createdAtDate: 2020-06-19
lastUpdatedDate: 2020-06-19
# hero: "/uploads/publishing-to-rss-feed-to-dev-to-1.png"
title: "Publishing RSS feed to Dev.to"
published: true
tags:
- tutorial
---
I enjoy publishing to [Dev.to](http://dev.to/). It has some significant features that my site doesn't have, like commenting (I'm working on it!). In the past, I copied and pasted posts from my site to Devto. This process was not ideal and really bad for SEO to my site. Thankfully there's a handy feature that lets you publish from RSS in Devto (found in settings → Publishing from RSS). In this tutorial, I'll show how I got this feature working with my Hugo RSS feed.

***

**TL;DR** - copy and paste this file ([https://github.com/jonathanyeong/personal-website/blob/master/themes/tale-theme/layouts/_default/rss.xml](https://github.com/jonathanyeong/personal-website/blob/master/themes/tale-theme/layouts/_default/rss.xml "https://github.com/jonathanyeong/personal-website/blob/master/themes/tale-theme/layouts/_default/rss.xml")) under `layouts/_default/rss.xml`

***

The first step was to add my RSS feed to Devto. Hugo ships with a default RSS feed (read more about [Hugo RSS templates](https://gohugo.io/templates/rss/)), which you can find if you go to `https://<your-site>/index.xml`. In my Devto "Publishing from RSS" settings I pasted the above URL. Unfortunately, my RSS feed was not able to be fetched by Devto. There were no errors with fetching (hooray!), but there were no posts on my dashboard either (boo!). Viewing my feed, I noticed two things. The URL's didn't have the full path (they looked like `/blog-posts/documentation-driven-design-1/` and the description only contained a summary of the post.

To fix this, I needed a local copy of the RSS file. You can find the one Hugo ships with [here](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml). I copied this file into `layouts/_default/rss.xml`.

There was a bunch of variables found in the top of the file. These variables tell the RSS feed which posts to show and also whether to limit the number of posts to display on a page.

```
{% raw %}
    {{- $pctx := . -}}
    {{- if .IsHome -}}{{ $pctx = .Site }}{{- end -}}
    {{- $pages := slice -}}
    {{- if or $.IsHome $.IsSection -}}
    {{- $pages = $pctx.RegularPages -}}
    {{- else -}}
    {{- $pages = $pctx.Pages -}}
    {{- end -}}
    {{- $limit := .Site.Config.Services.RSS.Limit -}}
    {{- if ge $limit 1 -}}
    {{- $pages = $pages | first $limit -}}
    {{- end -}}
{% endraw %}
```

I didn't need `$limit`, and I only had one type of page that I wanted to show. So I removed all of these and replaced them with `{{- $pages := where site.RegularPages "Type" "in" site.Params.mainSections }}`.

Next, I needed to fix all the links. I changed the links from `{{ .Permalink }}` to `{{ .Permalink | absURL }}` (read more about the absURL function [here](https://gohugo.io/functions/absurl/)). If the URL in your feed looks like this `//localhost:1313/blog-posts/documentation-driven-design-1` then you also need to set your `baseURL` in the Hugo config. Finally, in `<description>` I changed `{{ .Summary | html }}` to `{{ .Content | html }}`.

Going back to Devto, I fetched the feed and voila! My dashboard was being populated from my personal site posts!

![Sydicated Posts dashboard](https://res.cloudinary.com/jonathan-yeong/image/upload/v1596067038/personal-blog/syndicated-posts-dashboard_fokva3.png)

I could also see that my Devto post is setting a canonical URL.

![Canonical URL](https://res.cloudinary.com/jonathan-yeong/image/upload/v1596067037/personal-blog/canonical-url_kjqkb7.png)

A canonical URL is super useful because it helps optimize traffic to your website (or whatever site the canonical URL points to). When you start duplicating posts across platforms such as Devto, search engines don't know which result to show. Instead, they might divert traffic to each of these sites equally. But at the end of the day, you want where you originally published the post to get all the traffic. Canonical URLs solve this problem. They get prioritized over the other URLs, which means more visibility for the website you want traffic to!

***

_If you're curious about how I build this website, you can view all the code on Github:_ [https://github.com/jonathanyeong/personal-website](https://github.com/jonathanyeong/personal-website "https://github.com/jonathanyeong/personal-website")