import React from "react";
import classes from "./NoResult.module.css";

const NoResult = ({
    title = "Hmm, nothing’s coming up for that.",
    description = "Try searching for something else or play one of these great games.",
}) => {
    const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    return (
        <div
            className={`${classes.noResultPage} ${
                isDarkMode ? classes.dark : ""
            }`}
        >
            <h2 className={classes.noResultHeader}>{title}</h2>
            <p className={classes.noResultText}>{description}</p>
        </div>
    );
};

export default NoResult;
