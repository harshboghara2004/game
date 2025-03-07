import React from "react";
import classes from "./GameWindow.module.css";
import GameWindowBottomBar from "./GameWindowBottomBar";

const GameWindow = ({ game }) => {
    const { gameUrl, gameTitle, whoCreated, gameImage, view } = game;
    return (
        <div className={classes["game-container"]}>
            <iframe
                src={gameUrl}
                title={gameTitle}
                className={classes["game-iframe"]}
                frameBorder="0"
            />
            {/* Game Title */}
            <GameWindowBottomBar
                title={gameTitle}
                whoCreated={whoCreated}
                image={gameImage}
                views={view}
            />
        </div>
    );
};

export default GameWindow;
