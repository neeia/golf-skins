import type GameConfig from "../types/gamecfg";

export default function getSkins(cfg: GameConfig, scoreboard: number[][], weights: number[][]) {
  const weightedScores: number[][] = scoreboard.map((sc, i) =>
    sc.map((score, j) => score - weights[i][j])
  )

  const holeWinners: number[] = [];
  const points: number[][] = scoreboard.map(hole => hole.map(() => 0));
  const skins: number[] = [];
  const streaks: number[] = [];
  let streak = 0;
  weightedScores.forEach((val, i) => {
    // val is an array of size p
    streak++;
    streaks.push(streak);
    const winner = getWinner(val);
    if (winner != null) {
      const score = Math.min(cfg.maxStreak, streak) + getBonusSkins(scoreboard[i][winner], cfg);
      for (let j = i; j < 18; j++) {
        points[j][winner] += score;
      }
      holeWinners.push(winner);
      skins.push(streak);
      streak -= Math.min(cfg.maxStreak, streak);
    } else {
      holeWinners.push(-1);
      skins.push(0);
    }
  })
  return { holeWinners, points, skins, streaks };
}

function getWinner(arr: number[]): number | null {
  const min = Math.min(...arr);

  // keeps track of array indices of each hole leader
  const winners = arr.map((e, i) => e === min ? i : '').filter(String) as number[];

  return winners.length === 1 ? winners[0] : null;
}

function getBonusSkins(strokes: number, cfg: GameConfig) {
  if (strokes === -1) return cfg.birdieBonus;
  if (strokes <= -2) return cfg.eagleBonus;
  return 0;
}