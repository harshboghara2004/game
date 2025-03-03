import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

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
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("/gameData.json")
            .then((response) => response.json())
            .then((data) => setGames(data.games))
            .catch((error) =>
                console.error("Error fetching game data:", error)
            );
    }, []);

    const filteredGames = selectedCategory
        ? games.filter((game) => game.gameCategory === selectedCategory)
        : games;

    const handleCategoryClick = (category) => {
        navigate("/");
        setSelectedCategory(category);
    };

    // console.log(
    //     "Category IDs:",
    //     categories.map((category) => category.id)
    // );
    // console.log(
    //     "Game IDs:",
    //     games.map((game) => game.id)
    // );

    return (
        <div className="home-page">
            {/* Game Grid Section */}
            <ul className="game-grid">
                {filteredGames.map((game, index) => (
                    <li
                        key={game.id}
                        className={`game-card ${
                            index % 6 === 0 ? "large" : ""
                        }`}
                        onClick={() => navigate(`/game/${game.slug}`)}
                    >
                        <img
                            src={game.gameImage}
                            alt={game.gameTitle}
                            className="game-image"
                        />
                        <h3 className="game-title">{game.gameTitle}</h3>
                    </li>
                ))}
            </ul>

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
            <footer>
                <div className="footer-content">
                    <a href="#">About Korgi</a>
                    <a href="#">Privacy Statement</a>
                    <a href="#">Cookie Statement</a>
                    <a href="#">FAQ</a>
                    <a href="#">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
