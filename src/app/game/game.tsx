"use client";
import React, { useCallback, useState } from "react";
import Layout from "../components/Organisms/layout/Layout";
import PrimaryButton from "../components/Atoms/buttons/PrimaryButton";
import Image from "next/image";
import ModalForm from "../components/Organisms/modal/ModalForm";
import StartNewGameFormContent from "./StartNewGameFormContent";
import Board from "../components/Organisms/board/Board";
import { addApostrophe } from "../helpers/helpers";

const Game = () => {
  const [isViewStartGame, setIsViewStartGame] = useState<boolean>(false);
  const [isShowBoard, setIsShowBoard] = useState<boolean>(false);

  const [board, setBoard] = useState(Array(9).fill(""));
  const [gameData, setGameData] = useState({
    game_id: "",
    player_x: "",
    player_o: "",
  });
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6], 
  ];

  const checkWinner = (board: string[]): string | null => {
    const winnerLine = WINNING_COMBOS.find(
      ([a, b, c]) => board[a] && board[a] === board[b] && board[b] === board[c]
    );

    if (winnerLine) return board[winnerLine[0]];
    return board.every((cell) => cell) ? "draw" : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const result = checkWinner(newBoard);
    if (result === "draw") {
      setWinner("Draw");
    } else if (result) {
      setWinner(result);
    }

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const handleChangeNewGameForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameData({ ...gameData, [e.target.id]: e.target.value });
  };

  const onSubmitStartNewGame = (e: React.FormEvent) => {
    e.preventDefault();
    setIsViewStartGame(false);
    setIsShowBoard(true);
  };

  const renderStatus = useCallback(() => {
    if (winner) {
      const winnerName =
        winner === "X" ? gameData?.player_x : gameData?.player_o;
      return winner === "Draw" ? "It's a draw!" : `${winnerName} wins!`;
    }

    const playerName =
      currentPlayer === "X"
        ? addApostrophe(gameData?.player_x)
        : addApostrophe(gameData?.player_o);

    return `${playerName} turn`;
  }, [currentPlayer, gameData?.player_x, gameData?.player_o, winner]);

  return (
    <Layout>
      <div className="w-full pt-[10vh] flex flex-col justify-center items-center gap-10">
        {!isShowBoard ? (
          <>
            <Image
              src="/tictactoe_text.svg"
              alt="TicTacToe_logo"
              width={450}
              height={0}
            />
            <PrimaryButton
              onClick={() => setIsViewStartGame(true)}
              width="200px"
            >
              Start New Game
            </PrimaryButton>
          </>
        ) : (
          <>
            {renderStatus()}
            <Board board={board} handleClick={handleClick} />
            <PrimaryButton width="200px" onClick={() => resetGame()}>
              Stop
            </PrimaryButton>
          </>
        )}
      </div>
      <ModalForm
        content={
          <StartNewGameFormContent
            handleChangeForm={handleChangeNewGameForm}
            playerValue={gameData}
          />
        }
        submitButtonText="Proceed"
        isOpen={isViewStartGame}
        onCloseModal={() => setIsViewStartGame(false)}
        onSubmitForm={onSubmitStartNewGame}
      />
    </Layout>
  );
};

export default Game;
