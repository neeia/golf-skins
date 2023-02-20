<script lang="ts">
  import { tick } from "svelte";
  import type Player from "../types/player";

  export let players: Player[];
  async function addPlayer() {
    players = [...players, { name: "", handicap: 0 }];
    await tick();
    nameEls[nameEls.length - 1].focus();
  }

  let nameEls: HTMLInputElement[] = [];
</script>

<div class="title-section">
  <h2>Players</h2>
  <button on:click={addPlayer} class="add-player" aria-label="add player">
    <svg
      width="36px"
      height="36px"
      stroke-width="2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M17 10h3m3 0h-3m0 0V7m0 3v3M1 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M8 12a4 4 0 100-8 4 4 0 000 8z"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</div>
<dl>
  {#each players as player, i}
    <dt>
      <input
        bind:value={player.name}
        placeholder="Name"
        bind:this={nameEls[i]}
      />
    </dt>
    <dd>
      <input
        type="number"
        class={!player.handicap ? "zero" : ""}
        bind:value={player.handicap}
        min={0}
        max={99}
        on:focus={(e) => {
          e.currentTarget.select();
        }}
        on:blur={() => {
          player.handicap = Math.min(player.handicap, 99);
        }}
      />
      <button
        class="close"
        on:click={() => {
          players.splice(i, 1);
          players = [...players];
        }}
      >
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
    </dd>
  {/each}
</dl>

<style>
  div.title-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5em;
    gap: 0.5ch;
  }
  dl {
    display: grid;
    grid-template-columns: 1fr auto auto;
    font-size: 1.25rem;
    gap: 8px 4px;
    padding: 0px 12px;
  }
  button.add-player {
    display: flex;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 100%;
    padding: 2px;
    height: 40px;
    font-size: 1em;
  }
  dt,
  dd {
    display: contents;
  }
  input[type="number"] {
    width: 5ch;
  }
  input::placeholder {
    color: #ccc;
    font-style: italic;
  }
  input::-moz-placeholder {
    color: #ccc;
    font-style: italic;
  }
  input::-webkit-input-placeholder {
    color: #ccc;
    font-style: italic;
  }
  input.zero:not(:focus) {
    color: #ccc;
  }
  button.close {
    background-color: transparent;
    width: 40px;
    height: 40px;
    border: none;
    opacity: 0.75;
  }
</style>
