"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { addGame } from "../../api/game";
import { addRound, updateBoard, updateRound } from "../../api/round";
import PrimaryButton from "../../components/Atoms/buttons/PrimaryButton";
import Board from "../../components/Organisms/board/Board";
import Layout from "../../components/Organisms/layout/Layout";
import ConfirmationModal from "../../components/Organisms/modal/ConfirmationModal";
import ModalForm from "../../components/Organisms/modal/ModalForm";
import { addApostrophe, isFirstLetterCapitalized } from "../../lib/helpers/helpers";
import { WINNING_COMBOS } from "../../lib/utils/constants/constants";
import StartNewGameFormContent from "./StartNewGameFormContent";
import { useToastContext } from "../../lib/utils/providers/ToastProvider";

const Game = () => {
  const { showToast } = useToastContext();
  const [isViewStartGame, setIsViewStartGame] = useState<boolean>(false);
  const [isShowBoard, setIsShowBoard] = useState<boolean>(false);
  const [isViewConfirmModal, setIsViewConfirmModal] = useState<boolean>(false);

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
      setWinner("draw");
      await updateRound(gameData.round_id, newBoard, null, "draw");
      setIsViewConfirmModal(true);
      return;
    } else if (result) {
      setWinner(result);
      await updateRound(gameData.round_id, newBoard, result, "completed");
      setIsViewConfirmModal(true);
      return;
    }

    await updateBoard(gameData.round_id, newBoard);
  };

  const onClickContinue = async () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
    setIsViewConfirmModal(false);

    const round = await addRound(gameData.game_id);
    setGameData({ ...gameData, round_id: round.round._id });
  };

  const onClickCancel = async () => {
    window.location.reload();
  };

  const handleChangeNewGameForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameData({ ...gameData, [e.target.id]: e.target.value });
  };
  const onSubmitStartNewGame = async (e: React.FormEvent) => {
    e.preventDefault();

    const { player_x, player_o } = gameData;

    // Check for duplicate names
    if (player_o === player_x) {
      showToast(
        "Player X and Player O cannot have the same name. Please enter distinct names.",
        "danger",
        5
      );
      return;
    }

    if (
      !isFirstLetterCapitalized(player_x) ||
      !isFirstLetterCapitalized(player_o)
    ) {
      showToast(
        "Each player name must start with a capital letter.",
        "danger",
        5
      );
      return;
    }
  

    const createGame = await addGame(player_x, player_o);

    if (createGame.success) {
      showToast("Game created. Enjoy!", "success");
      const round = await addRound(createGame.game._id);
      setGameData({
        ...gameData,
        game_id: createGame.game._id,
        round_id: round.round._id,
      });
      setIsViewStartGame(false);
      setIsShowBoard(true);
    }
  };

  const winnerName = winner === "X" ? gameData?.player_x : gameData?.player_o;
  const confirmationMessage =
    winner !== "draw" ? `Congrats ${winnerName}, you win!` : "It's a draw!";

  const renderTurn = useCallback(() => {
    if (winner) {
      return null;
    }

    const playerName =
      currentPlayer === "X"
        ? addApostrophe(gameData?.player_x)
        : addApostrophe(gameData?.player_o);

    return (
      <span>
        <strong>{playerName}</strong> turn
      </span>
    );
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
            {renderTurn()}
            <Board board={board} handleClick={handleClick} />
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
      <ConfirmationModal
        winner={winner ?? ""}
        isOpen={isViewConfirmModal}
        gameId={gameData.game_id}
        message={confirmationMessage}
        onCancelModalHandler={onClickCancel}
        onConfirmHandler={onClickContinue}
      />
    </Layout>
  );
};

export default Game;
