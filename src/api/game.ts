import { api } from "../lib/api";
import { FetchGameResponse, GameResponse } from "../lib/types";

export async function addGame(
  playerXName: string,
  playerOName: string
): Promise<GameResponse> {
  return api.post("/api/games", { playerXName, playerOName });
}

export async function fetchGames(
  page: number,
  limit: number
): Promise<{ count: number; data: FetchGameResponse[] }> {
  return api.get(`/api/games/${page}/${limit}`);
}

