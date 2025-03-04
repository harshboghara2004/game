import React, { useState } from "react";
import "../Forms.css";
import { ref, update } from "firebase/database";
import { database } from "../../../firebaseConfig";

const EditCategoryForm = ({ category, setEditing }) => {
    const [categoryData, setCategoryData] = useState({
        name: category.name,
        description: category.description,
    });

    const handleCancel = () => {
        setEditing((prevState) => null);
    };

    const handleCategoryChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    // Update Category
    const handleUpdateCategory = () => {
        if (!category.id) return;

        const categoryRef = ref(database, `categories/${category.id}`);
        update(categoryRef, categoryData)
            .then(() => {
                alert("Category updated successfully!");
                setEditing(null);
            })
            .catch((error) => console.error("Update category failed: ", error));
    };

    return (
        <div className="form-container">
            <input
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleCategoryChange}
                placeholder="Category Name"
            />
            <input
                type="text"
                name="description"
                value={categoryData.description}
                onChange={handleCategoryChange}
                placeholder="Category Description"
            />
            <button onClick={handleUpdateCategory}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default EditCategoryForm;
