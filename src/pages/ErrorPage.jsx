// NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";
import { motion } from "framer-motion";

const ErrorPage = ({ message = "Please try Again Later." }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };
    return (
        <div className="error-container">
            <h1 className="error-title">Error Occured!</h1>
            <p className="error-message">{message}</p>
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

export default ErrorPage;
