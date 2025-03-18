import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const getUserByUid = async (uid) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return { status: 200, data: userDoc.data() };
        }
        return { status: 404, message: "User not found" };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

export const checkIsAdmin = async (uid) => {
    const result = await getUserByUid(uid);

    if (result.status === 200) {
        return { status: 200, isAdmin: result.data.isAdmin || false };
    }
    return result;
};

export const addGameToFavorites = async (uid, gameId) => {
    try {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
            favoriteGames: arrayUnion(gameId),
        });
        return { status: 200, message: "Game added to favorites" };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

export const removeGameFromFavorites = async (uid, gameId) => {
    try {
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
            favoriteGames: arrayRemove(gameId),
        });
        return { status: 200, message: "Game removed from favorites" };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

export const isGameFavorited = async (uid, gameId) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const favoriteGames = userDoc.data().favoriteGames || [];
            return favoriteGames.includes(gameId);
        }
        return false;
    } catch (error) {
        console.error("Error checking favorite status:", error);
        return false;
    }
};
