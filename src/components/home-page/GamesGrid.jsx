import React from "react";
import "./GamesGrid.css";
import { motion } from "framer-motion";
import HomeCard from "../UI/HomeCard";
import GameCard from "./GameCard";

const GamesGrid = ({ games, isHome = false }) => {
    return (
        <motion.ul animate={{ y: [10, 0] }} className="game-grid">
            {isHome && <div className="dummy"></div>}
            {games.map((game, index) => (
                <GameCard game={game} index={index} isHome={isHome} />
            ))}
        </motion.ul>
    );
};

export default GamesGrid;
