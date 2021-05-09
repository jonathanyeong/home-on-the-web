<script>
  import Logo from './icons/Logo.svelte';
  import { page } from '$app/stores';
  $: path = $page.path;
</script>

<nav>
  <a href="/">
    <span class="visually-hidden">Logo</span>
    <Logo />
  </a>
  <div class="nav-links">
    <a href="/" class:active="{path === '/'}">Home</a>
    <a href="/garden" class:active="{path === '/garden'}">Digital Garden</a>
    <a href="/tutorials" class:active="{path === '/tutorials'}">Tutorials</a>
    <a href="/about" class:active="{path === '/about'}">About</a>
  </div>
</nav>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  .nav-links {
    a:last-child {
      margin-right: 0;
    }

    a {
      color: var(--gray-700);
      font-family: var(--font-family-medium);
      margin-right: 0.2rem;
      display: inline-block;
      text-decoration: none;

      @media (min-width: 768px) {
        margin-right: 2rem;
      }
    }

    .active {
      font-family: var(--font-family-heavy);
      position: relative;
      &:before {
        content: '';
        background: var(--secondary-400);
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -4px;
      }
    }
  }
</style>