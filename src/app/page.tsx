"use client";
import { redirect } from "next/navigation";
import PrimaryButton from "../components/Atoms/buttons/PrimaryButton";
import SecondaryButton from "../components/Atoms/buttons/SecondaryButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[10px] row-start-2 items-center sm:items-start">
        <PrimaryButton onClick={() => redirect("/game")}>
          Play Now
        </PrimaryButton>
        <SecondaryButton onClick={() => redirect("/game")}>
          Game History
        </SecondaryButton>
      </main>
    </div>
  );
}
