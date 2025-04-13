"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Game } from "../../../lib/types";
import { getGame } from "../../../api/game";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import SecondaryButton from "../../Atoms/buttons/SecondaryButton";

interface ModalPropsType {
  isOpen: boolean;
  message: string;
  onCancelModalHandler: () => void;
  onConfirmHandler: () => void;
  gameId: string;
  winner: string;
}

const ConfirmationModal = (props: ModalPropsType) => {
  const [game, setGame] = useState<Game | null>(null);
  const {
    isOpen,
    onCancelModalHandler,
    onConfirmHandler,
    message,
    gameId,
    winner,
  } = props;

  const fetchData = async () => {
    const data = await getGame(gameId);
    setGame(data.game);
  };
  useEffect(() => {
    if (isOpen && gameId) {
      fetchData();
    }
  }, [isOpen, gameId]);

  const status = useMemo(() => {
    if (!game) return;

    const { playerX, playerO, rounds, draws } = game;

    if (playerX.score === playerO.score) {
      return (
        <div className="text-center text-base mb-8">
          <p>Nobody is leading, both scores are {playerX.score}.</p>
          <p>Total rounds played: {rounds}</p>
        </div>
      );
    }

    if (playerO.score > playerX.score) {
      const pointDifference = playerO.score - playerX.score;
      const playerOLosses = rounds! - draws! - playerO.score;
      const playerXLosses = rounds! - draws! - playerX.score;
      return (
        <div className="text-center text-base mb-8">
          <p>
            {playerO.name} is leading by {pointDifference}.
          </p>
          <p>
            {playerO.name} - {playerO.score}W, {playerOLosses}L
          </p>
          <p>
            {playerX.name} - {playerX.score}W, {playerXLosses}L
          </p>
          <p>Total rounds played: {rounds}</p>
        </div>
      );
    }

    const pointDifference = playerX.score - playerO.score;
    const playerXLosses = rounds! - draws! - playerX.score;
    const playerOLosses = rounds! - draws! - playerO.score;
    return (
      <div className="text-center text-base mb-8">
        <p>
          {playerX.name} is leading by {pointDifference}.
        </p>
        <p>
          {playerX.name} - {playerX.score}W, {playerXLosses}L
        </p>
        <p>
          {playerO.name} - {playerO.score}W, {playerOLosses}L
        </p>
        <p>Total rounds played: {rounds}</p>
      </div>
    );
  }, [game]);

  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        isOpen ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-black bg-black/40`}
    >
      <div
        className={`relative w-full max-h-full max-w-md`}
      >
        <div className="relative rounded-lg shadow-sm bg-white text-black p-7 flex flex-col items-center">
          <p className="text-4xl font-bold my-2">
            {winner !== "draw" ? "🎉" : "😐"}
          </p>
          <p className="text-xl font-semibold mb-8">{message}</p>
          {status}
          <div className="flex flex-col w-full gap-2">
            <PrimaryButton onClick={onConfirmHandler}>CONTINUE</PrimaryButton>
            <SecondaryButton onClick={onCancelModalHandler}>
              STOP
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
