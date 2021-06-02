---
createdAtDate: 2020-08-28
lastUpdatedDate: 2020-08-28
title: "Excerpts with Eleventy"
description: "A tutorial on getting excerpts into 11ty."
published: true
tags:
- tutorial
- eleventy
---
I 100% struggled with getting excerpts in [Eleventy](https://www.11ty.dev/) (11ty). It seems so simple, but I couldn’t figure it out.

I had two issues. Firstly, I got excerpts working using [11ty’s custom frontmatter data](https://www.11ty.dev/docs/data-frontmatter-customize/#example-parse-excerpts-from-content), unfortunately the excerpt did not render markdown. Which resulted in something that looked like this:

![](https://res.cloudinary.com/jonathan-yeong/image/upload/v1598592524/personal-blog/Screen_Shot_2020-08-27_at_9.32.53_PM_eq15uh.png)

Secondly, I found a great blog post: [Creating a blog with Eleventy](https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/) that detailed how to create an excerpt shortcode. This shortcode defaulted to taking the first paragraph as an excerpt. Or whatever custom excerpt tag you wanted. However, the shortcode ended up rendering the HTML tags. The opposite problem to 11ty’s excerpt. Rendering HTML resulted in some weird looking excerpts:

![](https://res.cloudinary.com/jonathan-yeong/image/upload/v1598592542/personal-blog/Screen_Shot_2020-08-27_at_12.50.24_AM_nzvnwt.png)

I could not find a happy medium! Here’s what I really wanted out of an excerpt:

* Cap at 200 characters
* Strip any HTML tags.
* Add an ellipses at the end of the excerpt
* Automatically pull the excerpt, no need for specific tags.

Thankfully, the blog post above gave me all the code I needed. I just had to make a few modifications.

## The modifications to extractExcerpt

First, install [striptags](https://www.npmjs.com/package/striptags). We will be using this library to get rid of the HTML tags:

```bash
npm install striptags

```

Now, we want to require `striptags` in `.eleventy.js`. At the top of the file:

```js
const striptags = require("striptags");

```

Next, add the `extractExcerpt` method at the bottom of the `.eleventy.js` file. This method is a modified version from the blog post to fit the criteria I wanted:

```js
function extractExcerpt(article) {
  if (!article.hasOwnProperty("templateContent")) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".'
    );
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  excerpt = striptags(content)
    .substring(0, 200) // Cap at 200 characters
    .replace(/^\\s+|\\s+$|\\s+(?=\\s)/g, "")
    .trim()
    .concat("...");
  return excerpt;
}

```

Add this line in the `eleventyConfig` block. This step is also from the blog post:

```js
module.exports = function(eleventyConfig) {

  eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

  ...

}

```

Finally, we can see our results.

![](https://res.cloudinary.com/jonathan-yeong/image/upload/v1598592567/personal-blog/Screen_Shot_2020-08-27_at_1.00.25_AM_rmwf9a.png)

Hooray! Nothing looks too off. I do see `Addendum #` which is caused by `markdownIt` adding an anchor permalink to the header. I can live with it though.

Looking back on this problem, the solution seems so easy. But I spent almost a week trying to figure out how to do this properly. I think it’s a combination of being stubborn with wanting the 11ty custom frontmatter solution to work, and my inability to Google. Really need to Google or ask for help sooner. I don’t know about you, but knowing when to ask for help is an endless struggle for me. Bar this one issue, I’m loving 11ty so far! Hopefully, this post will solve your excerpt woes.