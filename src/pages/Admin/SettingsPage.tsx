import React, { useEffect, useState } from "react";
import { Save, Plus, Pencil, Trash2, X, Link } from "lucide-react";
import { Game } from "./GamesPage";
import { database } from "../../firebase";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import Loader from "../../components/UI/Loader";

interface Category {
    id: string;
    name: string;
    image: string;
}

const SettingsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [formData, setFormData] = useState<Partial<Game>>({
        description: "",
        gameCategory: "",
        gameImage: "",
        gameTitle: "",
        gameUrl: "",
        slug: "",
        metaUrl: "",
        view: 0,
    });

    const [games, setGames] = useState<Game[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    // get data
    useEffect(() => {
        setIsLoading(true);
        const gamesRef = ref(database, "games");
        const categoriesRef = ref(database, "categories");
        // games
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
        // categories
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const categoryList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setCategories(categoryList);
            } else {
                setCategories([]);
            }
            setIsLoading(false);
        });
        setIsLoading(false);
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingGame) {
            // Update existing game
            const gameRef = ref(database, `games/${editingGame.id}`);
            // console.log(formData);
            update(gameRef, { ...formData })
                .then(() => {
                    alert("Game updated successfully!");
                    setEditingGame(null);
                })
                .catch((error) => console.error("Update failed: ", error));
        } else {
            // Add new game
            const newGameRef = push(ref(database, "games"));
            // console.log(formData);
            set(newGameRef, { ...formData, view: Number(formData.view) })
                .then(() => {
                    alert("Game added successfully!");
                    setFormData({
                        description: "",
                        gameCategory: "",
                        gameImage: "",
                        gameTitle: "",
                        gameUrl: "",
                        slug: "",
                        metaUrl: "",
                        view: 0,
                    });
                })
                .catch((error) => console.error("Add failed: ", error));
        }
        handleCloseModal();
    };

    const handleEdit = (game: Game) => {
        setEditingGame(game);
        setFormData(game);
        setIsModalOpen(true);
    };

    const handleDelete = async (gameId: string) => {
        if (!gameId) {
            alert("Invalid game ID");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this game?"
        );
        if (!confirmDelete) return;

        try {
            const gameRef = ref(database, `games/${gameId}`);
            await remove(gameRef);
            alert("Game deleted successfully!");
        } catch (error) {
            console.error("Delete failed: ", error);
            alert(`Delete failed: ${(error as Error).message}`);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingGame(null);
        setFormData({
            id: "", // Default numeric ID
            description: "",
            gameCategory: "",
            gameImage: "",
            gameTitle: "",
            gameUrl: "",
            slug: "",
            metaUrl: "",
            view: 0, // Default view count
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="relative">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Settings
            </h1>

            <div className="space-y-8">
                {/* General Settings Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        General Settings
                    </h2>
                    <form>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Platform Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue="Korgi Gaming Portal"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue="admin@korgiportal.com"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Game Management Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            Game Management
                        </h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
                        >
                            <Plus size={20} className="mr-2" />
                            Add Game
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Game URL
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {games.map((game) => (
                                    <tr
                                        key={game.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={game.gameImage} // Fixed: Use gameImage instead of image
                                                    alt={game.gameTitle} // Fixed: Use gameTitle instead of title
                                                    className="h-10 w-10 rounded-lg object-cover mr-3"
                                                />
                                                <span className="font-medium">
                                                    {game.gameTitle}
                                                </span>
                                                {/* Fixed */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {game.gameCategory}
                                        </td>
                                        {/* Fixed */}
                                        <td className="px-6 py-4">
                                            <p className="truncate max-w-md">
                                                {game.description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {game.gameUrl && (
                                                <a
                                                    href={game.gameUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-700 flex items-center"
                                                >
                                                    <Link
                                                        size={16}
                                                        className="mr-1"
                                                    />
                                                    Play Game
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => handleEdit(game)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(game.id)
                                                }
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Other Settings Sections */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Security</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-8">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-600"
                >
                    <Save size={20} className="mr-2" />
                    Save Changes
                </button>
            </div>

            {/* Add/Edit Game Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                {editingGame ? "Edit Game" : "Add New Game"}
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Game Title
                                </label>
                                <input
                                    type="text"
                                    name="gameTitle"
                                    value={formData.gameTitle || ""} // Fixed
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Game Category
                                </label>
                                <select
                                    name="gameCategory"
                                    value={formData.gameCategory || ""} // Fixed
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Game Image URL
                                </label>
                                <input
                                    type="url"
                                    name="gameImage"
                                    value={formData.gameImage || ""} // Fixed
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Game URL
                                </label>
                                <input
                                    type="url"
                                    name="gameUrl"
                                    value={formData.gameUrl || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/play-game"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Views
                                </label>
                                <input
                                    type="number"
                                    name="view"
                                    value={formData.view || ""} // Fixed
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    {editingGame ? "Update Game" : "Add Game"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
