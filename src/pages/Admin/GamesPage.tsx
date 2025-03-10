import React, { useEffect, useState } from "react";
import { Link } from "lucide-react";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import Loader from "../../components/UI/Loader";

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

function GameCard({
    id,
    slug,
    gameImage,
    gameUrl,
    gameTitle,
    gameCategory,
}: Game) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={gameImage}
                alt={gameTitle}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{gameTitle}</h3>
                <p className="text-gray-600 text-sm mb-2">
                    Category: {gameCategory}
                </p>
                {gameUrl && (
                    <a
                        href={`/game/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-700"
                    >
                        <Link size={16} className="mr-1" />
                        Play Game
                    </a>
                )}
            </div>
        </div>
    );
}

function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // get all games
    useEffect(() => {
        setIsLoading(true);
        const fetchGames = () => {
            const gamesRef = ref(database, "games");
            onValue(gamesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const gameList = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setGames(gameList);
                } else {
                    setGames([]);
                }
            });
            setIsLoading(false);
        };
        fetchGames();
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
