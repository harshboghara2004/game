// UploadCategories.jsx
import React from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import { categories } from "../../public/data/categoryData";

const UploadCategories = () => {
    const uploadCategories = async () => {
        try {
            const categoriesRef = ref(database, "/categories");
            categories.forEach(async (category) => {
                await push(categoriesRef, category); // Push with a unique random ID
            });
            alert("Categories uploaded successfully!");
        } catch (error) {
            console.error("Error uploading categories:", error);
            alert("Failed to upload categories.");
        }
    };

    return (
        <div>
            <button
                onClick={uploadCategories}
                className="p-2 bg-green-500 text-white rounded-md"
            >
                Upload Categories
            </button>
        </div>
    );
};

export default UploadCategories;
