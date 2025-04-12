import GameDetails from "./GameDetails";


export default async function HistoryPage() {
    // const { data: initialData, count: initialTotal } = await fetchGames(1,10);

    return (<GameDetails initialData={[]} initialTotal={0} />)
}