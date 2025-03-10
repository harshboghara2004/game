import React from "react";
import classes from "./HomeCard.module.css";
import { FaHome, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeCard = ({ setIsSearching }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
        }
    };

    const handleSearchClick = () => {
        // navigate("/search");
        console.log("search-click");
        setIsSearching(true);
    };

    return (
        <motion.nav
            whileHover={{ scale: 1.05 }}
            className={classes["home-card"]}
        >
            <h1 className={classes["korgi-title"]}>Korgi</h1>
            <div className={classes["icon-container"]}>
                <button
                    className={classes["home-icon"]}
                    onClick={handleHomeClick}
                >
                    <FaHome />
                </button>
                <button
                    className={classes["search-icon"]}
                    onClick={handleSearchClick}
                >
                    <FaSearch />
                </button>
            </div>
        </motion.nav>
    );
};

export default HomeCard;
