import React, { useEffect, useState } from "react";
import classes from "./RedirectCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaCircleUser } from "react-icons/fa6";

const RedirectCard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    console.log(user);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const handleLoginBtnClick = () => {
        navigate("/login");
    };

    const handleProfileBtnClick = () => {
        navigate("/profile");
    };

    return (
        <div className={classes.redirectCard}>
            <div className={classes.redirectContainer}>
                {user ? (
                    <>
                        <div className={classes.arrowIcon}>
                            <FaCircleUser />
                        </div>
                        <p className={classes.redirectCardText}>Go to your</p>
                        <motion.button
                            className={classes.loginBtn}
                            onClick={handleProfileBtnClick}
                            whileHover={{ scale: 1.05 }}
                        >
                            Profile
                        </motion.button>
                        <p className={classes.redirectCardText}>Page</p>
                    </>
                ) : (
                    <>
                        <div className={classes.arrowIcon}>
                            <FaArrowAltCircleRight />
                        </div>
                        <motion.button
                            className={classes.loginBtn}
                            onClick={handleLoginBtnClick}
                            whileHover={{ scale: 1.05 }}
                        >
                            Login
                        </motion.button>
                        <p className={classes.redirectCardText}>
                            to unlock exciting features
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default RedirectCard;
