import React, { useState } from "react";
import { ref, remove } from "firebase/database";
import { database } from "../../../firebaseConfig";
import "../Section.css";
import AddNewCategory from "./AddNewCategory";
import EditCategoryForm from "./EditCategoryForm";

const CategorySection = ({ categories }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleNewCategory = () => {
        setShowForm((prevState) => true);
    };

    const handleEditClick = (category) => {
        setEditingCategory({
            id: category.id,
            name: category.name,
            description: category.description || "",
        });
    };

    // Delete Category
    const handleDeleteCategory = (categoryId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );
        if (!confirmDelete) return;
        console.log(categoryId);
        const categoryRef = ref(database, `/categories/${categoryId}`);
        remove(categoryRef)
            .then(() => {
                alert("Category deleted successfully!");
            })
            .catch((error) => console.error("Delete category failed: ", error));
    };

    return (
        <div className="section">
            {editingCategory !== null && (
                <EditCategoryForm
                    category={editingCategory}
                    setEditing={setEditingCategory}
                />
            )}
            {editingCategory === null && showForm && (
                <AddNewCategory setShowForm={setShowForm} />
            )}
            {editingCategory !== null || (showForm && <hr />)}
            <h3>
                Categories
                {editingCategory === null && !showForm && (
                    <button className="add-btn" onClick={handleNewCategory}>
                        Add Category
                    </button>
                )}
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEditClick(category)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDeleteCategory(category.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategorySection;
