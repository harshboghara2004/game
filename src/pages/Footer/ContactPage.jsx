import React from "react";
import classes from "./ContactPage.module.css"; // Import CSS module

const ContactPage = () => {
    return (
        <div className={classes.contactPage}>
            <div className={classes.contactContainer}>
                <h1 className={classes.contactTitle}>Get in touch ✉️</h1>

                <p className={classes.contactText}>
                    Have a question about Korgi Games?
                </p>

                <p className={classes.contactText}>
                    We’d love to hear from you! 🤗
                </p>

                <p className={classes.contactText}>
                    Send us a message and we’ll get back to you as soon as
                    possible:
                    <br />
                    <a
                        href="mailto:hello@korgigames.com"
                        className={classes.contactEmail}
                    >
                        hello@korgigames.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ContactPage;
