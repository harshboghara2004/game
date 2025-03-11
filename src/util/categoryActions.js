import { ref, get, push, set, remove } from "firebase/database";
import { database } from "../firebase";

export const fetchCategories = async () => {
    try {
        const dataRef = ref(database, "/categories");
        const snapshot = await get(dataRef);

        if (!snapshot.exists()) {
            return { status: 404, data: null, error: "No categories found." };
        }

        const categoriesArray = Object.entries(snapshot.val()).map(
            ([key, data]) => {
                // console.log(key, data);
                return { ...data, id: key };
            }
        );

        return { status: 200, data: categoriesArray, error: null };
    } catch (error) {
        return { status: 500, data: null, error: error.message };
    }
};

export const addCategory = async (categoryData) => {
    console.log(categoryData);
    if (!categoryData.name.trim()) {
        return { status: 400, error: "Category name cannot be empty." };
    }

    try {
        const newCategoryRef = push(ref(database, "/categories"));
        await set(newCategoryRef, categoryData);

        return {
            status: 201,
            data: { id: newCategoryRef.key, ...categoryData },
            error: null,
        };
    } catch (error) {
        return { status: 500, data: null, error: error.message };
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const categoryRef = ref(database, `/categories/${categoryId}`);
        await remove(categoryRef);

        return {
            status: 200,
            message: "Category deleted successfully.",
            error: null,
        };
    } catch (error) {
        return { status: 500, message: null, error: error.message };
    }
};
