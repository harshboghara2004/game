// UploadGames.jsx
import React from "react";
import { ref, push } from "firebase/database";
import { database } from "../firebase";
import { games } from "../../public/data/gameData";

const UploadGames = () => {
    const uploadGames = async () => {
        try {
            const gamesRef = ref(database, "/games");
            games.forEach(async (game) => {
                await push(gamesRef, game); // Push with a unique random ID
            });
            alert("Games uploaded successfully!");
        } catch (error) {
            console.error("Error uploading games:", error);
            alert("Failed to upload games.");
        }
    };

    return (
        <div>
            <button
                onClick={uploadGames}
                className="p-2 bg-blue-500 text-white rounded-md"
            >
                Upload Games
            </button>
        </div>
    );
};

export default UploadGames;
