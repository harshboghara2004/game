import React, { useEffect } from "react";
import classes from "./GamesGrid.module.css";
import { motion } from "framer-motion";
import GameCard from "./GameCard";
import HomeCard from "../Cards/HomeCard";
import { shuffleArray } from "../../util/gamesActions";

const GamesGrid = ({
    games,
    selectedCategory = null,
    isHome = false,
    setIsSearching = () => {},
}) => {
    const shuffledGames = shuffleArray(games);
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [games]);

    return (
        <>
            {isHome && <HomeCard setIsSearching={setIsSearching} />}
            <motion.ul
                animate={{ y: [10, 0] }}
                className={classes["game-grid"]}
            >
                {isHome && <div className={classes.dummy}></div>}
                {selectedCategory && (
                    <div className={classes.categorySelected}>
                        <p>{selectedCategory} Games</p>
                    </div>
                )}
                {shuffledGames && shuffledGames.length === 0 && (
                    <div className={classes["no-games"]}>
                        <h2>Hmm, nothing’s coming up for that.</h2>
                        <p>
                            Try searching for something else or play one of
                            these great games.
                        </p>
                    </div>
                )}

                {shuffledGames.map((game, index) => (
                    <GameCard
                        key={game.id || index}
                        game={game}
                        index={index}
                        isHome={isHome}
                    />
                ))}
            </motion.ul>
        </>
    );
};

export default GamesGrid;
