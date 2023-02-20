<script lang="ts">
  import type GameConfig from "../types/gamecfg";

  export let cfg: GameConfig;
  $: difficulties = [...Array(19)].map((_, i) => {
    return cfg.difficulties.filter((n) => n === i).length;
  });
</script>

<h2>Course Info</h2>
<ol class="hole">
  {#each cfg.difficulties as hole, i}
    <li class="hole">
      <label class="hole">
        Hole {i + 1}:
        <input
          type="number"
          bind:value={hole}
          on:focus={(e) => {
            e.currentTarget.select();
          }}
        />
      </label>
    </li>
  {/each}
</ol>
<ol class="colors">
  {#each difficulties as n, i}
    <li class={i ? (n ? (n > 1 ? "red" : "green") : "grey") : "darkgrey"} />
  {/each}
</ol>
<h2>Options</h2>
<section class="options">
  <label>
    Max Skin Value
    <input
      type="number"
      min="0"
      bind:value={cfg.maxStreak}
      on:focus={(e) => {
        e.currentTarget.select();
      }}
    />
  </label>
  <label>
    Birdie Bonus
    <input
      type="number"
      min="0"
      bind:value={cfg.birdieBonus}
      on:focus={(e) => {
        e.currentTarget.select();
      }}
    />
  </label>
  <label>
    Eagle Bonus
    <input
      type="number"
      min="0"
      bind:value={cfg.eagleBonus}
      on:focus={(e) => {
        e.currentTarget.select();
      }}
    />
  </label>
  <label>
    Always Score Birdies
    <input
      type="checkbox"
      bind:checked={cfg.alwaysScoreBirds}
    />
  </label>
</section>

<style>
  ol.hole {
    display: grid;
    grid-template-columns: repeat(4, minmax(50px, 1fr));
    padding: 0px 12px;
    gap: 8px;
    margin-bottom: 0.75em;
  }
  li.hole {
    display: contents;
  }
  label.hole {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #222;
    line-height: 1;
    white-space: nowrap;
  }
  input {
    height: 36px;
    font-size: 16px;
    max-width: 8ch;
    padding: 0px 6px;
  }
  ol.colors {
    display: grid;
    grid-template-columns: repeat(19, auto);
    justify-content: center;
    margin-bottom: 0.5em;
  }
  ol.colors > li {
    display: block;
    width: 8px;
    height: 8px;
  }
  ol.colors > li.red {
    background-color: red;
  }
  ol.colors > li.green {
    background-color: green;
  }
  ol.colors > li.grey {
    background-color: yellow;
  }
  ol.colors > li.darkgrey {
    background-color: grey;
  }
  section.options {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    text-align: end;
    gap: 4px 12px;
  }
  section.options > label {
    display: contents;
  }
</style>
