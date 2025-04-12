export interface Player {
    _id: string;
    name: string;
    score: number;
  }
  
  export interface Game {
    _id: string;
    playerX: Player;
    playerO: Player;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface GameResponse {
    success: boolean;
    game: Game;
  }

  export interface Round {
    _id: string;
    game_id: string;
    board: string[];
    winner: "X" | "O" | null;
    status: 'incomplete' | 'draw' | 'completed';
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface RoundResponse {
    success: boolean;
    round: Round;
  }
  