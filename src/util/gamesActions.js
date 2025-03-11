import { ref, get } from "firebase/database";
import { database } from "../firebase";

export const fetchGames = async () => {
    try {
        const dataRef = ref(database, "/games");
        const snapshot = await get(dataRef);

        if (!snapshot.exists()) {
            return { status: 404, data: null, error: "No games found." };
        }

        const gamesArray = Object.entries(snapshot.val()).map(([id, game]) => ({
            id, // Assigning the key as the id
            ...game,
        }));

        return { status: 200, data: gamesArray, error: null };
    } catch (error) {
        return { status: 500, data: null, error: error.message };
    }
};
