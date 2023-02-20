<script lang="ts">
    import { cfg, scorecard, session } from "../stores/stores";
  import getSkins from "../util/getSkins";
  import getWeights from "../util/getWeights";

  $: weights = getWeights($session);
  $: $session.highestHole = Math.max($session.highestHole, $session.hole);
  $: ({ holeWinners, points } = getSkins($cfg, $scorecard, weights));
  $: sortedPoints = $session.players
    .map(({ name }, i) => {
      return { name, skins: points[17][i] };
    })
    .sort((a, b) => b.skins - a.skins);
  $: sums = $scorecard.reduce<number[]>(
    (acc, hole) => {
      hole.forEach((strokes, i) => (acc[i] += strokes ?? 0));
      return acc;
    },
    $session.players.map(() => 0)
  );

  function transcribe(n: number) {
    if (n === 0) {
      return "0";
    } else if (n < 0) {
      return `negative n${Math.min(2, -n)}`;
    } else {
      return `positive n${Math.min(1, n)}`;
    }
  }
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
    {#each $session.players as player, i}
      <tr class="player-row">
        <th class={!player.name ? "untitled" : ""}>
          {player.name || "No Name"}
        </th>
        <td class="sum">{sums[i]}</td>
        {#each [...Array(18)] as _, j}
          <td
            class={`score ${
              holeWinners[j].includes(i) ? "hole-leader" : ""
            } ${transcribe($scorecard[j][i] ?? 0)}`}
          >
            {$session.highestHole < j ? "-" : $scorecard[j][i] ?? "-"}
          </td>
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
    text-align: center;
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
    z-index: 2;
    background-color: white;
    height: 2.25em;
    line-height: 1.1;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    box-shadow: 0px 2px white, 0px -2px white;
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
    font-weight: 900;
  }
  .untitled {
    color: #666;
    font-style: italic;
  }
  td.score:before {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
  .negative:before {
    border-radius: 999px;
    margin-left: -2px;
    margin-top: -1px;
    padding: 50%;
  }
  .positive:before {
    margin-left: -6px;
    top: 1px;
    width: 75%;
    padding-top: 75%;
  }
  .n1::before {
    content: " ";
    border: 1px solid black;
  }
  .n2::before {
    content: " ";
    border: 1px solid black;
    outline: 1px solid black;
    outline-offset: 1px;
  }
</style>
