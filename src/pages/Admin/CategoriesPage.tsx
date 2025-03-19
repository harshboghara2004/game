import React, { useEffect, useState } from "react";
import { Plus, Users, GamepadIcon, X } from "lucide-react";
import CategoryGamesPage from "./CategoryGamesPage";
import { Game } from "./GamesPage";
import Loader from "../../components/UI/Loader";
import { fetchGames } from "../../util/gamesActions";
import {
    addCategory,
    deleteCategory,
    fetchCategories,
} from "../../util/categoryActions";
import { toast } from "react-toastify";

export interface Category {
    id: string;
    name: string;
    image: string;
    color: string;
    games: Game[];
}

function CategoryCard({
    category,
    onClick,
}: {
    category: Category;
    onClick: () => void;
}) {
    return (
        <div
            className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md p-4 sm:p-6 border-l-4 ${category.color} cursor-pointer hover:shadow-lg transition-all duration-300`}
            onClick={onClick}
        >
            {/* Title */}
            <div className="mb-4 flex justify-between items-center">
                <h3 className="font-semibold text-lg">{category.name}</h3>
            </div>

            {/* Details Section */}
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 flex-wrap gap-2">
                {/* Games Count */}
                <div className="flex items-center">
                    <GamepadIcon size={16} className="mr-2" />
                    <span>{category.games.length} Games</span>
                </div>

                {/* Users Count */}
                <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    <span>Users</span>
                </div>
            </div>
        </div>
    );
}

function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: "",
        image: "",
    });

    const colorOptions = [
        { label: "Blue", value: "border-blue-500" },
        { label: "Green", value: "border-green-500" },
        { label: "Yellow", value: "border-yellow-500" },
        { label: "Purple", value: "border-purple-500" },
        { label: "Red", value: "border-red-500" },
        { label: "Indigo", value: "border-indigo-500" },
        { label: "Pink", value: "border-pink-500" },
        { label: "Orange", value: "border-orange-500" },
    ];

    const [categories, setCategories] = useState<Category[]>([]);
    // console.log(categories);

    // get all categorioes
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                // Fetch games
                const gamesResponse = await fetchGames();
                if (gamesResponse.status !== 200)
                    throw new Error(gamesResponse.error);
                const games: Game[] = gamesResponse.data || [];

                // Fetch categories
                const categoriesResponse = await fetchCategories();
                if (categoriesResponse.status !== 200)
                    throw new Error(categoriesResponse.error);
                const fetchedCategories: Category[] =
                    categoriesResponse.data || [];

                // console.log(categoriesResponse);

                // Process categories to include games
                const processedCategories = fetchedCategories.map(
                    (category) => ({
                        ...category,
                        color: colorOptions[
                            Math.floor(Math.random() * colorOptions.length)
                        ].value,
                        games: games.filter(
                            (game: Game) => game.gameCategory === category.name
                        ),
                    })
                );

                setCategories(processedCategories);
            } catch (error) {
                console.error("Error fetching categories or games:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [updateTrigger]);

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("here");
        const response = await addCategory(newCategory);

        if (response.status === 201) {
            toast.success("Category added successfully!");
            setNewCategory({ name: "", image: "" });
            setIsModalOpen(false);
            setUpdateTrigger((prev) => !prev);
        } else {
            console.error("Failed to add category:", response.error);
            toast.error(
                response.error || "Failed to add category. Please try again."
            );
        }
    };

    if (selectedCategory) {
        return (
            <CategoryGamesPage
                setUpdateTrigger={setUpdateTrigger}
                categoryData={selectedCategory}
                onBack={() => setSelectedCategory(null)}
            />
        );
    }

    // console.log(categories);
    if (isLoading) {
        return <Loader message="Loading Categories..." />;
    }

    return (
        <div>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
                <h1 className="ml-10 lg:ml-0 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Categories
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-all duration-300 mt-4 sm:mt-0"
                >
                    <Plus size={20} className="mr-2" />
                    Add Category
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {categories.map((category, index) => (
                    <CategoryCard
                        key={index}
                        category={category}
                        onClick={() => setSelectedCategory(category)}
                    />
                ))}
            </div>

            {/* Add Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg sm:text-xl font-semibold">
                                Add New Category
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-all duration-300"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleAddCategory}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={newCategory.name}
                                    onChange={(e) =>
                                        setNewCategory({
                                            ...newCategory,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category Image
                                </label>
                                <input
                                    type="text"
                                    value={newCategory.image}
                                    onChange={(e) =>
                                        setNewCategory({
                                            ...newCategory,
                                            image: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter category image URL"
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoriesPage;
