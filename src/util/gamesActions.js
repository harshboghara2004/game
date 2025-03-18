import { ref, get, push, set, update, remove } from "firebase/database";
import { database } from "../firebase";

export const fetchGames = async () => {
    try {
        const dataRef = ref(database, "/games");
        const snapshot = await get(dataRef);

        if (!snapshot.exists()) {
            return { status: 404, data: null, error: "No games found." };
        }

        const gamesArray = Object.entries(snapshot.val()).map(
            ([key, game]) => ({
                ...game,
                id: key,
            })
        );

        return { status: 200, data: gamesArray, error: null };
    } catch (error) {
        return { status: 500, data: null, error: error.message };
    }
};

export const getGameById = async (gameId) => {
    try {
        const gameRef = ref(database, `/games/${gameId}`);
        const snapshot = await get(gameRef);

        if (snapshot.exists()) {
            return { status: 200, game: snapshot.val() };
        } else {
            return { status: 404, message: "Game not found" };
        }
    } catch (error) {
        console.error("Error fetching game:", error);
        return { status: 500, message: error.message };
    }
};

export const addGame = async (gameData) => {
    try {
        const newGameRef = push(ref(database, "/games"));
        await set(newGameRef, { ...gameData, view: Number(gameData.view) });

        return { status: 200, error: null };
    } catch (error) {
        console.error("Add failed:", error);
        return {
            status: 500,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

export const updateGame = async (gameId, updatedData) => {
    try {
        const gameRef = ref(database, `/games/${gameId}`);
        await update(gameRef, updatedData);

        return { status: 200, error: null };
    } catch (error) {
        console.error("Update failed:", error);
        return {
            status: 500,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};

export const deleteGame = async (gameId) => {
    try {
        if (!gameId) {
            throw new Error("Invalid game ID");
        }

        const gameRef = ref(database, `/games/${gameId}`);
        await remove(gameRef);

        return { status: 200, error: null };
    } catch (error) {
        console.error("Delete failed:", error);
        return {
            status: 500,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
};
