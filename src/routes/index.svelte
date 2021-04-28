<svelte:head>
	<title>Jonathan Yeong's Site</title>
</svelte:head>

<h1 class="title">Jonathan Yeong</h1>
<p>
	Welcome to my home on the web! I’m a backend developer writing about learning, developer growth,
	and tech I’m currently using. You can also find me on <a class="yt-link" href="https://www.youtube.com/channel/UClb6km0HLkGUOEjHlp5WdPA" target="_blank">Youtube</a>,
	where I record Elixir tutorials, and connect with me on <a class="twitter-link" href="https://twitter.com/JonoYeong" target="_blank">Twitter</a>.
</p>

<main>
	<h2 class="h3">The Digital Garden</h2>
	<a href="/garden">More from the garden</a>
</main>

<style lang="scss">
	.title {
		color: var(--primary-400);
	}

	a {
		color: var(--gray-700);
		font-family: var(--font-family-heavy);
		text-decoration: none;
		&:visited {
			color: var(--gray-700);
			text-decoration: none;
		}
	}
</style>