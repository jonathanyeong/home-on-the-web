---
createdAtDate: 2021-09-07T00:00:00.000-08:00
lastUpdatedDate: 2021-09-07T00:00:00.000-08:00
title: The Tale of the Whitespace
seoTitle: The Tale of the Unicode Whitespace in Ruby
published: true
description: I ran into a weird bug with a space that looked like a space. But it really wasn't.
tags:
  - ruby
featuredPost: true
---
<script>
  import AlertBox from "$lib/AlertBox.svelte";
</script>

<AlertBox content="Actively working on this post. If you want to solve your unicode whitespace woes read on!" />

Can you tell the difference between " " and " "? I certainly can't. But the computer can.

```ruby
" ".ord
# => 32
" ".ord
# => 160
```

This resulted in one of the more confusing bugs that I've seen as a developer. And it gets into the topic of unicode whitespaces. The particular two codepoints represented above are 32 for an ASCII space and 160 for a non-breaking space. Let's say that I wanted to transliterate a string. Transliteration means to swap characters with something that looks similar. It does not take into account sound. E.g. transliterating `é` will give `e`.

```ruby
I18n.transliterate("hëllo wōrld")
# => "hello world"

I18n.transliterate("hëllo wōrld")
# => "hello?world"
```

You might want to transliterate to remove any characters you can't handle (or don't want to handle). Well the transliteration, in the example above, picks up the non breaking space and treats it like an unknown character. Something that it can't transliterate. We can solve this through regex. But we can't use the regex meta-characters because they don't encompass non-ASCII characters ([https://ruby-doc.org/core-3.0.2/Regexp.html](https://ruby-doc.org/core-3.0.2/Regexp.html))

```ruby
/\s/.match("hello world")
# => nil

/\s/.match("hello world")
# => #<MatchData " ">
```

But we can use the POSIX bracket expressions

```ruby
# Hard to tell but the first line is a non breaking space!
/[[:space:]]/.match("hello world")
# => #<MatchData " ">

/[[:space:]]/.match("hello world")
# => #<MatchData " ">
```

We can then use the bracket expression to substitute the non breaking space with an ASCII space.

```ruby
I18n.transliterate("hëllo wōrld")
# => "hello?world"

I18n.transliterate("hëllo wōrld".gsub(/[[:space:]]/, " "))
# => "hello world"
```

