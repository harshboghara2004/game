import React from "react";
import { Eye } from "lucide-react";
import classes from "./GameWindowBottomBar.module.css";

const GameWindowBottomBar = ({ title, whoCreated, image, views = 0 }) => {
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
                <Eye className={classes["icon"]} />
                <span className={classes["views"]}>{views}</span>
            </div>
        </div>
    );
};

export default GameWindowBottomBar;
