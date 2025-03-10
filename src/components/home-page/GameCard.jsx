import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./GameCard.module.css";

const GameCard = ({ game, index, isHome }) => {
    const navigate = useNavigate();

    return (
        <motion.li
            className={`${classes["game-card"]} ${
                isHome && index > 0 && index % 9 === 0 ? classes.large : ""
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/game/${game.slug}`)}
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
