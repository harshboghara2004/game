import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./GameCard.module.css";

const GameCard = ({ game, index, isHome }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/game/${game.slug}`);
    };

    return (
        <motion.li
            className={`${classes["game-card"]} ${
                window.innerWidth >= 768 &&
                isHome &&
                index > 0 &&
                index % 11 === 0
                    ? classes.large
                    : ""
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={handleCardClick}
        >
            <div className={classes["image-container"]}>
                <img
                    src={game.gameImage}
                    alt={game.gameTitle}
                    className={classes["game-image"]}
                />
                <h3 className={classes["grid-game-title"]}>{game.gameTitle}</h3>
            </div>
        </motion.li>
    );
};

export default GameCard;
