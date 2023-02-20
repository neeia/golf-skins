import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import type GameConfig from "../types/gamecfg";
import type AppSession from "../types/appsession";

export const defaultScorecard = [...Array(18)].map(() => []);

export const scorecard: Writable<(number | undefined)[][]> = writable((browser
  ? JSON.parse(localStorage.getItem('scorecard') ?? "0")
  : null)
  || defaultScorecard);
if (typeof window !== 'undefined') scorecard.subscribe((value) => { localStorage.scorecard = JSON.stringify(value); });


export const defaultConfig: GameConfig = {
  birdieBonus: 1,
  eagleBonus: 4,
  maxStreak: 3,
  alwaysScoreBirds: false,
};

export const cfg: Writable<GameConfig> = writable((browser
  ? JSON.parse(localStorage.getItem('cfg') ?? "0")
  : null)
  || defaultConfig);
if (typeof window !== 'undefined') cfg.subscribe((value) => { localStorage.cfg = JSON.stringify(value); });

export const defaultSession = {
  players: [
    { name: "", handicap: 0 },
    { name: "", handicap: 0 },
    { name: "", handicap: 0 },
    { name: "", handicap: 0 },
  ],
  difficulties: [
    15, 7, 9, 3, 13, 11, 1, 5, 17, 2, 18, 16, 8, 12, 14, 6, 4, 10,
  ],
  hole: 0,
  highestHole: 0,
}

export const session: Writable<AppSession> = writable((browser
  ? JSON.parse(localStorage.getItem('session') ?? "0")
  : null)
  || defaultSession);
if (typeof window !== 'undefined') session.subscribe((value) => { localStorage.session = JSON.stringify(value); });