import { fetchRounds } from "../../../api/round";
import GameDetails from "./GameDetails";

interface ParamsType {
  params: {
    id: string;
  };
}

export default async function GameDetailsPage({ params }: ParamsType) {
  const { id } = params;
  const { data: initialData, count: initialTotal } = await fetchRounds(
    id,
    1,
    10
  );

  return <GameDetails initialData={initialData} initialTotal={initialTotal} gameId={id} />;
}