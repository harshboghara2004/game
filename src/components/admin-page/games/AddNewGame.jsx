import React, { useState } from "react";
import { update, ref, set, push } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../Forms.css";

const AddNewGame = ({ setShowForm }) => {
    const [gameData, setGameData] = useState({
        description: "",
        gameCategory: "",
        gameImage: "",
        gameTitle: "",
        gameUrl: "",
        slug: "",
        metaUrl: "",
        view: 0,
    });
    const [editingGameId, setEditingGameId] = useState(null);

    const handleGameChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setGameData({ ...gameData, description: data });
    };

    const handleAddOrUpdateGame = () => {
        if (editingGameId) {
            handleUpdateGame();
            return;
        }

        const newGameRef = push(ref(database, "games"));
        set(newGameRef, { ...gameData, view: Number(gameData.view) })
            .then(() => {
                alert("Game added successfully!");
                setGameData({
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
    };

    const handleUpdateGame = () => {
        if (!editingGameId) return;

        const gameRef = ref(database, `games/${editingGameId}`);
        update(gameRef, gameData)
            .then(() => {
                alert("Game updated successfully!");
                setEditingGameId(null);
                setGameData({
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
            .catch((error) => console.error("Update failed: ", error));
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const licenseKey = process.env.REACT_APP_LICENSE_KEY;

    return (
        <div className="form-container">
            <h3>{editingGameId ? "Update Game" : "Add New Game"}</h3>
            <input
                type="text"
                name="gameTitle"
                value={gameData.gameTitle}
                onChange={handleGameChange}
                placeholder="Game Title"
            />

            <CKEditor
                editor={ClassicEditor}
                data={gameData.description}
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

            <button onClick={handleAddOrUpdateGame}>
                {editingGameId ? "Save Changes" : "Add Game"}
            </button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default AddNewGame;
