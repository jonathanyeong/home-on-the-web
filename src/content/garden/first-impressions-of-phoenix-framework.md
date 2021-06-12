---
createdAtDate: 2020-06-20
lastUpdatedDate: 2020-06-20
title: "First impressions of Phoenix Framework"
description: "My first impressions of using Phoenix framework."
published: true
tags:
- phoenix
---
I've wanted to try out Phoenix ever since I heard the Changelog built their site on it. Yes, I'm very late to the party, version 1.0 of Phoenix, released in 2015. Thankfully I've found some time away from constant rewrites of this blog to dive into the framework. From what I've heard, if you're a Ruby on Rails developer, you should feel right at home with Phoenix. The first thing I did was to watch their [video on building a Twitter clone](https://www.youtube.com/watch?v=MZvmYaFkNJI&feature=youtu.be). With my excitement level high, I dove into the framework and have spent all week playing around with it. Here are my first impressions.

## What makes me feel at home

At first glance, Phoenix feels very Rails-y. They weren't kidding when they said you'd feel at home if you're a Rails developer. Right from the get-go, the Phoenix CLI commands feel like Rails commands e.g. `mix phx.routes` → `rails routes`. EEx (embedded Elixir), which is the default templating language, feels like ERb. It has the same model view controller paradigm. And also the same "convention over configuration" paradigm. One of the coolest things about Rails was that every project felt the same, so you knew exactly where to begin. Phoenix has that same feel. I could dive straight into the [Changelog's Phoenix app](https://github.com/thechangelog/changelog.com) and know exactly where their routes are. What their database schema looks like etc. With all the similarities to Rails, why even use Phoenix? Well, here are a few things that get me excited about Phoenix.

## What I'm excited about

Channels are mind-blowing. In Rails, Action Cable achieves something similar. Both use WebSockets, with Channels you can choose to use long polling. What's fantastic about channels is the performance. The fact that Phoenix can support up to 2 million web sockets (on a 40core/128gb box) is impressive. I don't think I'm ever going to have an app that scales to that. Nonetheless, this is some impressive engineering.

Next up is, out of the box telemetry, and a live dashboard (since version 1.5)! I love application monitoring, and I love that it comes for free! Phoenix is the first framework I've used that has all this stuff just baked in. Metrics with Phoenix are like metrics with StatsD combined with Prometheus. They're easy to use around the codebase but discoverable in that you have to declare them upfront. Also, the live dashboard looks pretty damn good (screenshot below), as well as showing all the essential metrics. With all of this out of the box, it takes out another decision when building a site. The downside is that you need to set up some extra authentication to hide your dashboard in production, but there are docs for that: [Phoenix Live Dashboard](https://hexdocs.pm/phoenix_live_dashboard/Phoenix.LiveDashboard.html#module-extra-add-dashboard-access-on-all-environments-including-production).

![Phoenix Live dashboard](https://res.cloudinary.com/jonathan-yeong/image/upload/v1596067038/personal-blog/live-dashboard_hiikn0.png)

Finally, it's just been a joy building a Phoenix app. Since I have no idea what I'm doing, I get hit with a lot of errors or warnings. They've been super helpful and often offer solutions. Phoenix's hot reloading is super snappy, and the default styling looks fresh. I'm not a front-end developer, so I'm always happy when a framework ships with default styles that don't look like rubbish.

## Conclusion

It's only been a week playing around with Phoenix, and I've loved it. I'm learning Elixir at the same time, which has also been a fun, but challenging journey. Having worked with Clojure, Elixir reads a little easier. However, moving from object-oriented to a functional paradigm is tough. There's still a lot more for me to discover with both Phoenix and Elixir, and undoubtedly I'm sure I'll find some feature that I wish it had. For those coming from Rails, Phoenix will feel right at home. So the next time you're looking to build a new web application, I urge you to give Phoenix a try!