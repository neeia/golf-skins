import type Player from "./player";

export default interface GameConfig {
  players: Player[];
  maxStreak: number;
  birdieBonus: number;
  eagleBonus: number;
  difficulties: number[];
}