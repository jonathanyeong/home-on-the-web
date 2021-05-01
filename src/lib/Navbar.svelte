<script>
  import Logo from './icons/Logo.svelte';
  import { beforeUpdate } from 'svelte';
  import { page } from '$app/stores';
  let pathName;
  beforeUpdate(() => {
    const { path } = $page;
    pathName = path;
  });
</script>

<nav>
  <a href="/">
    <span class="visually-hidden">Logo</span>
    <Logo />
  </a>
  <div class="nav-links">
    <a href="/" class:active="{pathName === '/'}">Home</a>
    <a href="/garden" class:active="{pathName === '/garden'}">Digital Garden</a>
    <a href="/tutorials" class:active="{pathName === '/tutorials'}">Tutorials</a>
    <a href="/about" class:active="{pathName === '/about'}">About</a>
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
      padding: 5px;
      text-decoration: none;

      @media (min-width: 768px) {
        margin-right: 2rem;
      }
    }

    .active {
      font-family: var(--font-family-heavy);
      border-bottom: 2px solid var(--secondary-400);
    }
  }
</style>