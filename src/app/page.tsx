"use client";

import { redirect } from "next/navigation";
import PrimaryButton from "../components/Atoms/buttons/PrimaryButton";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-16 p-8 sm:p-20">
      <main className="flex flex-col items-center gap-5 pb-50">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/tictactoe_large.svg"
            alt="tictactoe-logo"
            width={500}
            height={0}
          />
        </motion.div>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <PrimaryButton width="300px" onClick={() => redirect("/game")}>
            Play Now
          </PrimaryButton>
        </motion.div>
      </main>
    </div>
  );
}
