<script>
  import Logo from './icons/Logo.svelte';
  import { page } from '$app/stores';
  const { path } = $page
</script>

<nav>
  <a href="/">
    <span class="visually-hidden">Logo</span>
    <Logo />
  </a>
  <div class="nav-links">
    <a href="/" class:active="{path === '/'}">Home</a>
    <a href="/garden">Digital Garden</a>
    <a href="/tutorials">Tutorials</a>
    <a href="/about">About</a>
  </div>
</nav>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    a:last-child {
      margin-right: 0;
    }

    a {
      color: var(--gray-700);
      font-family: var(--font-family-medium);
      margin-right: 2rem;
      padding: 5px;
      text-decoration: none;
    }

    .active {
      font-family: var(--font-family-heavy);
      border-bottom: 2px solid var(--secondary-400);
    }
  }
</style>