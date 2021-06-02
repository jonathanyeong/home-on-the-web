<script>
  export let content="";
</script>

<div class="alert-box">
  <span class="alert-icon">⚠️</span>
  <div class="alert-content">
    <h2 class="h4 alert-title">Work in progress</h2>
    <p>{content}</p>
  </div>
</div>

<style lang="scss">
  .alert-box {
    display: flex;
    padding: 16px;
    background: var(--alert-bg);
    gap: 16px;
    box-shadow: 0px 4px 10px -4px rgba(0, 0, 0, 0.15);
    margin-bottom: 16px;
    justify-content: center;
    @media (min-width: 768px) {
      margin-bottom: 32px;
      padding: 32px 0;
    }
  }

  .alert-icon {
    font-size: var(--heading-four);
    font-family: "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort;
  }

  p {
    margin: 0;
    color: var(--gray-700);
  }

  .alert-title {
    color: var(--gray-700);
    font-size: var(--alert-text);
    margin-bottom: 8px;
    margin-top: 2px; // to align with the alert-icon
  }
</style>