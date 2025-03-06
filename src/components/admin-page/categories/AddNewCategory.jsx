import React, { useState } from "react";
import "../Forms.css";
import { ref, push, set } from "firebase/database";
import { database } from "../../../firebase";

const AddNewCategory = ({ setShowForm }) => {
    const [categoryData, setCategoryData] = useState({
        name: "",
        description: "",
    });

    const handleCategoryChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    // Add New Category
    const handleAddCategory = () => {
        const newCategoryRef = push(ref(database, "/categories"));
        set(newCategoryRef, categoryData)
            .then(() => {
                alert("Category added successfully!");
                setCategoryData({
                    name: "", // Corrected state keys
                    description: "",
                });
            })
            .catch((error) => console.error("Add category failed: ", error));
    };

    const handleCancel = () => {
        setShowForm(false);
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
            <button onClick={handleAddCategory}>Add Category</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default AddNewCategory;
