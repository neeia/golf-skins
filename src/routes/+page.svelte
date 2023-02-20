<script lang="ts">
  import Config from "../components/Config.svelte";
  import Game from "../components/Game.svelte";
  import Players from "../components/Players.svelte";
  import Review from "../components/Review.svelte";
  import AppState from "../types/appstate";
  import type GameConfig from "../types/gamecfg";

  const stateMap = ["Options", "Strokes", "Summary"];
  let state: AppState = AppState.Players;
  const prevState = () => {
    state -= 1;
  };
  const nextState = () => {
    state += 1;
  };

  let cfg: GameConfig = {
    players: [
      { name: "", handicap: 0 },
      { name: "", handicap: 0 },
    ],
    difficulties: [
      15, 7, 9, 3, 13, 11, 1, 5, 17, 2, 18, 16, 8, 12, 14, 6, 4, 10,
    ],
    birdieBonus: 1,
    eagleBonus: 4,
    maxStreak: 3,
  };

  let scorecard: number[][] = [...Array(18)].map(() => []);
</script>

<h1>Golf Skins</h1>
<main>
  {#if state === AppState.Players}
    <Players bind:players={cfg.players} />
  {:else if state === AppState.Config}
    <Config bind:cfg />
  {:else if state === AppState.Game}
    <Game bind:cfg bind:scorecard />
  {:else if state === AppState.Review}
    <Review {cfg} {scorecard} />
  {/if}
</main>
<section class="next">
  <button disabled={state === 0} on:click={prevState}>Previous</button>
  <button disabled={state === 3} on:click={nextState}
    >Next: {stateMap[state] ?? "None"}</button
  >
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
