import React, { useEffect, useState } from "react";
import classes from "./GameWindowBottomBar.module.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { motion } from "framer-motion";
import {
    addGameToFavorites,
    isGameFavorited,
    removeGameFromFavorites,
} from "../../util/userActions";
import { auth } from "../../firebase";

const GameWindowBottomBar = ({
    gameId,
    title,
    whoCreated,
    image,
    views = 0,
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const uid = auth.currentUser?.uid;

    // fetch game favorite status
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            if (uid) {
                const favoriteStatus = await isGameFavorited(uid, gameId);
                setIsFavorite(favoriteStatus);
            }
        };
        fetchFavoriteStatus();
    }, [uid, gameId]);

    const handleToggleFavorite = async () => {
        if (!uid) {
            console.log("User not logged in");
            return;
        }

        if (isFavorite) {
            await removeGameFromFavorites(uid, gameId);
            setIsFavorite(false);
        } else {
            await addGameToFavorites(uid, gameId);
            setIsFavorite(true);
        }
    };

    return (
        <div className={classes["bottom-bar"]}>
            {/* Left Side: Image, Name, Who Created */}
            <div className={classes["left-section"]}>
                <img
                    src={image}
                    alt="Thumbnail"
                    className={classes["thumbnail"]}
                />
                <div className={classes["text-info"]}>
                    <span className={classes["name"]}>{title}</span>
                    <span className={classes["creator"]}>by {whoCreated}</span>
                </div>
            </div>

            {/* Right Side: Icon and Views Text */}
            <div className={classes["right-section"]}>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={classes["favorite-icon"]}
                    onClick={handleToggleFavorite}
                >
                    {isFavorite ? (
                        <MdFavorite className={classes["icon"]} color="red" />
                    ) : (
                        <MdFavoriteBorder className={classes["icon"]} />
                    )}
                    <span>{isFavorite ? "Unfavorite" : "Favorite"}</span>
                </motion.div>
                {/* <div className={classes["views-icon"]}>
                    <Eye className={classes["icon"]} />
                    <span>{views}</span>
                </div> */}
            </div>
        </div>
    );
};

export default GameWindowBottomBar;
