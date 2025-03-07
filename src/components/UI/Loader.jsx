import React from "react";
import { Atom } from "react-loading-indicators";
import classes from "./Loader.module.css";

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className={classes.loader}>
            <Atom
                color="#03045e"
                size="large"
                text={message}
                textColor=""
                speedPlus={-1}
            />
        </div>
    );
};

export default Loader;
