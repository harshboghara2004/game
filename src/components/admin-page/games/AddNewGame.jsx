import React, { useState } from "react";
import { update, ref, set, push } from "firebase/database";
import { database } from "../../../firebase";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classes from "./GameForm.module.css";

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

    // change state to current entered value
    const handleGameChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };

    // change description to current entered value
    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setGameData({ ...gameData, description: data });
    };

    // add or update game click
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

    // update game
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

    // cancel to add new game
    const handleCancel = () => {
        setShowForm(false);
    };

    const licenseKey = process.env.REACT_APP_LICENSE_KEY;

    return (
        <div className={classes["form-container"]}>
            <h3>{editingGameId ? "Update Game" : "Add New Game"}</h3>
            <input
                type="text"
                name="gameTitle"
                value={gameData.gameTitle}
                onChange={handleGameChange}
                placeholder="Game Title"
                className={classes["input-text"]}
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
                className={classes["input-text"]}
            />
            <input
                type="text"
                name="gameImage"
                value={gameData.gameImage}
                onChange={handleGameChange}
                placeholder="Image URL"
                className={classes["input-text"]}
            />
            <input
                type="text"
                name="gameUrl"
                value={gameData.gameUrl}
                onChange={handleGameChange}
                placeholder="Game URL"
                className={classes["input-text"]}
            />
            <input
                type="text"
                name="slug"
                value={gameData.slug}
                onChange={handleGameChange}
                placeholder="Slug"
                className={classes["input-text"]}
            />
            <input
                type="text"
                name="metaUrl"
                value={gameData.metaUrl}
                onChange={handleGameChange}
                placeholder="Meta URL"
                className={classes["input-text"]}
            />
            <input
                type="number"
                name="view"
                value={gameData.view}
                onChange={handleGameChange}
                placeholder="Views"
                className={classes["input-number"]}
            />

            <button onClick={handleAddOrUpdateGame} className={classes.btn}>
                {editingGameId ? "Save Changes" : "Add Game"}
            </button>
            <button onClick={handleCancel} className={classes.btn}>
                Cancel
            </button>
        </div>
    );
};

export default AddNewGame;
