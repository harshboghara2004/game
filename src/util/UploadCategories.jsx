// UploadCategories.jsx
import React from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";

const categories = [
    { id: "action", name: "Action", image: "/images/action.jpg" },
    {
        id: "sports_and_Racing",
        name: "Sports & Racing",
        image: "/images/sports_and_racing.png",
    },
    { id: "adventure", name: "Adventure", image: "/images/adventure.jpg" },
    { id: "strategy", name: "Strategy", image: "/images/strategy.png" },
    { id: "merge", name: "Merge", image: "/images/merge.png" },
    {
        id: "puzzle_and_Logic",
        name: "Puzzle & Logic",
        image: "/images/puzzle_and_logic.jpg",
    },
    { id: "arcade", name: "Arcade", image: "/images/arcade.jpg" },
];

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
