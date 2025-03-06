import React, { useState } from "react";
import { ref, remove } from "firebase/database";
import { database } from "../../../firebase";
import "../Section.css";
import AddNewGame from "./AddNewGame";
import EditGameForm from "./EditGameForm";

const GameSection = ({ games }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingGame, setEditingGame] = useState(null);

    const handleNewGame = () => {
        setShowForm((prevState) => true);
    };

    // Delete Game
    const handleDeleteGame = (gameId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this game?"
        );
        if (!confirmDelete) return;

        const gameRef = ref(database, `games/${gameId}`);
        remove(gameRef)
            .then(() => {
                alert("Game deleted successfully!");
            })
            .catch((error) => {
                console.error("Delete failed: ", error);
                alert("Failed to delete the game. Check console for errors.");
            });
    };

    // Set game data for updating
    const handleEditGame = (game) => {
        setEditingGame({
            id: game.id,
            gameTitle: game.gameTitle,
            description: game.description,
            gameCategory: game.gameCategory,
            gameImage: game.gameImage,
            gameUrl: game.gameUrl,
            slug: game.slug,
            metaUrl: game.metaUrl,
            view: game.view,
        });
    };

    return (
        <div className="section">
            {editingGame !== null && (
                <EditGameForm game={editingGame} setEditing={setEditingGame} />
            )}
            {editingGame === null && showForm && (
                <AddNewGame setShowForm={setShowForm} />
            )}
            {editingGame !== null || (showForm && <hr />)}
            <h3>
                Games
                {editingGame === null && !showForm && (
                    <button className="add-btn" onClick={handleNewGame}>
                        Add Game
                    </button>
                )}
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>URL</th>
                        <th>Slug</th>
                        <th>Meta URL</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.gameTitle}</td>
                            <td>{game.description}</td>
                            <td>{game.gameCategory}</td>
                            <td>
                                <img
                                    src={game.gameImage}
                                    alt={game.gameTitle}
                                    className="game-img"
                                />
                            </td>
                            <td>
                                <a
                                    href={game.gameUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Play
                                </a>
                            </td>
                            <td>{game.slug}</td>
                            <td>
                                <a
                                    href={game.metaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Meta
                                </a>
                            </td>
                            <td>{game.view}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEditGame(game)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteGame(game.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameSection;
