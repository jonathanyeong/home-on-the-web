---
createdAtDate: 2020-07-02
lastUpdatedDate: 2020-07-02
title: "Elixir and Phoenix: Phase 1 updates"
description: "A few updates while working through my Elixir & Phoenix learning plan"
published: true
featuredPost: false
tags:
- learning
- elixir
- phoenix
---
Last week I wrote up a [learning plan](https://www.jonathanyeong.com/posts/phoenix-elixir-learning-plan/) for Phoenix & Elixir. In this post, I wanted to add an addendum to phase 1 of the plan and give a quick progress update.

## Addendum

First off, the addendum. After working through phase 1, I realized building a small part of the app and moving on wasn't very helpful. Focusing on a small piece of an app didn't give me enough time to get my hands dirty. Instead, here's how I would structure phase 1 work.

1. Start with setting up a migration and schema.
2. Add resourceful routes to the router.
3. Implement the new route and view
   * First look at changesets and forms.
4. Implement the create route and view
   * Dive more into changesets and how they validate data.
5. Implement the index route and view
   * Practice writing Ecto Repo queries and `all/2` method.
   * You can get fancy and add some ordering to the results.
6. Implement the show route and view.
   * Introduces Ecto Repo `get!/2` method.
7. Implement the edit route and view
   * No new concepts. More practice with changesets and repo methods.
8. Implement the update route and view
   * Introduces Ecto Repo `update/2`. More practice with changesets and repo methods.

Here are more resources that helped me during this phase:

* More information on changesets
  * [https://elixirschool.com/en/lessons/ecto/changesets/](https://elixirschool.com/en/lessons/ecto/changesets/ "https://elixirschool.com/en/lessons/ecto/changesets/")
  * [https://stackoverflow.com/questions/33186327/what-is-a-changeset-in-phoenix-elixir](https://stackoverflow.com/questions/33186327/what-is-a-changeset-in-phoenix-elixir "https://stackoverflow.com/questions/33186327/what-is-a-changeset-in-phoenix-elixir")
* Resources on migrations
  * [https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Schema.html](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Schema.html "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Schema.html")
  * [https://hexdocs.pm/phoenix/ecto.html#content](https://hexdocs.pm/phoenix/ecto.html#content "https://hexdocs.pm/phoenix/ecto.html#content")
* Ecto Query docs
  * [https://hexdocs.pm/ecto/Ecto.Query.html](https://hexdocs.pm/ecto/Ecto.Query.html "https://hexdocs.pm/ecto/Ecto.Query.html")
* Ecto Repo docs
  * [https://hexdocs.pm/ecto/Ecto.Repo.html#content](https://hexdocs.pm/ecto/Ecto.Repo.html#content "https://hexdocs.pm/ecto/Ecto.Repo.html#content")

## Progress

Now an update on my progress. I started with building a blog in Phoenix. There's like a billion CMS's and static sites out there already. So why re-invent the wheel? Well, firstly, I'm not very creative. But also, a blog is a well-defined domain, so I know how everything should fit together. Here's what I've learnt so far.

### Pipe Operator

Don't be afraid of the pipe operator! I'm a huge fan of this Elixir syntax. The pipe operator replaces the need to nest methods. For example, in Elixir I could write something like this:
```
    changeset = Post.changeset(Repo.get!(Post, id), %{})
```
But with pipes you can do this:
```
    changeset = Post |> Repo.get!(id) |> Post.changeset(%{})
```
Pipes make it look much cleaner and easier to read. From the [docs](https://hexdocs.pm/elixir/Kernel.html#%7C%3E/2):

> The |> operator is mostly useful when there is a desire to execute a series of operations resembling a pipeline

### Pattern Matching

Another aha moment was understanding pattern matching. In Elixir, pattern matching is more than `x = 1`. You can do some fancy assignments like this line from the [Elixir docs](https://elixir-lang.org/getting-started/keywords-and-maps.html#maps) `%{:a => a} = %{:a => 1, 2 => :b}`. Or take the example of the edit route below.
```
    def edit(conn, %{"id" => id} = _params) do
```
### Parallels between Phoenix and Rails

Finally, I started seeing parallels between Phoenix and Rails. Yes the underlying language of the two frameworks is different. However, there are also parallels between Ruby and Elixir. Using the patterns I learnt from Rails, I was able to start getting some of the conventions in Phoenix. For example, when making a new form in Phoenix:
```
    <%= form_for @changeset, Routes.admin_post_path(@conn, :create), fn f -> %>
    ...
    <% end %>
```
This feels very similar to the Rails form_for:
```
    <%= form_for @person do |f| %>
    ...
    <% end %>
```
I'm super keen to start phase 2: the deep dive. I'll be spending the next week or so figuring out how to write tests, how to use contexts, and learning some more Elixir goodness. If you want to follow the features I'm building for my blog, check out the [github project](https://github.com/jonathanyeong/phoenix_blog/projects/1). Oh, and before I forget, another great resource is [Elixir on slack](https://elixir-slackin.herokuapp.com/). The community there has been super helpful. Until next time, happy coding!