import { fetchGames } from "../../api/game";
import History from "./history";

export default async function HistoryPage() {
    const { data: initialData, count: initialTotal } = await fetchGames(1,10);

    return (<History initialData={initialData} initialTotal={initialTotal}/>)
}