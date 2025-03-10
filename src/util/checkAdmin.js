import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const checkIsAdmin = async (emailId) => {
    try {
        const querySnapshot = await getDocs(collection(db, "admin"));
        const adminEmails = querySnapshot.docs.map((doc) => doc.data().email);

        if (adminEmails.includes(emailId)) {
            return { status: 200, isAdmin: true };
        }
        return { status: 200, isAdmin: false };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};
