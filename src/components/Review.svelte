<script lang="ts">
  import type GameConfig from "../types/gamecfg";
  import getSkins from "../util/getSkins";
  import getWeights from "../util/getWeights";

  export let cfg: GameConfig;
  export let scorecard: number[][];
  $: weights = getWeights(cfg);
  $: ({ holeWinners, points } = getSkins(cfg, scorecard, weights));
  $: sortedPoints = cfg.players
    .map(({ name }, i) => {
      return { name, skins: points[17][i] };
    })
    .sort((a, b) => b.skins - a.skins);
  $: sums = scorecard.reduce(
    (acc, hole) => {
      hole.forEach((strokes, i) => (acc[i] += strokes));
      return acc;
    },
    cfg.players.map(() => 0)
  );
</script>

<h2>Ranking</h2>
<ol>
  {#each sortedPoints as player, i}
    <li>
      <span>{player.name || "No Name"}</span> - {sortedPoints[i].skins}
      {sortedPoints[i].skins === 1 ? "Skin" : "Skins"}
    </li>
  {/each}
</ol>
<h2>Scorecard</h2>
<div class="table-container">
  <table>
    <tr>
      <th>Hole</th>
      <th class="sum">SUM</th>
      {#each [...Array(18)] as _, i}
        <th>{i + 1}</th>
      {/each}
    </tr>
    {#each cfg.players as player, i}
      <tr class="player-row">
        <th class={!player.name ? "untitled" : ""}>
          {player.name || "No Name"}
        </th>
        <td class="sum">{sums[i]}</td>
        {#each [...Array(18)] as _, j}
          <td class={holeWinners[j] === i ? "hole-leader" : ""}>
            {scorecard[j][i]}</td
          >
        {/each}
      </tr>
    {/each}
  </table>
</div>

<style>
  /* rank */
  ol {
    margin-bottom: 1em;
    text-align: left;
  }

  /* table */
  div.table-container {
    overflow: hidden;
    width: 100%;
    padding: 0px 12px;
  }
  table {
    display: grid;
    grid-template-columns: minmax(9ch, 1fr) 5ch repeat(18, 20px);
    grid-template-rows: 20px;
    position: relative;
    overflow-x: auto;
    width: 100%;
    text-align: right;
    padding-bottom: 6px;
    gap: 8px 6px;
  }
  tr {
    display: contents;
  }
  th:first-child {
    position: sticky;
    padding-left: 4px;
    left: 0;
    z-index: 1;
    background-color: white;
    height: 2.25em;
    line-height: 1.1;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
  tr.player-row > th {
    font-weight: 500;
  }
  th:not(:first-child),
  td {
    font-size: 16px;
    min-width: 2ch;
    font-family: monospace;
    position: sticky;
    left: 4px;
  }
  .sum {
    font-weight: 700;
    color: crimson;
    padding-right: 16px;
    justify-self: end;
  }
  td.hole-leader {
    font-weight: 700;
  }
  .untitled {
    color: #666;
    font-style: italic;
  }
</style>
