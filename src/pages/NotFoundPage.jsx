// NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import { motion } from "framer-motion";

const NotFoundPage = ({ statusCode = 404, message = "Page Not Found" }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">{statusCode}</h1>
            <p className="not-found-message">{message}</p>
            <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleClick}
                className="home-link"
            >
                Go Back Home
            </motion.button>
        </div>
    );
};

export default NotFoundPage;
