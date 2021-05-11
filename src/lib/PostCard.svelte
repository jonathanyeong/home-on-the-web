<script>
	export let post;
	const { slug, title, date, tags } = post

  const dateObj = new Date(date)

  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
  let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(dateObj);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);

  let readableDate = `${da} ${mo}, ${ye}`;

  mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(dateObj);
  da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dateObj);

  let htmlDate = `${ye}-${mo}-${da}`;

	function readableTags(postTags) {
		const combineTag = (acc, curr) => `${acc}, #${curr}`

		return postTags.reduce(combineTag, `#${postTags.shift()}`)
	}
</script>

<article class="garden-post">
  <a sveltekit:prefetch href="/garden/{slug}" class="garden-post-inner">
    <span class="garden-post-info"><time datetime="{htmlDate}">{readableDate}</time> • {readableTags(tags)}</span>
    <span sveltekit:prefetch class="h4 garden-post-title" href="/garden/{slug}">{title}</span>
	</a>
</article>

<style lang="scss">
  .garden-post {
		border-radius: 5px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		position: relative;
		background-color: var(--secondary-400);
		height: 200px;
	}

	.garden-post-inner {
		background: var(--white);
		border: 2px solid var(--primary-400);
		border-radius: 5px;
		display: flex;
		position: relative;
		height: 100%;
		flex-direction: column;
		text-decoration: none;
	}

	.garden-post:hover .garden-post-inner {
		transform: translateY(-10px);
	}

	.garden-post-title {
		font-family: var(--font-family-medium);
		color: var(--gray-700);
		text-decoration: none;
	}

	.garden-post-info {
		color: var(--gray-400);
		font-size: var(--small-text);
	}

	.garden-post-info,
	.garden-post-title {
		margin: 18px 20px 0;
	}
</style>