import { api } from "../lib/api";
import { GameResponse } from "../lib/types";

export async function addGame(playerXName: string, playerOName: string):Promise<GameResponse> {
  return api.post("/api/games", { playerXName, playerOName });
}

