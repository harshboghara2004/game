import React, { useState, useEffect, useRef } from "react";
import classes from "./GameWindow.module.css";
import GameWindowBottomBar from "./GameWindowBottomBar";
import useIsMobile from "../../hooks/useIsMobile";

const GameWindow = ({ game }) => {
    const { id, gameUrl, gameTitle, whoCreated, gameImage, view } = game;
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const isMobile = useIsMobile();
    const gameRef = useRef(null);

    useEffect(() => {
        if (isMobile && isPlaying) {
            document.body.style.overflow = "hidden"; // Prevent scrolling on mobile
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup on unmount
        };
    }, [isMobile, isPlaying]);

    // Function to toggle fullscreen mode
    const toggleFullscreen = () => {
        if (!gameRef.current) return;

        if (!document.fullscreenElement) {
            gameRef.current.requestFullscreen().catch((err) => {
                console.error("Error entering fullscreen:", err);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className={classes["game-container"]} ref={gameRef}>
            {isMobile ? (
                !isPlaying ? (
                    <div className={classes["game-card"]}>
                        <img
                            src={gameImage}
                            alt={gameTitle}
                            className={classes["game-image"]}
                        />
                        <button
                            className={classes["play-button"]}
                            onClick={() => setIsPlaying(true)}
                        >
                            ▶ Play
                        </button>
                    </div>
                ) : (
                    <div className={classes["fullscreen-game"]}>
                        <iframe
                            src={gameUrl}
                            title={gameTitle}
                            className={classes["game-iframe"]}
                            frameBorder="0"
                            allowFullScreen
                        />
                        <GameWindowBottomBar
                            gameId={id}
                            title={gameTitle}
                            whoCreated={whoCreated}
                            image={gameImage}
                            views={view}
                            onFullscreen={toggleFullscreen} // Pass fullscreen function
                        />
                        <button
                            className={classes["close-button"]}
                            onClick={() => setIsPlaying(false)}
                        >
                            ✖
                        </button>
                    </div>
                )
            ) : (
                // Desktop View - Loads iframe normally
                <div
                    className={`${classes["desktop-game-wrapper"]} ${
                        isFullscreen ? classes["fullscreen-active"] : ""
                    }`}
                >
                    <iframe
                        src={gameUrl}
                        title={gameTitle}
                        className={classes["game-iframe"]}
                        frameBorder="0"
                        allowFullScreen
                    />
                    <GameWindowBottomBar
                        gameId={id}
                        title={gameTitle}
                        whoCreated={whoCreated}
                        image={gameImage}
                        views={view}
                        onFullscreen={toggleFullscreen} // Pass fullscreen function
                    />
                </div>
            )}
        </div>
    );
};

export default GameWindow;
