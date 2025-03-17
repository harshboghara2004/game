import { doc, getDoc } from "firebase/firestore";
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
