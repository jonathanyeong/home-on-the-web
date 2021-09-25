---
createdAtDate: 2021-09-07T00:00:00.000-08:00
lastUpdatedDate: 2021-09-24T00:00:00.000-08:00
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

This number that we assign to a character is known as a code point. That is what `" ".ord` is outputting in the code above. If we take a look at a table of ASCII codes we can see that the codepoint `32` corresponds to a space in ASCII (see an [ASCII table](https://www.ascii-code.com/)). The codepoint here is a decimal representation of the bits, if we were to break this down into binary for an ASCII encoding the bits `00100000` would map to the whitespace we see.

If we have something like ASCII doing this for us already, why do we need something like Unicode? The first manifestation of Unicode ([Unicode 88](https://www.unicode.org/history/unicode88.pdf)) was an idea published in 1988 by Joseph D. Becker. Unicode was created to extend ASCII. Becker realized that ASCII wasn't enough to represent all languages around the world.

> What is needed is a new international/multilingual text encoding standard that is as workable and reliable as ASCII, but that covers all the scripts in the world.

ASCII being a 7 bit encoding structure within an 8-bit byte could only represent 256 characters. The Unicode standard introduced three new encoding forms, UTF-8, UTF-16, UTF-32. Each of these encoding forms are interchangeable and they all extend the original ASCII encoding. UTF-8 is the most widely seen encoding format. It represents a string in a variable amount of 8 bit bytes, from one to four. If we were representing an ASCII character say `A` in Unicode we would have:

ASCII → Codepoint 65 → 01000001 → A

UTF-8 → Codepoint U+0041 → 01000001 → A

UTF-16 → Codepoint U+0041 → 00000000 01000001 → A

UTF-32 → Codepoint U+0041 → 00000000 00000000 00000000 01000001 → A

*See [Unicode Table for A](https://unicode-table.com/en/0041/)*

**Note**: Unicode codepoints are represented via a `U+` and the hexidecimal value. Using a function like `.ord` will convert that codepoint to a decimal.

At this point, we know what character encodings are. We know that ASCII and Unicode are both types of character encoding. And that Unicode was introduced to extend ASCII so that we can represent all languages. We also know that an ASCII character can also be represented as a Unicode character, interchangeably. The ASCII bit representation is the basically the same as the Unicode bit representation. But what about the flip side to this statement? What if we want to represent Unicode characters as ASCII characters?

## Transforming Unicode to ASCII

When building with Rails, there's a handy method that's found on the localization (`I18n`) library - `.transliterate`. Transliteration means to swap characters with something that looks similar. Not taking into account how the character sounds. For example, transliterating `é` will give `e`. Why would you do this? You might have a blog post with special unicode characters, but a URL isn't able to handle it. So we need to transform those characters to the ASCII approximation. When running `transliterate` using the whitespace example given in the beginning we have a problem.

```ruby
I18n.transliterate("hëllo wōrld")
# => "hello world"

I18n.transliterate("hëllo wōrld")
# => "hello?world"
```

The transliterate method doesn't know what to do with the unicode whitespace, which is a non breaking space (nbsp). Because it can't handle it, it will replace the nbsp with a question mark. Not something that we want. To solve this one use case, we can use regex. Unfortunately, in Ruby, the whitespace meta-character doesn't recognize non-ASCII characters (source)  We can't use the regex meta-characters because they don't encompass non-ASCII characters.

```ruby
/\s/.match("hello world")
# => nil

/\s/.match("hello world")
# => #<MatchData " ">
```

Thankfully, we can use the POSIX bracket expressions to solve this issue:

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

While this solution works for unifying whitespaces. We start running into problems when we want to expand our solution. For example, the transliterator won't be able to transliterate unicode dashes. To expand this solution, `I18n` gives you the ability to add transliteration rules to a locale file:

```ruby
# <locale>.yml
i18n:
  transliterate:
    rule:
      ü: "ue"
      ö: "oe"
      —: "-"
```

You can also set these rules using a Hash or a Proc. This solution is similar to how `I18n.transliterate` is set up. Under the hood, the transliterator has a hash that contains a certain set of Unicode to ASCII permutations (see [source](https://github.com/ruby-i18n/i18n/blob/0888807ab2fe4f4c8a4b780f5654a8175df61feb/lib/i18n/backend/transliterator.rb#L43)). If we wanted to create a transliterator based on some hash rules we can do something like this:

```ruby
my_transliterator = I18n::Backend::Transliterator::HashTransliterator.new({"—" => "ASCII-DASH"})
my_transliterator.transliterate("hello—world")
#=> "helloASCII-DASHworld"
```