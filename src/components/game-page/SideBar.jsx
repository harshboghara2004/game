import React from "react";
import classes from "./SideBar.module.css";
import { motion } from "framer-motion";
import HomeCard from "../Cards/HomeCard";
import GameCard from "../home-page/GameCard";

const SideBar = ({
    games,
    className,
    addHome = false,
    setIsSearching = () => {},
}) => {
    return (
        <>
            {addHome && <HomeCard setIsSearching={setIsSearching} />}
            <motion.ul
                className={`${classes["game-sidebar"]} ${className}`}
                animate={{ y: [15, 0] }}
            >
                {addHome && <div className={classes["dummy"]}></div>}
                {games.map((game, index) => (
                    <GameCard
                        key={game.id || index}
                        index={index}
                        game={game}
                    />
                ))}
            </motion.ul>
        </>
    );
};

export default SideBar;
