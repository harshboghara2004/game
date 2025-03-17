import { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import GamesGrid from "../../components/home-page/GamesGrid";
import CategoryGrid from "../../components/home-page/CategoryGrid";
import Loader from "../../components/UI/Loader";
import SearchPage from "../Search/SearchPage";
import Modal from "../../components/UI/Modal";
import { motion } from "framer-motion";
import { fetchGames } from "../../util/gamesActions";
import { fetchCategories } from "../../util/categoryActions";
import ErrorPage from "../Error/ErrorPage";
import { useLocation } from "react-router-dom";
import RedirectCard from "../../components/UI/RedirectCard";

const HomePage = () => {
    const location = useLocation();
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    // console.log(games);
    // console.log(categories);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    // handle category select from about page
    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
        }
    }, [location.state]);

    // get all games and categories
    useEffect(() => {
        setIsLoading(true);

        fetchGames().then((response) => {
            if (response.status === 200) {
                setGames(response.data);
            } else {
                setError(response.error);
            }
        });

        fetchCategories().then((response) => {
            if (response.status === 200) {
                setCategories(response.data);
            } else {
                setError(response.error);
            }
            setIsLoading(false);
        });
    }, []);

    const filteredGames = selectedCategory
        ? games.filter((game) => game.gameCategory === selectedCategory)
        : games;

    let gameContent;
    if (isLoading) {
        gameContent = <Loader message="Loading Games..." />;
    } else if (error) {
        gameContent = <ErrorPage message={error} />;
    } else {
        gameContent = (
            <div className={classes["grid-container"]}>
                <RedirectCard />
                {/* Game Grid Section */}
                <GamesGrid
                    selectedCategory={selectedCategory}
                    games={filteredGames}
                    isHome
                    setIsSearching={setIsSearching}
                />

                {/* Category Grid Section */}
                <CategoryGrid
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
        );
    }

    return (
        <div className={classes["home-page"]}>
            {isSearching && (
                <motion.div
                    className={classes.dimmedContent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }} // Matches the SearchPage animation
                />
            )}
            <div className={classes["grid-container"]}>{gameContent}</div>
            {isSearching && (
                <Modal onClose={() => setIsSearching(false)}>
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }} // Start off-screen (left)
                        animate={{ x: "0%", opacity: 1 }} // Slide in to view
                        exit={{ x: "-100%", opacity: 0 }} // Slide out when closing
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            type: "spring",
                        }} // Smooth transition
                    >
                        <SearchPage
                            key="search-home"
                            games={games}
                            categories={categories}
                            setIsSearching={setIsSearching}
                        />
                    </motion.div>
                </Modal>
            )}
        </div>
    );
};

export default HomePage;
