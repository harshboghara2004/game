import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css"

const GameCard = ({ game, index, isHome }) => {
    const navigate = useNavigate();

    return (
        <motion.li
            key={game.id || index}
            className={`game-card ${
                isHome && index > 0 && index % 9 === 0 ? "large" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/game/${game.slug}`)}
        >
            <div className="image-container">
                <img
                    src={game.gameImage}
                    alt={game.gameTitle}
                    className="game-image"
                />
                <h3 className="grid-game-title">{game.gameTitle}</h3>
            </div>
        </motion.li>
    );
};

export default GameCard;
