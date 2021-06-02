---
createdAtDate: 2020-06-26
lastUpdatedDate: 2020-06-26
title: "Phoenix and Elixir Learning Plan"
description: "A learning plan for someone who wants to learn Phoenix and Elixir. Assumes you know about variables, loops, but this is your first language"
published: true
tags:
  - learning plan
featuredPost: true
---
**Updated: July 17, 2020 - Added another resource**

I recently wrote about my [experience playing around with Phoenix and Elixir for the first time](https://www.jonathanyeong.com/posts/first-impressions-of-phoenix-framework/). Looking back on that experience, I copied a lot of code without fully understanding how things worked. Not knowing how things work is less than ideal. Because of this, I want to go back and take a more structured approach with learning Phoenix and Elixir. Which led me to make this learning plan! Below is what I think will be a good flow to help guide self-learning. I want to have achieved three things by the end of this plan:

* Have a good grasp on Elixir and Functional programming fundamentals.
* Be able to ship an application written in Phoenix to production.
* Know how to extend a simple CRUD app to do fun things.

I'm also working through this plan, which means I'll be continually updating it. I'll make sure to add resources I find or make edits if there's a better flow to learning a concept. Attached is a mindmap of the phases, and here's a [link to the mindmap](https://whimsical.com/6ogCtzpGVkE7PkQkUF53dh).

![Phoenix Elixir Learning Plan](https://res.cloudinary.com/jonathan-yeong/image/upload/v1596067038/personal-blog/phoenix-elixir-learning-plan_f6dxw9.png)

## Phase 0: Get setup with Phoenix & Elixir

The [Phoenix installation page](https://hexdocs.pm/phoenix/installation.html#content) has a great guide on getting Phoenix and Elixir setup. You will also need to setup Postgres. I set up Postgres via [docker](https://hub.docker.com/_/postgres).

## Phase 1: Build a simple CRUD app

[**Addendum**](https://www.jonathanyeong.com/posts/elixir-phoenix-phase-1-updates/ "Phase 1 Addendum")

Some examples of CRUD apps are: a todo list, a blog, twitter clone. Ideally anything data you want to save, edit, or delete from a database. For this phase, aim to build a very small part of the app. For example, get something saving and be able to display it on the page.

**Phoenix things to learn:**

* Directory Structure
* Generating models
* Routing
* Controllers
* Views & Templates
  * Forms

**Elixir things to learn:**

* Debugging with IO
* Maps & Structs
* Pipe Operator
* Loops & Control Flows

**Resources for this phase:**

* [Phoenix guide - From directory structure to ecto.](https://hexdocs.pm/phoenix/directory_structure.html)
* [Elixir Cast - Learn Elixir videos](https://elixircasts.io/series/learn-elixir).
* [Elixir School chapter 1 to 7](https://elixirschool.com/en/lessons/basics/basics/).
* [Using forms with changeset data](https://hexdocs.pm/phoenix_html/Phoenix.HTML.Form.html#module-with-changeset-data)

## Phase 1b: Deploy app to Heroku

There are probably other (better) options for deploying a Phoenix app. But you can't beat Heroku on simplicity and speed to deploy. There's two reasons for getting our app deployed early:

1. We get the satisfaction of shipping something!
2. We have a tight feedback loop of write code - test - deploy.

Here's a link to the [docs on deploying to Heroku](https://hexdocs.pm/phoenix/heroku.html#content).

## Phase 2: Phoenix Deep Dive

By now we probably want to start adding more functionality to the CRUD app. Before that we will want to learn how to test and moving forward apply TDD to adding new features. Also, now that we've used `mix` a few times, it would be nice to understand what it is and how it works.

**Phoenix things to learn:**

* Contexts
* Testing
  * Syntax
  * Rolling back DB changes
  * Context testing
  * Controller Testing

**Elixir things to learn:**

* Mix
* OTP
* (Optional) Deep dive into functional programming

**Resources for this phase:**

* [Link to Mix & OTP guide](https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html)
* [Phoenix documentation on testing](https://hexdocs.pm/phoenix/testing.html).

## Phase 3: Phoenix Authentication & Monitoring

I'm super excited to explore Telemetry and Live Dashboard in Phoenix. I think this is a super powerful out of the box feature of Phoenix and I want to take advantage of it. I'm also going to roll up authentication into this phase for two reasons:

* A lot of CRUD apps will have some sort of authentication.
* If you want to see a prod instance of Live Dashboard we should put it behind authentication.

**Phoenix things to learn:**

* Telemetry
  * How to add metrics?
* Live Dashboard
  * How to put it behind an authenticated endpoint?
* Background Jobs
  * Understand how to send emails.
* [Phoenix Auth Gen](https://github.com/aaronrenner/phx_gen_auth)
  * (Optional) Can we extend this to include roles?
  * Also see this great blog post from José Valim on an [authentication solution for phoenix](https://dashbit.co/blog/a-new-authentication-solution-for-phoenix). He references phoenix auth gen.

## (Optional) Phase 4: Live View

The only thing I know about Live View is that it lets me write server-side code and makes it look like I'm using a Javascript front-end.

**Phoenix things to learn:**

* What is LiveView 😅?

## Resource List

* [Official Elixir Docs](https://elixir-lang.org/learning.html)
* [Official Phoenix Docs](https://hexdocs.pm/phoenix/overview.html)
* [Elixir Casts - Videos on Elixir and Phoenix](https://elixircasts.io/)
* [Alchemist Camp - More Videos on Elixir](https://alchemist.camp/episodes)
* [Elixir School - Guide on learning Elixir](https://elixirschool.com/en/)
* [Elixir Koans - for practicing Elixir](https://github.com/elixirkoans/elixir-koans)
* [Phoenix Cheatsheets - if you need to copy and paste some code.](https://devhints.io/phoenix)
* [Fullstack Phoenix - More tutorials on Phoenix, also has boilerplate commands to get your Phoenix app running with tailwind, live view, and more!](https://fullstackphoenix.com/)

***

There's always so much to learn when you pick up a new language. And we're adding onto it by trying to learn a new framework as well! I'm hoping that having a more structured approach will make it a little less daunting! If you have any thoughts on the flow or resources to share please let me know in the comments below!