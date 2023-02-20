<script lang="ts">
  import { tick } from "svelte";
  import {
    cfg,
    defaultConfig,
    defaultScorecard,
    defaultSession,
    scorecard,
    session,
  } from "../stores/stores";

  export let resetAppState: () => void;
  let open = false;
  function toggleOpen() {
    open = !open;
  }

  let close: HTMLElement;
  $: if (open) {
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

  function resetScorecard() {
    $scorecard = defaultScorecard;
    resetAppState();
  }
  function resetConfig() {
    $cfg = defaultConfig;
    resetAppState();
  }
  function resetPlayers() {
    $session = defaultSession;
    $scorecard = defaultScorecard;
    resetAppState();
  }
  function resetAll() {
    $cfg = defaultConfig;
    $session = defaultSession;
    $scorecard = defaultScorecard;
    resetAppState();
  }
</script>

<svelte:window on:keydown={handleKeyDown} />
<button class="settings" on:click={toggleOpen}>
  <svg
    width="24px"
    height="24px"
    stroke-width="2"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000000"
  >
    <path
      d="M12 15a3 3 0 100-6 3 3 0 000 6z"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645
       1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072
       L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11
       l-2.378-.605z"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg></button
>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog class="blocker" {open} on:click={toggleOpen} />
<dialog class="info" {open}>
  <h1>Clear Data</h1>
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
  <section class="buttons">
    <button on:click={resetPlayers}>Reset Players</button>
    <button on:click={resetConfig}>Reset Settings</button>
    <button on:click={resetScorecard}>Reset Scores</button>
    <hr />
    <button on:click={resetAll}>Reset All</button>
  </section>
</dialog>

<style>
  h1 {
    font-size: 24px;
    width: 100%;
    text-align: center;
  }
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
    transition: transform 0.5s cubic-bezier(0.25, 1, 0, 1),
      opacity 0.25s ease-in-out, visibility 0.5s;
    z-index: 1000;
    border: 0;
    padding: 1rem;
    transform: translate(0, 100vh);
    opacity: 0;
    display: block;
    visibility: hidden;
    width: 240px;
    height: 340px;
    box-shadow: 0px 0px 12px -4px #000;
  }
  dialog[open] {
    visibility: visible;
    transform: translate(0, 0vh);
    opacity: 1;
  }

  section.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  hr {
    width: 85%;
    border: none;
    background-color: #666;
    height: 2px;
  }
  section.buttons > button {
    height: 48px;
    width: 80%;
    border-radius: 4px;
    background-color: whitesmoke;
  }

  @media only screen and (min-width: 769px) {
    button.settings > svg {
      width: 32px;
      height: 32px;
    }
  }
  button.settings {
    position: absolute;
    top: 8px;
    left: 16px;
    padding: 4px;
    display: flex;
    border-radius: 50%;
  }
  button.close {
    position: absolute;
    top: 8px;
    right: 16px;
    padding: 4px;
    display: flex;
    border-radius: 50%;
  }
</style>
