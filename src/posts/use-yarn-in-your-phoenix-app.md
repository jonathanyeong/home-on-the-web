---
date: 2020-07-16
title: "Use Yarn in your Phoenix App"
published: true
tags:
- phoenix
- tutorial
---
[Yarn](https://classic.yarnpkg.com/en/), like NPM, is a package manager to manage your front-end packages. When creating a Phoenix project you can't specify whether to use NPM or Yarn. And it doesn't look like there's any plan to support this; [see github comment](https://github.com/phoenixframework/phoenix/pull/1963#issuecomment-396079993).

Prior to NPM 6, Yarn had a richer feature set and was more performant. But with the update, it looks like NPM has [caught up](https://blog.npmjs.org/post/173260195980/announcing-npm6) with Yarn. So why switch?

If you're just starting out, NPM is a great choice. But if you're used to Yarn or want to explore a new package manager, then here's a quick tutorial on adding it to your Phoenix application.

## Install Yarn

I installed Yarn on my Mac with Homebrew. For further installation instructions see the [Yarn docs](https://classic.yarnpkg.com/en/docs/install/#mac-stable "Yarn docs").

```bash
$ brew install yarn
```

## Initialize Yarn

Navigate to the assets folder in your Phoenix app.

```bash
cd ~/<phoenixapp>/assets
yarn init
```

After running `yarn init` you will be prompted for information on various items. The only prompt I filled out was for the entry point.

```bash
question entry point (index.js): app.js
```

You can open up `package.json` and see the results of `yarn init`. Feel free to edit these at a later time.

## Generate Yarn.lock

Run the `yarn` command to generate a `yarn.lock` file.

```bash
cd ~/<phoenixapp>/assets
yarn
```
I recommend removing the `package-lock.json` file since Yarn won't be using it.

That's it! You should now be ready to use Yarn to manage your front-end packages.