import React from "react";
import classes from "./HomeCard.module.css";
import { FaHome, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeCard = ({ setIsSearching, widthValue = 150, heightValue = 150 }) => {
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

    const dimension = `w-[${widthValue}px] h-[${heightValue}px]`;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={classes["home-card"]}
            style={{ width: `${widthValue}px`, height: `${heightValue}px` }}
        >
            <div className={classes["korgi-title"]}>
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src="/korgi/Korgi.png"
                    alt="korgi logo"
                />
            </div>
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
        </motion.div>
    );
};

export default HomeCard;
