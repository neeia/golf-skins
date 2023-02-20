<script lang="ts">
  import { tick } from "svelte";

  let open = false;
  function toggleOpen() {
    open = !open;
  }

  let close: HTMLElement;
  $: if (open) {
    console.log(close);
    tick().then(() => {
      close.focus();
    });
  }

  let lastFocusableElement: HTMLElement;
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      open = false;
    }

    let isTabPressed = event.key === "Tab";

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === close) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        event.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        close.focus(); // add focus for the first focusable element
        event.preventDefault();
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<button class="info" on:click={toggleOpen}>
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000000"
  >
    <path
      d="M12 11.5v5M12 7.51l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog class="blocker" {open} on:click={toggleOpen} />
<dialog class="info" {open}>
  <h1>Info</h1>
  <button class="close" on:click={toggleOpen} bind:this={close}>
    <svg
      width="24px"
      height="24px"
      stroke-width="3"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
        stroke="#000000"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <section>
    <h2>About</h2>
    <p>
      HUSKINS is an app that makes it easier to play a skins game of golf. This
      is a weekend project I made for my father, an avid golfer.
    </p>
  </section>
  <section>
    <h2>Support Me</h2>
    <p>
      If this app helped you, you can help me too! Donating contributes to
      server costs, and anything is appreciated.
    </p>
    <a
      class="ko-fi"
      href="https://ko-fi.com/neeia"
      target="_blank"
      rel="noreferrer noopener"
      title="Open Ko-fi"
    >
      <img
        class="icon"
        width="131px"
        height="37px"
        src="/img/kofi.webp"
        alt="Ko-fi icon"
        loading="lazy"
      />
    </a>
  </section>
  <section>
    <h2>Contact</h2>
    <p>
      Got any suggestions? Feel free to email me:
      <a href="mailto:golf@neia.dev" bind:this={lastFocusableElement}
        >golf@neia.dev</a
      >
    </p>
  </section>
</dialog>

<style>
  dialog.blocker {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 999;
    border: none;
  }
  dialog.info {
    z-index: 1000;
    position: absolute;
    top: 0;
    padding: 0px 12px;
    border: none;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transition: transform 0.5s cubic-bezier(0.25, 1, 0, 1), opacity 0.25s ease-in-out,
      visibility 0.5s;
    z-index: 1000;
    border: 0;
    padding: 1rem;
    transform: translate(0, 100vh);
    opacity: 0;
    display: block;
    visibility: hidden;
  }
  dialog[open] {
    visibility: visible;
    transform: translate(0, 0vh);
    opacity: 1;
  }

  @media screen and (min-width: 769px) {
    dialog.info {
      max-height: 800px;
      max-width: 600px;
      box-shadow: 0px 0px 12px -4px #000;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }
  a.ko-fi {
    background-color: #ff5e5b;
    width: min-content;
    height: min-content;
    border-radius: 4px;
    position: "relative";
    margin-top: 2px;
    padding: 12px 20px 8px 12px;
  }
  @media only screen and (max-width: 770px) {
    dialog {
      height: 100%;
      width: 100%;
    }
  }
  h2 {
    margin: 0;
  }
  @media only screen and (min-width: 769px) {
    button.info > svg {
      width: 32px;
      height: 32px;
    }
  }
  button.close,
  button.info {
    position: absolute;
    top: 8px;
    right: 16px;
    padding: 4px;
    display: flex;
    border-radius: 50%;
  }
</style>
