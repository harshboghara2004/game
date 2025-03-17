import React from "react";
import classes from "./GamesGrid.module.css";
import { motion } from "framer-motion";
import GameCard from "./GameCard";
import HomeCard from "../UI/HomeCard";

const GamesGrid = ({
    games,
    selectedCategory = null,
    isHome = false,
    setIsSearching = () => {},
}) => {
    return (
        <motion.ul animate={{ y: [10, 0] }} className={classes["game-grid"]}>
            {isHome && <div className={classes.dummy}></div>}
            {isHome && (
                <HomeCard
                    setIsSearching={setIsSearching}
                    widthValue={162}
                    heightValue={135}
                />
            )}
            {selectedCategory && (
                <div className={classes.categorySelected}>
                    <p>{selectedCategory} Games</p>
                </div>
            )}
            {games && games.length === 0 && (
                <div className={classes["no-games"]}>
                    <h2>Hmm, nothing’s coming up for that.</h2>
                    <p>
                        Try searching for something else or play one of these
                        great games.
                    </p>
                </div>
            )}

            {games.map((game, index) => (
                <GameCard
                    key={game.id || index}
                    game={game}
                    index={index}
                    isHome={isHome}
                />
            ))}
        </motion.ul>
    );
};

export default GamesGrid;
