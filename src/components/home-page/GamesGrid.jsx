import React from "react";
import classes from "./GamesGrid.module.css";
import { motion } from "framer-motion";
import GameCard from "./GameCard";

const GamesGrid = ({ games, isHome = false }) => {
    return (
        <motion.ul animate={{ y: [10, 0] }} className={classes["game-grid"]}>
            {isHome && <div className={classes.dummy}></div>}
            {games.map((game, index) => (
                <GameCard game={game} index={index} isHome={isHome} />
            ))}
        </motion.ul>
    );
};

export default GamesGrid;
