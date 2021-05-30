<script>
  import Logo from './icons/Logo.svelte';
  import { page } from '$app/stores';
</script>

<nav>
  <a class="logo-link" href="/">
    <span class="visually-hidden">Logo</span>
    <Logo className="logo-icon"/>
  </a>
  <div class="nav-links">
    <a href="/" class:active="{$page.path === '/'}" title="Home">Home</a>
    <a href="/garden" class:active="{$page.path === '/garden'}" title="Digital Garden">Digital Garden</a>
    <!-- COMING SOON: <a href="/tutorials" class:active="{path === '/tutorials'}">Tutorials</a> -->
    <a href="/about" class:active="{$page.path === '/about'}" title="About">About</a>
  </div>
</nav>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 24px;

    @media (min-width: 768px) {
      margin-bottom: 48px;
    }
  }

  .nav-links {
    a:last-child {
      margin-right: 0;
    }

    a {
      color: var(--gray-700);
      font-family: var(--font-family-medium);
      margin-right: 8px;
      display: inline-block;
      text-decoration: none;
      position: relative;

      @media (min-width: 768px) {
        margin-right: 0.2rem;
      }

      &:before {
        content: '';
        background: var(--secondary-400);
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -4px;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
      }

      &:hover::before {
        opacity: 1;
      }

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
        opacity: 1;
      }
    }
  }

  // Inspired by: https://github.com/elrumordelaluz/csshake/blob/master/scss/_tools.scss
  $chunk: 100%;
  $r: 40deg;

  @function apply-random() {
    @return (random($r) - $r/2);
  }
  @keyframes rattle {
      $interval: 20;
      $step: $interval * 1%;

      @while $step < $chunk {
        $rotate: apply-random();

        #{$step} {
          transform-origin: center;
          transform: rotate($rotate);
        }

        $step: $step + $interval;
      }
    }

  .logo-link:hover {
    animation: rattle 400ms ease-in-out 1;
  }
</style>