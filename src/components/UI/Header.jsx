import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="home-icon">
                <FaHome size={18} />
            </Link>
            <h1 className="header-title">Korgi Games</h1>
        </header>
    );
};

export default Header;
