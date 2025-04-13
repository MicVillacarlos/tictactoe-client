import React, { useEffect } from "react";
import TextInput from "../../components/Atoms/input/TextInput";
import Text2xl from "../../components/Atoms/text/Text2xl";

interface StartNewGameFormContentProps {
  handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  playerValue: { player_o: string; player_x: string };
}

const StartNewGameFormContent = ({
  handleChangeForm,
  playerValue,
}: StartNewGameFormContentProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="flex w-full justify-center mt-5 mb-8">
        <Text2xl>Please input your names.</Text2xl>
      </div>
      <TextInput
        placeholder={"Player 'O' Name"}
        id={"player_o"}
        handleChange={handleChangeForm}
        value={playerValue.player_o}
        required
      />
      <TextInput
        placeholder={"Player 'X' Name"}
        id={"player_x"}
        handleChange={handleChangeForm}
        value={playerValue.player_x}
        required
      />
    </>
  );
};

export default StartNewGameFormContent;
