import React, { useEffect, useState } from "react";
import { Link } from "lucide-react";
import Loader from "../../components/UI/Loader";
import { fetchGames } from "../../util/gamesActions";
import { GameCard } from "../../components/Cards/GameCard";

export interface Game {
    id: string;
    description: string;
    gameCategory: string;
    gameImage: string;
    gameTitle: string;
    gameUrl: string;
    slug: string;
    metaUrl: string;
    view: number;
}

function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // get all games
    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const { status, data } = await fetchGames();
                if (status === 200) {
                    setGames(data ?? []);
                }
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loader message="Loading games..." />;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Games
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} {...game} />
                ))}
            </div>
        </div>
    );
}

export default GamesPage;
