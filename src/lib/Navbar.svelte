<script>
  import Logo from './icons/Logo.svelte';
  import SunIcon from '$lib/icons/SunIcon.svelte';
  import MoonIcon from '$lib/icons/MoonIcon.svelte';
  import { page } from '$app/stores';

  let darkMode = false;
  let themeAriaLabel = "Activate Dark Mode";
  let currentTheme = null;
  if (typeof window !== 'undefined') {
    currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
  }

  if (currentTheme) {
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkMode = true;
      themeAriaLabel = "Activate Light Mode";
    } else {
      document.documentElement.removeAttribute('data-theme', 'dark');
      darkMode = false;
      themeAriaLabel = "Activate Dark Mode";
    }
  }

  function changeTheme() {
    if (darkMode) {
      document.documentElement.removeAttribute('data-theme', 'dark');
      darkMode = false;
      themeAriaLabel = "Activate Dark Mode";
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkMode = true;
      themeAriaLabel = "Activate Light Mode";
      localStorage.setItem('theme', 'dark');
    }
  }
</script>

<nav>
  <a class="logo-link" href="/">
    <span class="visually-hidden">Logo</span>
    <Logo className="logo-icon"/>
  </a>
  <div class="nav-links">
    <a href="/" class:active="{$page.path === '/'}" title="Home">Home</a>
    <a href="/garden/" class:active="{$page.path === '/garden'}" title="Digital Garden">Digital Garden</a>
    <!-- COMING SOON: <a href="/tutorials" class:active="{path === '/tutorials'}">Tutorials</a> -->
    <a href="/about/" class:active="{$page.path === '/about'}" title="About">About</a>
    <button class="theme-changer" type="button" aria-label={themeAriaLabel} on:click={changeTheme}>
      {#if darkMode }
        <MoonIcon className="theme-icon" />
      {:else}
        <SunIcon className="theme-icon" />
      {/if}

    </button>
  </div>
</nav>