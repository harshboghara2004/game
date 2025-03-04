import React, { useState, useEffect } from "react";
import "./HomePage.css";
import GamesGrid from "../components/home-page/GamesGrid";
import CategoryGrid from "../components/home-page/CategoryGrid";

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

    useEffect(() => {
        fetch("/data/gameData.json")
            .then((response) => response.json())
            .then((data) => setGames(data.games))
            .catch((error) =>
                console.error("Error fetching game data:", error)
            );
    }, []);

    const filteredGames = selectedCategory
        ? games.filter((game) => game.gameCategory === selectedCategory)
        : games;

    return (
        <div className="home-page">
            {/* Game Grid Section */}
            <GamesGrid games={filteredGames} isHome />

            {/* Category Grid Section */}
            <CategoryGrid
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

        </div>
    );
};

export default HomePage;
