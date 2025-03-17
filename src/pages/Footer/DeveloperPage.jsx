import React from "react";
import classes from "./DeveloperPage.module.css";
import { Link } from "react-router-dom";

const DeveloperPage = () => {
    return (
        <div className={classes["developer-page"]}>
            <div className={classes["footer-content"]}>
                <h2>Korgi for Developers</h2>
                <p>
                    Are you a game developer? Join <strong>Korgi Games</strong>{" "}
                    and bring your games to millions of players worldwide! We
                    provide a powerful platform, seamless integration, and a
                    massive audience to help your game succeed. 🚀
                </p>
                <ul className={classes["developer-benefits"]}>
                    <li>
                        📈 <strong>Massive Reach:</strong> Get your game in
                        front of millions of active players.
                    </li>
                    <li>
                        ⚡ <strong>Seamless Integration:</strong> Easily
                        integrate with Korgi's API and publishing tools.
                    </li>
                    <li>
                        💰 <strong>Monetization Options:</strong> Earn revenue
                        through ads, in-game purchases, and premium features.
                    </li>
                    <li>
                        🎮 <strong>Game Performance Insights:</strong> Access
                        analytics to improve engagement and retention.
                    </li>
                </ul>
                <p>Ready to bring your game to the next level?</p>
                <Link to="/developers-join" className={classes["join-button"]}>
                    Join Now
                </Link>
                <p className={classes["contact-info"]}>
                    Have questions? Contact our developer support at
                    <a href="mailto:dev-support@korgigames.com">
                        {" "}
                        dev-support@korgigames.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default DeveloperPage;
