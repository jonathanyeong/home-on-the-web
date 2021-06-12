<script>
	import { readableDate, htmlDate } from '$lib/dateParser';

	export let post;
	$:({ slug, title, tags, lastUpdatedDate } = post);

	function readableTags(postTags) {
		const hashTags = postTags.map((tag) => {
			return `#${tag}`
		})
		return hashTags.join(', ');
	}
</script>

<article class="garden-post">
  <a sveltekit:prefetch href="/garden/{slug}" class="garden-post-inner">
    <span class="garden-post-info"><time datetime="{htmlDate(lastUpdatedDate)}">{readableDate(lastUpdatedDate)}</time></span>
    <span sveltekit:prefetch class="h4 garden-post-title" href="/garden/{slug}/">{title}</span>
		<span class="garden-post-info garden-post-tags">{readableTags(tags)}</span>
	</a>
</article>

<style lang="scss">
	@keyframes gradient {
    0% {
			background-position: 0% 50%;
    }
    50% {
			background-position: 100% 50%;
    }
    100% {
			background-position: 0% 50%;
    }
	}

  .garden-post {
		border-radius: 5px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		position: relative;
		background: linear-gradient(-45deg,
			var(--secondary-200),
			var(--heliotrope-gray),
			var(--fiery-rose));
		background-size: 300% 300%;
		height: 160px;

		@media (min-width: 768px) {
			height: 200px;
		}
	}

	.garden-post-inner {
		background: var(--post-card-bg);
		border: 2px solid var(--primary-400);
		border-radius: 5px;
		display: flex;
		position: relative;
		height: 100%;
		flex-direction: column;
		text-decoration: none;
		transition: transform 0.1s ease-in-out;
	}

	.garden-post:hover .garden-post-inner {
		transform: translate(-5px, -10px);

		@media (min-width: 768px) {
			transform: translate(-8px, -15px);
		}
	}

	.garden-post:active .garden-post-inner {
		transform: translate(-3px,-5px);
	}

	.garden-post:hover {
		animation: gradient 3s ease infinite;
	}

	.garden-post-title {
		font-family: var(--font-family-medium);
		color: var(--body-text-color);
		text-decoration: none;
	}

	.garden-post-info {
		color: var(--subtitle-text-color);
		font-size: var(--small-text);
	}

	.garden-post-info,
	.garden-post-title {
		margin: 16px 16px 0;
	}

	.garden-post-tags {
		position: absolute;
		bottom: 16px;
		right: 16px;
		margin: 0;
	}
</style>