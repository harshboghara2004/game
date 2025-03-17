import React from "react";
import classes from "./CookiesPage.module.css";

const CookiesPage = () => {
    return (
        <div className={classes["cookie-statement-wrapper"]}>
            <div className={classes["cookie-statement-page"]}>
                <h1>Cookie Policy 🍪</h1>
                <p>
                    Korgi Games uses cookies to improve your experience on our
                    website. By continuing to use our site, you agree to our use
                    of cookies as described in this policy.
                </p>
                <h2>What Are Cookies?</h2>
                <p>
                    Cookies are small text files that are stored on your device
                    when you visit a website. They help us recognize your device
                    and remember your preferences.
                </p>
                <h2>Why Do We Use Cookies?</h2>
                <ul>
                    <li>
                        ✅ <strong>Essential Cookies:</strong> Required for
                        website functionality.
                    </li>
                    <li>
                        📊 <strong>Analytics Cookies:</strong> Help us
                        understand how users interact with our platform.
                    </li>
                    <li>
                        🎯 <strong>Advertising Cookies:</strong> Used to display
                        relevant ads.
                    </li>
                    <li>
                        🛠️ <strong>Customization Cookies:</strong> Store your
                        preferences for a better experience.
                    </li>
                </ul>
                <h2>How Can You Manage Cookies?</h2>
                <p>
                    You can adjust your cookie preferences in your browser
                    settings. Most browsers allow you to:
                </p>
                <ul>
                    <li>🔒 Block cookies completely</li>
                    <li>🔄 Delete stored cookies</li>
                    <li>⚙️ Manage preferences for individual sites</li>
                </ul>
                <p>
                    For more details on how we use cookies, please read our
                    <a href="/privacy-policy"> Privacy Policy</a>.
                </p>
                <div className="cookie-buttons">
                    <button className="accept-button">
                        Accept All Cookies
                    </button>
                    <button className="manage-button">
                        Manage Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiesPage;
