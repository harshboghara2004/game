import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SideBar.module.css";
import { motion } from "framer-motion";
import HomeCard from "../UI/HomeCard";

const SideBar = ({ games, className, addHome = false }) => {
    const navigate = useNavigate();

    return (
        <motion.ul
            className={`${classes["game-sidebar"]} ${className}`}
            animate={{ y: [15, 0] }}
        >
            {addHome && <HomeCard />}
            {addHome && <div className={classes["dummy"]}></div>}
            {games.map((game) => (
                <motion.li
                    layout
                    key={game.slug}
                    className={classes["game-sidebar-card"]}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(`/game/${game.slug}`)}
                >
                    <img
                        src={game.gameImage}
                        alt={game.gameTitle}
                        className={classes["game-sidebar-image"]}
                    />
                </motion.li>
            ))}
        </motion.ul>
    );
};

export default SideBar;
