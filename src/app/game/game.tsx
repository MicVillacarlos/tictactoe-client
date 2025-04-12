"use client";
import React, { useCallback, useState } from "react";
import Layout from "../../components/Organisms/layout/Layout";
import Image from "next/image";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import StartNewGameFormContent from "./StartNewGameFormContent";
import Board from "../../components/Organisms/board/Board";
import { addApostrophe } from "../../lib/helpers/helpers";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import { addGame } from "../../api/game";
import { addRound, updateBoard, updateRound } from "../../api/round";
import { WINNING_COMBOS } from "../../lib/utils/constants/constants";

const Game = () => {
  const [isViewStartGame, setIsViewStartGame] = useState<boolean>(false);
  const [isShowBoard, setIsShowBoard] = useState<boolean>(false);

  const [board, setBoard] = useState(Array(9).fill(""));
  const [gameData, setGameData] = useState({
    round_id: "",
    game_id: "",
    player_x: "",
    player_o: "",
  });
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (board: string[]): string | null => {
    const winnerLine = WINNING_COMBOS.find(
      ([a, b, c]) => board[a] && board[a] === board[b] && board[b] === board[c]
    );

    if (winnerLine) return board[winnerLine[0]];
    return board.every((cell) => cell) ? "draw" : null;
  };

  const handleClick = async (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    const result = checkWinner(newBoard);
    if (result === "draw") {
      setWinner("Draw");
      await updateRound(gameData.round_id, newBoard, null, 'draw');
      return;
    } else if (result) {
      setWinner(result);
      await updateRound(gameData.round_id, newBoard, result, 'completed');
      return;
    }
    await updateBoard(gameData.round_id, newBoard);
  };

  const onClickContinue = async() => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);

    const round = await addRound(gameData.game_id);
    setGameData({ ...gameData, round_id: round.round._id });
  };

  const handleChangeNewGameForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameData({ ...gameData, [e.target.id]: e.target.value });
  };

  const onSubmitStartNewGame = async (e: React.FormEvent) => {
    e.preventDefault();

    const createGame = await addGame(gameData.player_x, gameData.player_o);

    if (createGame.success) {
      const round = await addRound(createGame.game._id);
      setGameData({ ...gameData, game_id: createGame.game._id, round_id: round.round._id });
      setIsViewStartGame(false);
      setIsShowBoard(true);
    }
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
              width={350}
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
            {winner && (
              <PrimaryButton width="200px" onClick={() => onClickContinue()}>
                Continue
              </PrimaryButton>
            )}
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
