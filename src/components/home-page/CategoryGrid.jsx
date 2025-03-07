import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CategoryGrid.module.css";
import { motion } from "framer-motion";

const CategoryGrid = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}) => {
    const navigate = useNavigate();

    // handle category select
    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
        navigate("/");
    };

    return (
        <motion.ul className={classes["category-grid"]}>
            {categories.map((category) => (
                <motion.li
                    key={category.id}
                    className={`${classes["category-card"]} ${
                        selectedCategory === category.name ? classes.active : ""
                    }`}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleCategoryClick(category.name)}
                >
                    <img src={category.image} alt="" />
                    {category.name}
                </motion.li>
            ))}
        </motion.ul>
    );
};

export default CategoryGrid;
