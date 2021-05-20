<script>
  // const codeBlocks = document.querySelectorAll('.code-header + pre');
  // const copyCodeButtons = document.querySelectorAll('.copy-code-button');

  // console.log("Code blocks: ", codeBlocks);
  // console.log("Copy Code Buttons: ", copyCodeButtons);
  // copyCodeButtons.forEach((copyCodeButton, index) => {
  //   const code = codeBlocks[index].innerText;

  //   copyCodeButton.addEventListener('click', () => {
  //     window.navigator.clipboard.writeText(code);
  //     copyCodeButton.classList.add('copied');

  //     setTimeout(() => {
  //       copyCodeButton.classList.remove('copied');
  //     }, 2000);
  //   });
  // });

</script>

<div class="code-header">
  <button class="copy-code-button" aria-label="Copy code to clipboard"></button>
</div>

<style lang="scss">
  .code-header {
    display: flex;
    justify-content: flex-end;
  }

  .copy-code-button {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 4px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 4px 8px;

    &::before {
      content: "Copy";
    }

    &::after {
      content: "📋";
      display: block;
    }

    // This class will be toggled via JavaScript
    &.copied {
      &::before {
        content: "Copied!";
      }

      &::after {
        content: "✔️";
      }
    }
  }

</style>