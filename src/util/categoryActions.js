import { ref, get } from "firebase/database";
import { database } from "../firebase";

export const fetchCategories = async () => {
    try {
        const dataRef = ref(database, "/categories");
        const snapshot = await get(dataRef);

        if (!snapshot.exists()) {
            return { status: 404, data: null, error: "No categories found." };
        }

        const categoriesArray = Object.entries(snapshot.val()).map(
            ([id, category]) => ({
                id,
                ...category,
            })
        );

        return { status: 200, data: categoriesArray, error: null };
    } catch (error) {
        return { status: 500, data: null, error: error.message };
    }
};
