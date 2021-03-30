---
date: 2020-06-06
title: "Documentation Driven Design"
published: true
tags:
- documentation
---
I started this year with a goal; develop features faster without sacrificing quality. I soon realized that I couldn't find the balance between quality and speed and became increasingly stressed at work. Unfortunately, for the people and animals in my household, this manifested in a very grumpy developer.

One of the ways I try to prove why I was hired and overcome my imposter syndrome is to produce work. The more work I create, the more deserving I am of my position. Lately, I've started repeating mistakes or causing bugs that significantly slowed down my work output. This perceived drop in performance has started making me question whether I'm good enough to be a developer.

After taking time off work, I realized I had to do something different. I wanted to try something different. My theory was that writing documentation could help drive development. Okay, this might seem obvious to some, but I always thought documentation comes after development.

> Writing documentation could help drive development

Documentation is what you give to others to help onboard or to fix problems in the future. However, I started treating it as a way to plan my development. Here are the three ways I used documentation.

**Use diagrams to understand the code flow**

I try and build a flowchart of how the code flows from one method to another. I use pen and paper or tools such as [lucidchart](https://www.lucidchart.com/pages/ "Lucid Chart") or [draw.io](http://draw.io/) to do this. Usually, I'm itching to dive right into the code. Building a mental model this way works for small codebases. However, working with large codebases makes it almost impossible for me to keep a working mental model in my head. In the end, I completely lose track of where I am and how I got here.

**Documentation as a plan**

There have been many times when I've just started writing code, not knowing what I wanted to build. Sometimes this has happened while I was still investigating how the code works! More often than not, coding this way has always caused me headaches in the future.

I plan through note-taking apps (I use [Roam Research](https://roamresearch.com/ "Roam Research")). By adding code comments to parts of the codebase I understand. Or through Test-Driven Development (TDD) if I feel like I have a good grasp of the codebase. Planning out a feature like this has resulted in less throwaway code. It's also helped highlight potential unknowns before I start.

**Soliciting feedback with documentation**

No one works in a vacuum and no one knows everything. One way I help give context to future code reviews is to offer documentation to my peers. I do this before I even have a pull request open. An example where this has helped is when I present my documentation to QA. Getting QA looped in early means they know what to expect when my PR lands. And it gives them a place to voice concerns which further reduces back and forths.

***

Documentation seems like a straightforward solution. But it takes work to draw diagrams or to take notes. By the time you finish your feature, the documentation may be out of date or ready to be thrown away. Taking the time to do this documentation work ahead of time was a significant paradigm shift for me. My mindset in the past has always been write code first, document after. However, through some humbling experiences, I've realized it's better to spend time planning upfront. And avoid having to pay back that time (with interest) in the future.