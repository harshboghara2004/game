import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

const SideBar = ({ games, className }) => {
    const navigate = useNavigate();
    return (
        <div className={`game-sidebar ${className}`}>
            {games.map((game) => (
                <div
                    key={game.slug}
                    className="game-card"
                    onClick={() => navigate(`/game/${game.slug}`)}
                >
                    <img
                        src={game.gameImage}
                        alt={game.gameTitle}
                        className="game-image"
                    />
                </div>
            ))}
        </div>
    );
};

export default SideBar;
