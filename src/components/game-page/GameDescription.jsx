import React from "react";
import classes from "./GameDescription.module.css";
import RenderHTML from "../../util/RenderHTML";

const GameDescription = ({ game }) => {
    // console.log(game);
    return (
        <div className={classes["game-description-section"]}>
            <div className={classes["description-text-area"]}>
                <span className={classes["description-category"]}>
                    {game.gameCategory}
                </span>
                <h2 className={classes["description-title"]}>
                    {game.gameTitle}
                </h2>
                <p className={classes["description-text"]}>
                    {" "}
                    <RenderHTML htmlString={game.description} />{" "}
                </p>
                <p className={classes["howToPlay"]}>
                    <span className="bold"> How to play: </span>{" "}
                    {game.howToPlay}
                </p>
                <p className={classes["whoCreated"]}>
                    <span className="bold"> Who created: </span>{" "}
                    {game.whoCreated}
                </p>
                <p className={classes["playForFree"]}>
                    <span className="bold"> Play for Free: </span>{" "}
                    {game.playForFree}
                </p>
                <p className={classes["mobileDesktop"]}>
                    <span className="bold"> Platform to Play: </span>{" "}
                    {game.mobileDesktop}
                </p>
            </div>
            <img
                src={game.gameImage}
                alt={game.gameTitle}
                className={classes["description-image"]}
            />
        </div>
    );
};

export default GameDescription;
