import React, { useState, useEffect } from "react";
import "./HomePage.css";
import GamesGrid from "../../components/home-page/GamesGrid";
import CategoryGrid from "../../components/home-page/CategoryGrid";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase";
import Loader from "../../components/UI/Loader";
import HomeCard from "../../components/UI/HomeCard";

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
        <div className="home-page">
            <HomeCard />
            {gameContent}
        </div>
    );
};

export default HomePage;
