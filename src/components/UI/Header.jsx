import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
            <h1
                className={`${classes["header-title"]} ${classes["sour-gummy-text"]}`}
            >
                Korgi Games
            </h1>
        </header>
    );
};

export default Header;
