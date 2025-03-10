import React, { useState, useEffect } from "react";
import classes from "./HomePage.module.css";
import GamesGrid from "../../components/home-page/GamesGrid";
import CategoryGrid from "../../components/home-page/CategoryGrid";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import Loader from "../../components/UI/Loader";
import HomeCard from "../../components/UI/HomeCard";
import SearchPage from "../Search/SearchPage";
import Modal from "../../components/UI/Modal";

const categories = [
    { id: "action", name: "Action", image: "/images/action.jpg" },
    {
        id: "sports_and_Racing",
        name: "Sports & Racing",
        image: "/images/sports_and_racing.png",
    },
    { id: "adventure", name: "Adventure", image: "/images/adventure.jpg" },
    { id: "strategy", name: "Strategy", image: "/images/strategy.png" },
    { id: "merge", name: "Merge", image: "/images/merge.png" },
    {
        id: "puzzle_and_Logic",
        name: "Puzzle & Logic",
        image: "/images/puzzle_and_logic.jpg",
    },
    { id: "arcade", name: "Arcade", image: "/images/arcade.jpg" },
];

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const dataRef = ref(database, "/games");

        const unsubscribe = onValue(dataRef, (snapshot) => {
            const gamesArray = Object.values(snapshot.val());
            setGames(gamesArray);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredGames = selectedCategory
        ? games.filter((game) => game.gameCategory === selectedCategory)
        : games;

    let gameContent;
    if (isLoading) {
        gameContent = <Loader message="Loading Games..." />;
    } else {
        gameContent = (
            <>
                <div className={classes["home-card"]}>
                    <HomeCard setIsSearching={setIsSearching} />
                </div>
                {/* Game Grid Section */}
                <GamesGrid games={filteredGames} isHome />

                {/* Category Grid Section */}
                <CategoryGrid
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </>
        );
    }

    return (
        <div className={classes["home-page"]}>
            {isSearching && <div className={classes.dimmedContent}></div>}
            <div className={classes["grid-container"]}>{gameContent}</div>
            {isSearching && (
                <Modal onClose={() => setIsSearching(false)}>
                    <SearchPage games={games} categories={categories} />
                </Modal>
            )}
        </div>
    );
};

export default HomePage;
