import React from "react";
import { ArrowLeft, Star, Users, Clock, Link } from "lucide-react";
import { Category } from "./CategoriesPage";
import { deleteCategory } from "../../util/categoryActions";
import NoResult from "../../components/UI/NoResult";
import { toast } from "react-toastify";

function CategoryGamesPage({
    categoryData,
    onBack,
    setUpdateTrigger,
}: {
    categoryData: Category;
    onBack: () => void;
    setUpdateTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    if (!categoryData) {
        return <div>Category not found</div>;
    }

    const handleDeleteCategory = async (categoryId: string) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (!confirmation) return;

        const response = await deleteCategory(categoryId);

        if (response.status === 200) {
            toast.success("Category deleted successfully!");
            setUpdateTrigger((prev) => !prev);
            onBack();
        } else {
            console.error("Failed to delete category:", response.error);
            toast.error(
                response.error || "Failed to delete category. Please try again."
            );
        }
    };

    return (
        <>
            {/* Header Section */}
            <div className="flex items-start sm:items-center justify-between mb-6 sm:mb-8">
                <div className="ml-10 lg:ml-0 flex items-center mb-4 sm:mb-0">
                    <button
                        onClick={onBack}
                        className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-all dark:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                        {categoryData.name} Games
                    </h1>
                </div>
                <button
                    className="text-white bg-red-500 p-3 sm:p-4 rounded-lg font-bold hover:bg-red-600 transition-all"
                    onClick={() => handleDeleteCategory(categoryData.id)}
                >
                    Delete
                </button>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {categoryData.games.length === 0 && <NoResult />}
                {categoryData.games.map((game) => (
                    <div
                        key={game.id}
                        className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 ${categoryData.color} transition-shadow hover:shadow-lg`}
                    >
                        <img
                            src={game.gameImage}
                            alt={game.gameTitle}
                            className="w-full h-40 sm:h-48 object-cover"
                        />
                        <div className="p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">
                                {game.gameTitle}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base mb-4">
                                {game.description}
                            </p>

                            {/* Game Details */}
                            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
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

                            {/* Play Game Link */}
                            {game.gameUrl && (
                                <a
                                    href={`/game/${game.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-all"
                                >
                                    <Link size={16} className="mr-1" />
                                    Play Game
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CategoryGamesPage;
