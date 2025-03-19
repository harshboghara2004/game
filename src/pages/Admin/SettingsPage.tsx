import React, { ChangeEvent, useEffect, useState } from "react";
import { Save, Plus, Pencil, Trash2, X, Link } from "lucide-react";
import { Game } from "./GamesPage";
import Loader from "../../components/UI/Loader";
import {
    addGame,
    deleteGame,
    fetchGames,
    updateGame,
} from "../../util/gamesActions";
import { fetchCategories } from "../../util/categoryActions";
import ErrorPage from "../Error/ErrorPage";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from "@ckeditor/ckeditor5-core";

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
        howToPlay: "",
        whoCreated: "",
        playForFree: "",
        platformToPlay: "",
        view: 0,
    });

    console.log(
        ClassicEditor.builtinPlugins.map((plugin) => plugin.pluginName)
    );

    const [games, setGames] = useState<Game[]>([]);
    // console.log(games);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);

    // get all games and categories
    useEffect(() => {
        setIsLoading(true);

        fetchGames().then((response) => {
            if (response.status === 200) {
                setGames(response.data ?? []);
            } else {
                setError(response.error);
            }
        });

        fetchCategories().then((response) => {
            if (response.status === 200) {
                setCategories(response.data ?? []);
            } else {
                setError(response.error);
            }
            setIsLoading(false);
        });
    }, [updateTrigger]);

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

    const handleDescriptionChange = (_: unknown, editor: Editor) => {
        const data: string = editor.getData(); // Now correctly typed
        setFormData((prev) => ({ ...prev, description: data }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingGame) {
            const response = await updateGame(editingGame.id, formData);
            if (response.status === 200) {
                toast.success("Game updated successfully!");
            } else {
                toast.error("Failed to update game: " + response.error);
            }
        } else {
            // Add new game
            const response = await addGame(formData);
            if (response.status === 200) {
                toast.success("Game added successfully!");
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
            } else {
                toast.error("Failed to add game: " + response.error);
            }
        }
        setUpdateTrigger((prev) => !prev);
        handleCloseModal();
    };

    const handleEdit = (game: Game) => {
        setEditingGame(game);
        setFormData(game);
        setIsModalOpen(true);
    };

    const handleDelete = async (gameId: string) => {
        if (!gameId) {
            toast.error("Invalid game ID");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this game?"
        );
        if (!confirmDelete) return;

        const response = await deleteGame(gameId);
        if (response.status === 200) {
            toast.success("Game deleted successfully!");
        } else {
            toast.error(`Delete failed: ${response.error}`);
        }
        setUpdateTrigger((prev) => !prev);
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
        return <Loader message="Loading data..." />;
    } else if (error) {
        return <ErrorPage message={error} />;
    }

    const licenseKey = import.meta.env.VITE_LICENSE_KEY;

    return (
        <div className="relative">
            <h1 className="ml-10 lg:ml-0 text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Settings
            </h1>

            <div className="space-y-8">
                {/* General Settings Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
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
                    <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-0 justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold">
                            Game Management
                        </h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-all"
                        >
                            <Plus size={20} className="mr-2" />
                            Add Game
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Game URL
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
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
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={game.gameImage}
                                                    alt={game.gameTitle}
                                                    className="h-10 w-10 rounded-lg object-cover mr-3"
                                                />
                                                <span className="font-medium">
                                                    {game.gameTitle}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {game.gameCategory}
                                        </td>
                                        <td className="px-4 py-3 max-w-xs truncate">
                                            {game.description}
                                        </td>
                                        <td className="px-4 py-3">
                                            {game.gameUrl && (
                                                <a
                                                    href={`/game/${game.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-700 flex items-center transition-all"
                                                >
                                                    <Link
                                                        size={16}
                                                        className="mr-1"
                                                    />
                                                    Play Game
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-2">
                                            <button
                                                onClick={() => handleEdit(game)}
                                                className="text-blue-600 hover:text-blue-800 transition-all"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(game.id)
                                                }
                                                className="text-red-600 hover:text-red-800 transition-all"
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

                {/* Security Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                        Security
                    </h2>
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
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-all"
                >
                    <Save size={20} className="mr-2" />
                    Save Changes
                </button>
            </div>

            {/* Add/Edit Game Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg sm:text-xl font-semibold">
                                {editingGame ? "Edit Game" : "Add New Game"}
                            </h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-y-4 overflow-y-auto max-h-[75vh] p-2"
                        >
                            {/* Grid Layout for Responsive Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Game Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Game Title
                                    </label>
                                    <input
                                        type="text"
                                        name="gameTitle"
                                        value={formData.gameTitle || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Game Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Game Category
                                    </label>
                                    <select
                                        name="gameCategory"
                                        value={formData.gameCategory || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
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

                                {/* Game Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Game Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="gameImage"
                                        value={formData.gameImage || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Game URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Game URL
                                    </label>
                                    <input
                                        type="url"
                                        name="gameUrl"
                                        value={formData.gameUrl || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Full-width Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Game Description
                                </label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formData.description}
                                    onChange={handleDescriptionChange}
                                    config={{
                                        licenseKey: licenseKey,
                                        toolbar: [
                                            "undo",
                                            "redo",
                                            "|",
                                            "heading",
                                            "|",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strikethrough",
                                            "link",
                                            "bulletedList",
                                            "numberedList",
                                            "blockQuote",
                                        ],
                                        placeholder: "Description...",
                                    }}
                                />
                            </div>

                            {/* More Inputs with Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* How to Play */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        How to Play
                                    </label>
                                    <input
                                        type="text"
                                        name="howToPlay"
                                        value={formData.howToPlay || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Who Created */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Who Created
                                    </label>
                                    <input
                                        type="text"
                                        name="whoCreated"
                                        value={formData.whoCreated || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Play for Free */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Play for Free
                                    </label>
                                    <input
                                        type="text"
                                        name="playForFree"
                                        value={formData.playForFree || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Platform to Play */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Platform To Play
                                    </label>
                                    <input
                                        type="text"
                                        name="platformToPlay"
                                        value={formData.platformToPlay || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Views */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Views
                                    </label>
                                    <input
                                        type="number"
                                        name="view"
                                        value={formData.view || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-4 mt-4">
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
