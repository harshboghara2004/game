import React from "react";
import classes from "./SideBar.module.css";
import { motion } from "framer-motion";
import HomeCard from "../UI/HomeCard";
import GameCard from "../home-page/GameCard";

const SideBar = ({ games, className, addHome = false }) => {
    return (
        <motion.ul
            className={`${classes["game-sidebar"]} ${className}`}
            animate={{ y: [15, 0] }}
        >
            {addHome && <HomeCard />}
            {addHome && <div className={classes["dummy"]}></div>}
            {games.map((game) => (
                <GameCard game={game} />
            ))}
        </motion.ul>
    );
};

export default SideBar;
