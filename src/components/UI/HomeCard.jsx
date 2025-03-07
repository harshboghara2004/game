import React from "react";
import classes from "./HomeCard.module.css";
import { FaHome, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeCard = () => {
    const navigate = useNavigate();

    return (
        <motion.nav
            whileHover={{ scale: 1.05 }}
            className={classes["home-card"]}
        >
            <h1 className={classes["korgi-title"]}>Korgi</h1>
            <div className={classes["icon-container"]}>
                <div className={classes["home-icon"]}>
                    <FaHome onClick={() => navigate("/")} />
                </div>
                <div className={classes["search-icon"]}>
                    <FaSearch />
                </div>
            </div>
        </motion.nav>
    );
};

export default HomeCard;
