import React from 'react';
import './CategoryBanner.css'; // Import the CSS file

const CategoryBanner = ({ selectedCategory }) => {
    if (!selectedCategory) {
        return null; // Do not display banner with there's no class
    }

    return (
        <div className="category-banner">
            {selectedCategory}
        </div>
    );
};

export default CategoryBanner;