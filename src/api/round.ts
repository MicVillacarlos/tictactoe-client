import { api } from "../lib/api";
import { RoundResponse } from "../lib/types";

export async function addRound(game_id: string): Promise<RoundResponse> {
  return api.post("/api/round", { game_id });
}

export async function updateBoard(
  _id: string,
  board: string[]
): Promise<RoundResponse> {
  return api.patch(`/api/round/board/${_id}`, { board });
}

export async function updateRound(
  _id: string,
  board: string[],
  winner: string|null,
  status: string
): Promise<RoundResponse> {
  return api.patch(`/api/round/${_id}`, { board, winner, status });
}