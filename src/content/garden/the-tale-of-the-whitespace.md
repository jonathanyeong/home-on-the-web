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


Can you tell the difference between " " and " "? I certainly can't. But the computer can.

```ruby
" ".ord
# => 32
" ".ord
# => 160
```

This whitespace led to one of the more confusing bugs that I've seen as a developer. I wanted to convert a string from Unicode to ASCII and this whitespace was causing my tests to fail. For the longest time, I trusted my eyes. It was only until I tested my assumptions that I realized that I wasn't dealing with any normal whitespace. I was dealing with a Unicode whitespace. Before I share how I solved the bug, skip here if you're impatient, I first want to do a deep dive into character encodings. Encodings like Unicode, ASCII, ANSI, ISO, are things we see all the time. But we hardly question, because it just works. Of course, until it doesn't.

Every character that we see on a computer screen, in your browser, or as a string object in your code, is represented as a number on the computer. To be specific, it's represented as a series of bits. This process of transforming a visual character into a number is done through character encoding.  Character encoding is a map for the computer to transform this number into the character we see. It's a cipher, a key, to crack the code.

This number that we assign to a character is known as a code point. That is what `" ".ord` is outputting in the code above. If we take a look at a table of ASCII codes we can see that the codepoint `32` corresponds to a space in ASCII ([https://www.ascii-code.com/](https://www.ascii-code.com/)). The codepoint here is a decimal representation of the bits, if we were to break this down into binary for an ASCII encoding the bits `00100000` would map to the whitespace we see.

If we have something like ASCII doing this for us already, why do we need something like Unicode? The first manifestation of Unicode (unicode 88) was an idea published in 1988 by Joseph D. Becker. Unicode was created to extend ASCII. Becker realized that ASCII wasn't enough to represent all languages around the world.

> What is needed is a new international/multilingual text encoding standard that is as workable and reliable as ASCII, but that covers all the scripts in the world. - [https://www.unicode.org/history/unicode88.pdf](https://www.unicode.org/history/unicode88.pdf)

ASCII being a 7 bit encoding structure within an 8-bit byte could only represent 256 characters. The Unicode standard introduced three new encoding forms, UTF-8, UTF-16, UTF-32. Each of these encoding forms are interchangeable and they all extend the original ASCII encoding. UTF-8 is the most widely seen encoding format. It represents a string in a variable amount of 8 bit bytes, from one to four. If we were representing an ASCII character say `A` in Unicode we would have:

ASCII → Codepoint 65 → 01000001 → A

UTF-8 → Codepoint U+0041 → 01000001 → A

UTF-16 → Codepoint U+0041 → 00000000 01000001 → A

UTF-32 → Codepoint U+0041 → 00000000 00000000 00000000 01000001 → A

[https://unicode-table.com/en/0041/](https://unicode-table.com/en/0041/)

Note: Unicode codepoints are represented via a `U+` and the hexidecimal value. Using a function like `.ord` will convert that codepoint to a decimal.

What if we want to switch the encoding between unicode to ASCII or some other format? What happens when we can't do this encoding?

<AlertBox content="Below here is a WIP!" />

## Transforming Unicode to ASCII
The particular two codepoints represented above are 32 for an ASCII space and 160 for a non-breaking space. Let's say that I wanted to transliterate a string. Transliteration means to swap characters with something that looks similar. It does not take into account sound. E.g. transliterating `é` will give `e`.

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

