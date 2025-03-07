import React from "react";
import { ArrowLeft, Star, Users, Clock, Link } from "lucide-react";
import { Category } from "./CategoriesPage";

function CategoryGamesPage({
    categoryData,
    onBack,
}: {
    categoryData: Category;
    onBack: () => void;
}) {
    if (!categoryData) {
        return <div>Category not found</div>;
    }

    return (
        <div>
            <div className="flex items-center mb-8">
                <button
                    onClick={onBack}
                    className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors dark:text-white dark:hover:bg-white dark:hover:text-black "
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {categoryData.name} Games
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryData.games.map((game) => (
                    <div
                        key={game.id}
                        className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${categoryData.color}`}
                    >
                        <img
                            src={game.gameImage}
                            alt={game.gameTitle}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">
                                {game.gameTitle}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {game.description}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                    <Star
                                        size={16}
                                        className="text-yellow-400 mr-1"
                                    />
                                    <span>4.5</span>
                                </div>
                                <div className="flex items-center">
                                    <Users size={16} className="mr-1" />
                                    <span>10</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock size={16} className="mr-1" />
                                    <span>11:11</span>
                                </div>
                            </div>

                            {game.gameUrl && (
                                <a
                                    href={game.gameUrl}
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
                ))}
            </div>
        </div>
    );
}

export default CategoryGamesPage;
