<script>
  import RssIcon from '$lib/icons/RssIcon.svelte';
  import TwitterIcon from '$lib/icons/TwitterIcon.svelte';
  import YoutubeIcon from './icons/YoutubeIcon.svelte';
  let currYear = new Date().getFullYear();
</script>

<footer>
  <p>
    <a href="/rss.xml"><span class="visually-hidden">RSS Feed</span><RssIcon className="footer-icon" /></a>
    <a href="https://twitter.com/JonoYeong"><span class="visually-hidden">Twitter</span><TwitterIcon className="footer-icon" /></a>
    <a href="https://www.youtube.com/channel/UClb6km0HLkGUOEjHlp5WdPA"><span class="visually-hidden">Youtube</span><YoutubeIcon className="footer-icon" /></a>
  </p>
  <p>Made with <span>&hearts;</span> © {currYear} Jonathan Yeong</p>
</footer>

<style lang="scss">
  footer {
    margin-top: 88px;
    display: flex;
    flex-direction: column;
    background-color: var(--wheat);
    justify-content: flex-end;
    padding: 40px 0 20px;
  }
  span {
    color: var(--secondary-400);
  }

  p {
    color: var(--gray-700);
    text-align: center;
    margin: 0 0 8px;
  }

  :global(.footer-icon) {
    fill: var(--gray-700);
  }

  a {
    display: inline-block;
    margin-right: 16px;
    opacity: 1;
    transition: opacity 0.02s;

    &:hover {
      opacity: 0.7;
    }
  }
  a:last-child {
    margin-right: 0;
  }

</style>