import { fetchRounds } from "../../../api/round";
import GameDetails from "./GameDetails";

export default async function GameDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: initialData, count: initialTotal } = await fetchRounds(
    id,
    1,
    10
  );

  return (
    <GameDetails
      initialData={initialData}
      initialTotal={initialTotal}
      gameId={id}
    />
  );
}
