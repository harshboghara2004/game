import React from "react";
import NoResult from "../../components/UI/NoResult";

const FavoriteGamesPage = ({ games = [] }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Favorite Games
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {games.length === 0 && (
                    <NoResult title="There is No Favorite games till now." />
                )}
                {games.map((game) => (
                    <GameCard key={game.id} {...game} />
                ))}
            </div>
        </>
    );
};

export default FavoriteGamesPage;
