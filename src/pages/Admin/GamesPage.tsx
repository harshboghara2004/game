import React, { useEffect, useState } from "react";
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
    howToPlay: string;
    whoCreated: string;
    playForFree: string;
    platformToPlay: string;
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
        <div className="">
            {/* Heading */}
            <div className="ml-10 lg:ml-0 flex flex-col md:flex-row justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    Games
                </h1>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                    <GameCard key={game.id} {...game} />
                ))}
            </div>
        </div>
    );
}

export default GamesPage;
