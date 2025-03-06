import React, { useState } from "react";
import { update, ref } from "firebase/database";
import { database } from "../../../firebase";
import "../Forms.css";

const EditGameForm = ({ game, setEditing }) => {
    const [gameData, setGameData] = useState({
        description: game.description,
        gameCategory: game.gameCategory,
        gameImage: game.gameImage,
        gameTitle: game.gameTitle,
        gameUrl: game.gameUrl,
        slug: game.slug,
        metaUrl: game.metaUrl,
        view: game.view,
    });

    const handleGameChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };

    const handleUpdateGame = () => {
        if (!game.id) return;

        const gameRef = ref(database, `games/${game.id}`);
        update(gameRef, gameData)
            .then(() => {
                alert("Game updated successfully!");
                setEditing(null);
            })
            .catch((error) => console.error("Update failed: ", error));
    };

    const handleCancel = () => {
        setEditing((prevState) => null);
    };

    return (
        <div className="form-container">
            <h3>Update Game</h3>
            <input
                type="text"
                name="gameTitle"
                value={gameData.gameTitle}
                onChange={handleGameChange}
                placeholder="Game Title"
            />
            <input
                type="text"
                name="description"
                value={gameData.description}
                onChange={handleGameChange}
                placeholder="Description"
            />
            <input
                type="text"
                name="gameCategory"
                value={gameData.gameCategory}
                onChange={handleGameChange}
                placeholder="Category"
            />
            <input
                type="text"
                name="gameImage"
                value={gameData.gameImage}
                onChange={handleGameChange}
                placeholder="Image URL"
            />
            <input
                type="text"
                name="gameUrl"
                value={gameData.gameUrl}
                onChange={handleGameChange}
                placeholder="Game URL"
            />
            <input
                type="text"
                name="slug"
                value={gameData.slug}
                onChange={handleGameChange}
                placeholder="Slug"
            />
            <input
                type="text"
                name="metaUrl"
                value={gameData.metaUrl}
                onChange={handleGameChange}
                placeholder="Meta URL"
            />
            <input
                type="number"
                name="view"
                value={gameData.view}
                onChange={handleGameChange}
                placeholder="Views"
            />

            <button onClick={handleUpdateGame}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default EditGameForm;
