<script lang="ts">
  import getWeights from "../util/getWeights";
  import getSkins from "../util/getSkins";
  import { cfg, scorecard, session } from "../stores/stores";

  $: if ($scorecard[0].length !== $session.players.length) {
    $scorecard.forEach(
      (_, i) => ($scorecard[i] = $session.players.map(() => undefined))
    );
  }

  $: weights = getWeights($session);
  $: ({ points, streaks } = getSkins($cfg, $scorecard, weights));
  $: $session.highestHole = Math.max($session.highestHole, $session.hole);

  function changeScore(player: number, delta: number) {
    $scorecard[$session.hole][player] ??= 0;
    $scorecard[$session.hole][player]! += delta;
  }
</script>

<section class="hole">
  <button disabled={!$session.hole} on:click={() => ($session.hole -= 1)}>
    <svg
      width="40px"
      height="40px"
      stroke-width="3"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M15 6l-6 6 6 6"
        stroke="#000000"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <h2>
    Hole {$session.hole + 1}
  </h2>
  <button disabled={$session.hole === 17} on:click={() => ($session.hole += 1)}>
    <svg
      width="40px"
      height="40px"
      stroke-width="3"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="#000000"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</section>
<div>Handicap {$session.difficulties[$session.hole]}</div>
<div>
  {streaks[$session.hole]}
  {streaks[$session.hole] === 1 ? "Skin" : "Skins"}
</div>
<dl>
  <dt class="title">Name</dt>
  <dd class="title">
    <div>Skins</div>
    <div>Score</div>
  </dd>
  {#each $session.players as player, i}
    <dt class={!player.name ? "untitled" : ""}>{player.name || "No Name"}</dt>
    <dd>
      <div>{$session.hole ? points[$session.hole - 1][i] : 0}</div>
      <div class="score-counter">
        <button class="increment" on:click={() => changeScore(i, -1)}>
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M15 6l-6 6 6 6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <input
          type="number"
          bind:value={$scorecard[$session.hole][i]}
          on:focus={(e) => {
            e.currentTarget.select();
          }}
        />
        <button class="increment" on:click={() => changeScore(i, 1)}>
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#000000"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </dd>
  {/each}
</dl>

<style>
  section.hole {
    display: flex;
    justify-content: center;
  }
  h2 {
    width: 7ch;
  }
  section.hole > button {
    display: flex;
    width: 48px;
    justify-content: center;
    align-items: center;
  }
  dl {
    display: grid;
    grid-template-columns: 1fr 5ch auto;
    justify-items: start;
    align-items: center;
    gap: 16px 6px;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    width: 100%;
    padding: 0px 16px;
  }
  dt:first-child {
    height: min-content;
  }
  dt {
    width: 100%;
    max-height: 2.25em;
    line-height: 1.1;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
  dd {
    display: contents;
    justify-content: center;
    width: 100%;
    gap: 2px;
  }
  dd > div {
    text-align: center;
    width: 100%;
  }
  div.score-counter {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 2px;
  }
  dt.untitled {
    color: #666;
    font-style: italic;
  }
  dt.title,
  dd.title {
    color: #888;
    font-size: 14px;
  }
  input[type="number"] {
    width: 5ch;
    padding: 4px;
    font-size: 1em;
  }
  button.increment {
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 4px;
  }
  button:disabled {
    opacity: 0.15;
  }
</style>
