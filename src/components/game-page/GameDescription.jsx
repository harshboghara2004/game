import React from "react";
import "./GameDescription.css";
import RenderHTML from "./RenderHTML";

const GameDescription = ({ game }) => {
    console.log(game);
    return (
        <div className="game-description-section">
            <div className="description-text-area">
                <span className="description-category">
                    {game.gameCategory}
                </span>
                <h2 className="description-title">{game.gameTitle}</h2>
                <p className="description-text">
                    {" "}
                    <RenderHTML htmlString={game.description} />{" "}
                </p>
                <p className="howToPlay">
                    <span className="bold"> How to play: </span>{" "}
                    {game.howToPlay}
                </p>
                <p className="whoCreated">
                    <span className="bold"> Who created: </span>{" "}
                    {game.whoCreated}
                </p>
                <p className="playForFree">
                    <span className="bold"> Play for Free: </span>{" "}
                    {game.playForFree}
                </p>
                <p className="mobileDesktop">
                    <span className="bold"> Platform to Play: </span>{" "}
                    {game.mobileDesktop}
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
