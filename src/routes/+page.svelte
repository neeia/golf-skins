<script lang="ts">
  import ClearDialog from "../components/ClearDialog.svelte";
  import Config from "../components/Config.svelte";
  import Game from "../components/Game.svelte";
  import InfoDialog from "../components/InfoDialog.svelte";
  import Players from "../components/Players.svelte";
  import Review from "../components/Review.svelte";
  import AppState from "../types/appstate";

  const stateMap = ["Options", "Strokes", "Summary"];
  let state: AppState = AppState.Players;
  const prevState = () => {
    state -= 1;
  };
  const nextState = () => {
    state += 1;
  };
</script>

<h1>HUSKINS</h1>
<ClearDialog resetAppState={() => (state = 0)} />
<InfoDialog />
<main>
  {#if state === AppState.Players}
    <Players />
  {:else if state === AppState.Config}
    <Config />
  {:else if state === AppState.Game}
    <Game />
  {:else if state === AppState.Review}
    <Review />
  {/if}
</main>
<section class="next">
  <button disabled={state === 0} on:click={prevState}>Previous</button>
  <button disabled={state === 3} on:click={nextState}>
    Next: {stateMap[state] ?? "None"}
  </button>
</section>

<style>
  :global(*) {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  :global(html) {
    height: 100%;
  }
  :global(body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    text-align: center;
    width: 100%;
    max-width: 770px;
    overflow: auto;
    padding-bottom: 12px;
  }
  :global(h1, h2) {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }
  :global(button) {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  :global(button:disabled) {
    cursor: default;
  }
  section.next {
    position: sticky;
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-items: center;
    min-height: 48px;
    width: 100%;
    gap: 16px;
    bottom: 0px;
    padding: 0px 12px;
    background-color: #005c36;
  }
  section.next > button {
    font-size: 1.1em;
    border-radius: 0;
    border: none;
    color: white;
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
  section.next > button:disabled {
    opacity: 0.25;
  }
  @media only screen and (min-width: 700px) {
    section.next {
      bottom: 32px;
      width: 70%;
      max-width: 50ch;
      background-color: #fff;
      grid-template-columns: 1fr 1fr;
    }
    section.next > button {
      background-color: #005c36;
      border-radius: 2px;
    }
  }
</style>
