import React, { useEffect, useState } from "react";
import classes from "./GameWindowBottomBar.module.css";
import {
    MdFavorite,
    MdFavoriteBorder,
    MdFullscreen,
    MdFullscreenExit,
} from "react-icons/md";
import { motion } from "framer-motion";
import {
    addGameToFavorites,
    isGameFavorited,
    removeGameFromFavorites,
} from "../../util/userActions";
import { auth } from "../../firebase";
import useIsMobile from "../../hooks/useIsMobile";

const GameWindowBottomBar = ({
    gameId,
    title,
    whoCreated,
    image,
    views = 0,
    onFullscreen, // Fullscreen function from GameWindow
}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const uid = auth.currentUser?.uid;
    const isMobile = useIsMobile(); // Check if mobile
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Fetch game favorite status
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

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", fullscreenChangeHandler);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                fullscreenChangeHandler
            );
        };
    }, []);

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

            {/* Right Side: Buttons */}
            <div className={classes["right-section"]}>
                {/* Favorite button (only if user is logged in) */}
                {uid && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={classes["favorite-icon"]}
                        onClick={handleToggleFavorite}
                    >
                        {isFavorite ? (
                            <MdFavorite
                                className={classes["icon"]}
                                color="red"
                            />
                        ) : (
                            <MdFavoriteBorder className={classes["icon"]} />
                        )}
                        <span>{isFavorite ? "Unfavorite" : "Favorite"}</span>
                    </motion.div>
                )}

                {/* Fullscreen button (only on desktop) */}
                {!isMobile && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={classes["fullscreen-icon"]}
                        onClick={onFullscreen}
                    >
                        {isFullscreen ? (
                            <>
                                <MdFullscreenExit className={classes["icon"]} />
                                <span>Exit Fullscreen</span>
                            </>
                        ) : (
                            <>
                                <MdFullscreen className={classes["icon"]} />
                                <span>Fullscreen</span>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GameWindowBottomBar;
