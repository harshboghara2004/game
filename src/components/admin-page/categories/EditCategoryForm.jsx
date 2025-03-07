import React, { useState } from "react";
import classes from "./CategoryForm.module.css";
import { ref, update } from "firebase/database";
import { database } from "../../../firebase";

const EditCategoryForm = ({ category, setEditing }) => {
    const [categoryData, setCategoryData] = useState({
        name: category.name,
        description: category.description,
    });

    // change state to current entered value
    const handleCategoryChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    // cancel to edit category
    const handleCancel = () => {
        setEditing((prevState) => null);
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
            <button onClick={handleUpdateCategory} className={classes.btn}>
                Update
            </button>
            <button onClick={handleCancel} className={classes.btn}>
                Cancel
            </button>
        </div>
    );
};

export default EditCategoryForm;
