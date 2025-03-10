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
                <div className={classes["description-text"]}>
                    {" "}
                    <RenderHTML htmlString={game.description} />{" "}
                </div>
                <p className={classes["howToPlay"]}>
                    <span className={classes.bold}> How to play: </span>{" "}
                    {game.howToPlay}
                </p>
                <p className={classes["whoCreated"]}>
                    <span className={classes.bold}> Who created: </span>{" "}
                    {game.whoCreated}
                </p>
                <p className={classes["playForFree"]}>
                    <span className={classes.bold}> Play for Free: </span>{" "}
                    {game.playForFree}
                </p>
                <p className={classes["mobileDesktop"]}>
                    <span className={classes.bold}> Platform to Play: </span>{" "}
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
