import React from "react";
import { useNavigate } from "react-router-dom";
import "./GamesGrid.css"

const GamesGrid = ({ games, isHome = false }) => {
    const navigate = useNavigate();
    return (
        <ul className="game-grid">
            {games.map((game, index) => (
                <li
                    key={game.id}
                    className={`game-card ${
                        isHome && index % 6 === 0 ? "large" : ""
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
    );
};

export default GamesGrid;
