import React, { useState } from "react";
import classes from "./CategoryForm.module.css";
import { ref, push, set } from "firebase/database";
import { database } from "../../../firebase";

const AddNewCategory = ({ setShowForm }) => {
    const [categoryData, setCategoryData] = useState({
        name: "",
        description: "",
    });

    // change state to current entered value
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

    // Cancel to add new category
    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className={classes["form-container"]}>
            <input
                type="text"
                name="name"
                value={categoryData.name}
                onChange={handleCategoryChange}
                placeholder="Category Name"
                className={classes["input-text"]}
            />
            <input
                type="text"
                name="description"
                value={categoryData.description}
                onChange={handleCategoryChange}
                placeholder="Category Description"
                className={classes["input-text"]}
            />
            <button onClick={handleAddCategory} className={classes.btn}>Add Category</button>
            <button onClick={handleCancel} className={classes.btn}>Cancel</button>
        </div>
    );
};

export default AddNewCategory;
