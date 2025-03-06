import React from "react";
import "./HomeCard.css";
import { FaHome, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeCard = () => {
    const navigate = useNavigate();

    return (
        <motion.nav whileHover={{ scale: 1.05 }} className="home-card">
            <h1 className="korgi-title">Korgi</h1>
            <div className="icon-container">
                <div className="home-icon">
                    <FaHome onClick={() => navigate("/")} />
                </div>
                <div className="search-icon">
                    <FaSearch />
                </div>
            </div>
        </motion.nav>
    );
};

export default HomeCard;
