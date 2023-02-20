import type GameConfig from "../types/gamecfg";

export default function getSkins(cfg: GameConfig, scoreboard: (number | undefined)[][], weights: number[][]) {
  const weightedScores: number[][] = scoreboard.map((sc, i) =>
    sc.map((score, j) => (score ?? 99) - weights[i][j])
  )

  const holeWinners: number[][] = [];
  const points: number[][] = scoreboard.map(hole => hole.map(() => 0));
  const skins: number[] = [];
  const streaks: number[] = [];
  let streak = 0;
  weightedScores.forEach((val, i) => {
    // val is an array of size p
    streak++;
    streaks.push(streak);
    const winners = getWinner(val, cfg.alwaysScoreBirds);
    if (winners.length) {
      winners.forEach(winner => {
        const score = Math.min(cfg.maxStreak, streak) + getBonusSkins((scoreboard[i][winner] ?? 99), cfg);
        for (let j = i; j < 18; j++) {
          points[j][winner] += score;
        }
      })
      holeWinners.push(winners);
      skins.push(streak);
      streak -= Math.min(cfg.maxStreak, streak);
    } else {
      holeWinners.push([]);
      skins.push(0);
      if (cfg.alwaysScoreBirds) {
        scoreboard[i]
          .map((score) => getBonusSkins((score ?? 99), cfg))
          .forEach((score, p) => {
            if (!score) return;
            for (let j = i; j < 18; j++) {
              points[j][p] += score;
            }
          });
      }
    }
  })
  return { holeWinners, points, skins, streaks };
}

function getWinner(arr: number[], alwaysScoreBirds: boolean): number[] {
  const min = Math.min(...arr);

  // keeps track of array indices of each hole leader
  const winners = arr.map((e, i) => e === min ? i : '').filter(String) as number[];
  if (!alwaysScoreBirds && winners.length !== 1) return [];
  if (alwaysScoreBirds && min >= 0) return [];
  return winners;
}

function getBonusSkins(strokes: number, cfg: GameConfig) {
  if (strokes === -1) return cfg.birdieBonus;
  if (strokes <= -2) return cfg.eagleBonus;
  return 0;
}