import type Player from "./player";

export default interface AppSession {
  players: Player[];
  difficulties: number[];
  hole: number;
  highestHole: number;
}