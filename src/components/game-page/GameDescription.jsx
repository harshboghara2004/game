import React from "react";
import "./GameDescription.css";

const GameDescription = ({ game }) => {
    return (
        <div className="game-description-section">
            <div className="description-text-area">
                <span className="description-category">
                    {game.gameCategory}
                </span>
                <h2 className="description-title">{game.gameTitle}</h2>
                <p className="description-text"> {game.description} </p>
                <p className="description-howToPlay">
                    <b> How to play: </b> {game.howToPlay}
                </p>
                <p className="description-whoCreated">
                    <b> Who created: </b> {game.whoCreated}
                </p>
                <p className="description-playForFree">
                    <b> Play for Free: </b> {game.playForFree}
                </p>
                <p className="description-mobileDesktop">
                    <b> Platform to Play: </b> {game.mobileDesktop}
                </p>
            </div>
            <img
                src={game.gameImage}
                alt={game.gameTitle}
                className="description-image"
            />
        </div>
    );
};

export default GameDescription;
