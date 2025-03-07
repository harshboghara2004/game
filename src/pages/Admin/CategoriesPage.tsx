import React, { useEffect, useState } from "react";
import { Plus, Users, GamepadIcon, X } from "lucide-react";
import CategoryGamesPage from "./CategoryGamesPage";
import { onValue, push, ref, set } from "firebase/database";
import { database } from "../../firebase";
import { Game } from "./GamesPage";
import Loader from "../../components/UI/Loader";

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
            className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${category.color} cursor-pointer hover:shadow-lg transition-shadow`}
            onClick={onClick}
        >
            <div className="mb-4">
                <h3 className="font-semibold text-lg">{category.name}</h3>
            </div>
            <div className="flex justify-between text-gray-600">
                <div className="flex items-center">
                    <GamepadIcon size={16} className="mr-2" />
                    <span>{category.games.length} Games</span>
                </div>
                <div className="flex items-center">
                    <Users size={16} className="mr-2" />
                    <span>
                        {/* {category.users} */}
                        Users
                    </span>
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
    // get all categorioes
    useEffect(() => {
        setIsLoading(true);
        const fetchGames = (): Promise<Game[]> => {
            return new Promise((resolve) => {
                const gamesRef = ref(database, "games");
                onValue(gamesRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const gameList: Game[] = Object.keys(data).map(
                            (key) => ({
                                id: key,
                                ...data[key],
                            })
                        );
                        resolve(gameList);
                    } else {
                        resolve([]);
                    }
                });
            });
        };

        const fetchCategories = async () => {
            try {
                const games = await fetchGames();
                const categoriesRef = ref(database, "categories");

                onValue(categoriesRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const categoryList: Category[] = Object.keys(data).map(
                            (key) => {
                                const categoryGames = games.filter(
                                    (game) =>
                                        game.gameCategory === data[key].name
                                );

                                return {
                                    id: key,
                                    name: data[key].name,
                                    image: data[key].image,
                                    color: colorOptions[
                                        Math.floor(
                                            Math.random() * colorOptions.length
                                        )
                                    ].value,
                                    games: categoryGames,
                                };
                            }
                        );
                        setCategories(categoryList);
                    } else {
                        setCategories([]);
                    }
                    setIsLoading(false);
                });
            } catch (error) {
                console.error("Error fetching categories or games:", error);
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory.name.trim()) {
            try {
                const newCategoryRef = push(ref(database, "categories"));
                await set(newCategoryRef, newCategory);
                alert("Category added successfully!");
                setNewCategory({ name: "", image: "" });
            } catch (error) {
                console.error("Failed to add category:", error);
                alert("Failed to add category. Please try again.");
            }
            setIsModalOpen(false);
        }
    };

    if (selectedCategory) {
        return (
            <CategoryGamesPage
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Categories
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
                >
                    <Plus size={20} className="mr-2" />
                    Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                Add New Category
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleAddCategory}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category image
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
                                    placeholder="Enter category image url"
                                    required
                                />
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Color
                                </label>
                                <select
                                    value={newCategory.color}
                                    onChange={(e) =>
                                        setNewCategory({
                                            ...newCategory,
                                            color: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {colorOptions.map((color) => (
                                        <option
                                            key={color.value}
                                            value={color.value}
                                        >
                                            {color.label}
                                        </option>
                                    ))}
                                </select>
                            </div> */}

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
