---
createdAtDate: 2020-08-22
lastUpdatedDate: 2021-06-01
title: "Using Github and Notion to organise side projects"
published: true
featuredPost: true
tags:
- automation
---

<script>
  import AlertBox from "$lib/AlertBox.svelte";
</script>

<AlertBox content="Notion has released an API. I'm working on updating this post to use it!" />

A while ago I posted a question on dev.to asking how people stay [motivated with their side projects](https://dev.to/jonoyeong/how-do-you-stay-motivated-with-your-side-projects-4e59 "motivated with their side projects"). There’s a bunch of great tips on that thread so definitely go check that out! I shared how I stay motivated, and that is by staying organised. Rarely, do I find time to start and finish a project in one session. It’s normally spread over days or weeks. If I’m not organised, I waste a lot of time figuring out what I was doing and what I’m doing next. Curse my terrible memory! Since that post, I’ve started accumulating a backlog of side projects. I still lean heavily on Github to keep my coding projects organised. But I’ve now brought in Notion to help manage ideas at a high level. In this post, I wanted to share how I use these tools to stay on track.

## Notion

![My Notion board](https://res.cloudinary.com/jonathan-yeong/image/upload/v1598128341/personal-blog/Notion_board_qwnei0.png "My Notion board")

[Notion](https://www.notion.so/ "Notion") is a knowledge management app. In Notion, I have a Kanban board that holds all of my side project ideas. The purpose of this page is to track what projects I have in flight, what I should work on next, and what needs my attention. I have a Notion template that pre-fills information about the project which makes it easy to add ideas. I have seven columns in this board, each representing a status:

* Up next
* Noodling - a project that I’ve started thinking about. But I don’t know what I want yet.
* In progress
* Ongoing - anything that needs continuous work, like writing for my blog.
* Completed
* Stalled - projects that are blocked by something out of my control. Or that I’m taking a brief hiatus from.
* Shelved - for projects that I’m never going to work on. But are not complete.

On the projects themselves I have these metadata columns:

* Priority - Either P1, P2, P3, or P4
* Impact - description of what I’m getting out of this project
* Language
* Framework
* Platform - e.g. blog, podcast, youtube

I use an effort impact matrix, to help determine the priority of an idea. This concept was mentioned in a recent [Shoptalk Show episode](https://shoptalkshow.com/426/). And after digging into it a little more, I followed a definition closer to this one found on [Groupmap](https://www.groupmap.com/map-templates/impact-effort-matrix).

* Low effort - High impact - quick win and I should do it immediately; priority 1.
* High effort - High impact - a major project that has many positive outcomes; priority 2.
* Low effort - Low impact - probably an unimportant easy task; priority 3.
* High effort - Low impact - time consuming task where I don’t gain much; priority 4.

Not all projects are as clear cut as these priorities. For example, I don’t take into account medium effort or impact. It’s something that I’m iterating on over time. Also, these priorities are a guide. If I know I’m going to have heaps of fun working on something, then I’ll do it regardless of the priority.

## Github Projects

![My Github board](https://res.cloudinary.com/jonathan-yeong/image/upload/v1598128365/personal-blog/Github_board_p59gxk.png "My Github board")

I use [Github Projects](https://docs.github.com/en/github/managing-your-work-on-github/about-project-boards) (GP) for per project planning. The beauty of GP is that it lives in Github, and I don’t need to dig through other tools to get a status update on a project. My GP board is a Kanban board with three (or four) columns:

* Next Up - prioritised so I can just take the top issue off the list.
* In Progress - what I’m currently working on
* Done - A completed issue or one I won’t be doing.
* (Optional) fourth column that contains meta information such as checklist for launch.

The board is then populated with issues. Creating issues within Github is an easy way to track your work items. And you can leverage Github automations. For example, merging a branch related to an issue will close it, which will automatically move the issue to the Done column.

I also add tags to issues. Tagging helps add extra context and can be used to filter issues. Sometimes, if I’m feeling extra motivated, I’ll use milestones to track larger features of a project or potential releases. Finally, I try to have many small issues which helps me identify the building blocks of a feature.

## Working on a task

I want to touch briefly with working on a side project. Since being stuck at home, I’ve found it really hard to concentrate. There are many days when I don’t feel like doing anything. To combat this, I’ve started time-boxing my work. You may have seen this technique in [Pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique). The idea is that you spend 25 minutes in deep focus and you take a 5 minute break afterwards. The goal of having a timer is to get you into the zone. In my current mental state, focusing for 25 minutes is hard. I find my mind wandering at around the 15 minute mark. So that was the goal I set. After 15 minutes I take a short break. And then I’d get straight back into it. Most of the time I end up working past the 15 minute mark. I have more successful sessions with 15 minutes vs 25 minutes. This success gets me into a more positive mindset, and helps me stay motivated.

## What’s the point of all this?

At the end of the day, it’s all about systems. It means I’m not wasting time trying to figure out what I need to be doing next. As James Clear wrote in his book, Atomic Habits:

> You do not rise to the level of your goals. You fall to the level of your systems.

I interpret this as having sensible defaults. With a system, my default behaviour is to take the next item off the list. However, no system is perfect. If it’s not working, change it! I find myself going through phases. For example, I’ve recently switched back to writing todos in a notebook. But I’m sure at some point I’ll get sick of writing and go back to an app like Todoist. My biggest advice is to start with something simple that works for you, and iterate on it. You don’t want to prematurely optimise. Hopefully, you'll find these tips helpful for organising your side projects!