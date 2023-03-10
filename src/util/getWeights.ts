import type AppSession from "../types/appsession";

export default function getWeights(session: AppSession) {
  const _handicaps = session.players
    .map(p => p.handicap);

  // Each player's bonus strokes, in order
  // Size p
  const handicaps = _handicaps.map(h => h - Math.min(..._handicaps));

  // if you get n strokes, n / 18 is the number of strokes for all holes, and an extra stroke if n % 18 >= hole difficulty 

  // size 18
  const weights: number[][] = [...Array(18)];
  for (let i = 0; i < 18; i++) {
    weights[i] = handicaps.map((numStrokes) =>
      +(numStrokes % 18 >= session.difficulties[i]) + (numStrokes / 18 >> 0)
    )
  }
  return weights;
}