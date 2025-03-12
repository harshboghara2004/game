import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes["footer-top"]}></div>
            <div className={classes["footer-container"]}>
                <div className={classes["footer-left"]}>
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        src="/korgi/Korgi.png"
                        alt="Korgi Logo"
                        className={classes["footer-logo"]}
                    />
                    <p className={classes["footer-tagline"]}>
                        Let the world play
                    </p>
                </div>
                <div className={classes["footer-links-container"]}>
                    <div className={classes["footer-links"]}>
                        <Link to="/about" className={classes["footer-link"]}>
                            About
                        </Link>
                        <Link to="/jobs" className={classes["footer-link"]}>
                            Jobs
                        </Link>
                        <Link to="/privacy" className={classes["footer-link"]}>
                            Privacy Statement
                        </Link>
                        <Link to="/terms" className={classes["footer-link"]}>
                            Terms of Use
                        </Link>
                        <Link to="/contact" className={classes["footer-link"]}>
                            Contact
                        </Link>
                    </div>
                    <div className={classes["footer-links"]}>
                        <Link
                            to="/developers"
                            className={classes["footer-link"]}
                        >
                            Korgi for Developers
                        </Link>
                        <Link to="/kids" className={classes["footer-link"]}>
                            Korgi Kids
                        </Link>
                        <Link
                            to="/cookie-policy"
                            className={classes["footer-link"]}
                        >
                            Cookie Statement
                        </Link>
                        <Link to="/faq" className={classes["footer-link"]}>
                            FAQ
                        </Link>
                    </div>
                </div>
                <div className={classes["footer-right"]}>
                    <img
                        src="/images/usa-eng-logo.webp"
                        alt="Language"
                        className={classes["footer-flag"]}
                    />
                </div>
                <div className={classes["footer-bottom"]}>
                    <p>
                        © {new Date().getFullYear()} Korgi. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
