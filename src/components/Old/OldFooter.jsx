import React from "react";
import classes from "./OldFooter.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const footerLinks = [
    { title: "About Korgi", link: "/about" },
    { title: "Privacy Statement", link: "/privacy-policy" },
    { title: "Cookie Statement", link: "/cookie" },
    { title: "FAQ", link: "/faq" },
    { title: "Contact", link: "/contact" },
];

const OldFooter = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes["footer-content"]}>
                {footerLinks.map((element, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        className={classes["footer-item"]}
                    >
                        <Link to={element.link} key={index}>
                            <p className={classes["footer-text"]}>
                                {element.title}
                            </p>
                        </Link>
                    </motion.li>
                ))}
            </div>
        </footer>
    );
};

export default OldFooter;
