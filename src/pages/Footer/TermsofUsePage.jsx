import React from "react";
import classes from "./TermsOfUsePage.module.css";

const TermsOfUsePage = () => {
    return (
        <div className={classes["terms-page"]}>
            <div className={classes["terms-container"]}>
                <h1 className={classes["terms-title"]}>Terms of Use</h1>
                <p className={classes["terms-text"]}>
                    These are our terms of use. Please read them carefully.
                </p>
                <p className={classes["terms-soon"]}>Page under development</p>
                {/* Add your full terms of use content here */}
            </div>
        </div>
    );
};

export default TermsOfUsePage;
