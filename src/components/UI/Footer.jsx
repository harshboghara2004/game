import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Footer.module.css";
import { motion } from "framer-motion";

const Footer = () => {
    const navigate = useNavigate();

    const handleLogoClick = (event) => {
        event.stopPropagation();
        console.log("here");
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className={classes.footer}>
            <div className={classes["footer-top"]}></div>
            <div className={classes["footer-container"]}>
                <div className={classes["footer-left"]}>
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        src="/korgi/Korgi.png"
                        alt="Korgi Logo"
                        onClick={handleLogoClick}
                        className={classes["footer-logo"]}
                    />
                    <p className={classes["footer-tagline"]}>
                        Let the world play
                    </p>
                </div>
                <div className={classes["footer-links-container"]}>
                    <div className={classes["footer-links"]}>
                        <Link
                            to="/about"
                            className={classes["footer-link"]}
                            onClick={scrollToTop}
                        >
                            About
                        </Link>

                        <Link
                            to="/privacy"
                            className={classes["footer-link"]}
                            onClick={scrollToTop}
                        >
                            Privacy Statement
                        </Link>
                        <Link
                            to="/terms"
                            className={classes["footer-link"]}
                            onClick={scrollToTop}
                        >
                            Terms of Use
                        </Link>
                        <Link
                            to="/contact"
                            className={classes["footer-link"]}
                            onClick={scrollToTop}
                        >
                            Contact
                        </Link>
                    </div>
                    <div className={classes["footer-links"]}>
                        <Link
                            to="/developers"
                            className={classes["footer-link"]}
                            onClick={scrollToTop}
                        >
                            Korgi for Developers
                        </Link>
                        <Link
                            to="/cookies"
                            className={classes["footer-link"]}
                            onClick={scrollToTop}
                        >
                            Cookie Statement
                        </Link>
                        <Link
                            to="/faq"
                            className={classes["footer-link"]}
                            onClick={scrollToTop}
                        >
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
