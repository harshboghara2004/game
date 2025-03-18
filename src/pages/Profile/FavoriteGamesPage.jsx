import React, { useEffect, useState } from "react";
import NoResult from "../../components/UI/NoResult";
import { getGameById } from "../../util/gamesActions";
import { GameCard } from "../../components/Cards/GameCard";
import Loader from "../../components/UI/Loader";

const FavoriteGamesPage = ({ gameIds = [] }) => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchFavoriteGames = async () => {
            setIsLoading(true);
            try {
                if (gameIds.length === 0) {
                    setGames([]);
                    return;
                }
                const gamePromises = gameIds.map((gameId) =>
                    getGameById(gameId)
                );
                const gameObjects = (await Promise.all(gamePromises)).filter(
                    Boolean
                );
                const gamesList = gameObjects.map(({ game }) => game);
                setGames(gamesList);
            } catch (error) {
                console.error("Error fetching favorite games:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteGames();
    }, [gameIds]);

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Favorite Games
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading && <Loader message="Loading games..." />}
                {!isLoading && games.length === 0 && (
                    <NoResult title="There is No Favorite games till now." />
                )}
                {!isLoading &&
                    games.length > 0 &&
                    games.map((game, index) => (
                        <GameCard key={game.id || index} {...game} />
                    ))}
            </div>
        </>
    );
};

export default FavoriteGamesPage;
