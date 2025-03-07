import React, { useState } from "react";
import { update, ref } from "firebase/database";
import { database } from "../../../firebase";
import classes from "./GameForm.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

     // change state to current entered value
    const handleGameChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };

    // change description to current entered value
    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setGameData({ ...gameData, description: data });
    };

    // update game
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

    // cancel to edit game
    const handleCancel = () => {
        setEditing((prevState) => null);
    };

    const licenseKey = process.env.REACT_APP_LICENSE_KEY;

    return (
        <div className="form-container">
            <h3>Update Game</h3>
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

            <button onClick={handleUpdateGame} className={classes.btn}>
                Update
            </button>
            <button onClick={handleCancel} className={classes.btn}>
                Cancel
            </button>
        </div>
    );
};

export default EditGameForm;
