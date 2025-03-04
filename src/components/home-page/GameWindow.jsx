import React from "react";
import "./GameWindow.css";

const GameWindow = ({ game }) => {
    const { gameUrl, gameTitle } = game;
    return (
        <div className="game-container">
            <iframe
                src={gameUrl}
                title={gameTitle}
                className="game-iframe"
                frameBorder="0"
            />
            {/* Game Title */}
            <h2 className="game-title">{gameTitle}</h2>
        </div>
    );
};

export default GameWindow;
