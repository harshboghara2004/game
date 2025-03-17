import React from "react";
import classes from "./PrivacyStatementPage.module.css";

const PrivacyStatementPage = () => {
    return (
        <div className={classes["privacy-page"]}>
            <div className={classes["privacy-container"]}>
                <h1 className={classes["privacy-title"]}>Privacy Statement</h1>
                <p className={classes["privacy-text"]}>
                    This is our privacy statement. We value your privacy.
                </p>
                <p className={classes["privacy-soon"]}>
                    Page under development
                </p>
                {/* Add your full privacy statement content here */}
            </div>
        </div>
    );
};

export default PrivacyStatementPage;
