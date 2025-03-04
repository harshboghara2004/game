import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryGrid.css";

const CategoryGrid = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}) => {
    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        navigate("/");
    };
    return (
        <ul className="category-grid">
            {categories.map((category) => (
                <li
                    key={category.id}
                    className={`category-card ${
                        selectedCategory === category.name ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                >
                    <img src={category.image} alt="" />
                    {category.name}
                </li>
            ))}
        </ul>
    );
};

export default CategoryGrid;
