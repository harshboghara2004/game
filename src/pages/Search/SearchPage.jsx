import React, { useEffect, useState } from "react";
import { FaHome, FaSearch, FaTimes } from "react-icons/fa";
import classes from "./SearchPage.module.css";
import GamesGrid from "../../components/home-page/GamesGrid";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = ({ games, categories, setIsSearching = () => {} }) => {
    // console.log(games);
    const navigate = useNavigate();
    const location = useLocation();
    const [filteredGames, setFilteredGames] = useState(games);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (searchText.length >= 3) {
            const updatedFilteredGames = games.filter(
                (game) =>
                    (selectedCategory
                        ? game.gameCategory === selectedCategory
                        : true) &&
                    game.gameTitle
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
            );
            setFilteredGames(updatedFilteredGames);
        } else if (selectedCategory) {
            const updatedFilteredGames = games.filter(
                (game) => game.gameCategory === selectedCategory
            );
            setFilteredGames(updatedFilteredGames);
        } else {
            setFilteredGames(games);
        }
    }, [searchText, selectedCategory, games]);

    const handleHomeClick = () => {
        if (location.pathname === "/") {
            setIsSearching(false);
        } else {
            navigate("/");
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory((prevState) =>
            prevState === null ? category : null
        );
    };

    const clearSearch = () => {
        setSearchText("");
        setFilteredGames(games);
    };

    return (
        <motion.div className={classes.container}>
            {/* Search Bar */}
            <div className={classes.searchBar}>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={handleHomeClick}
                >
                    <FaHome className={classes.logo} />
                </motion.button>
                <div className={classes.searchInputContainer}>
                    <input
                        type="text"
                        placeholder="Which game are you trying to find? (At least 3 characters)"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className={classes.searchInput}
                    />
                    {searchText && (
                        <FaTimes
                            className={classes.clearIcon}
                            onClick={clearSearch}
                        />
                    )}
                </div>
                <FaSearch className={classes.searchIcon} />
            </div>

            {/* Category List */}
            <div className={classes.categoryList}>
                {categories.map((category) => (
                    <motion.button
                        key={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                        whileHover={{ scale: 1.1 }}
                        className={`${classes.categoryButton} ${
                            selectedCategory === category.name
                                ? classes.active
                                : ""
                        }`}
                    >
                        {category.name}
                    </motion.button>
                ))}
            </div>

            {/* Game Grid or No Results Message */}
            <div className={classes.filteredGamesGrid}>
                {filteredGames.length > 0 ? (
                    <GamesGrid games={filteredGames} />
                ) : (
                    <div className={classes.noResults}>
                        <h2>Hmm, nothing’s coming up for that.</h2>
                        <p>
                            Try searching for something else or play one of
                            these great games.
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SearchPage;
