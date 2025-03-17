import React from "react";
import classes from "./TermsofUsePage.module.css";

function TermsOfUsePage() {
    return (
        <div className={classes["terms-of-use-wrapper"]}>
            <div className={classes["terms-of-use-page"]}>
                <h1>Terms of Use</h1>
                <p>
                    Welcome to Korgi Games! Please read our Terms of Use
                    carefully before using our platform.
                </p>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using Korgi Games, you agree to be bound by
                    these Terms of Use, our Privacy Policy, and any other
                    applicable policies. If you do not agree, please do not use
                    our website.
                </p>
                <h2>2. User Conduct</h2>
                <p>While using Korgi Games, you agree to:</p>
                <ul>
                    <li>Use the platform for lawful purposes only.</li>
                    <li>
                        Not engage in any form of hacking, cheating, or
                        unauthorized access.
                    </li>
                    <li>
                        Respect other users and avoid offensive or harmful
                        behavior.
                    </li>
                    <li>
                        Not use automated bots or scripts to manipulate the
                        platform.
                    </li>
                </ul>
                <h2>3. Intellectual Property</h2>
                <p>
                    All content on Korgi Games, including games, text, graphics,
                    and logos, is protected by copyright and intellectual
                    property laws. Unauthorized reproduction or distribution is
                    prohibited.
                </p>
                <h2>4. Third-Party Links & Ads</h2>
                <p>
                    Korgi Games may contain links to third-party websites or
                    advertisements. We are not responsible for the content,
                    policies, or security of these external sites.
                </p>
                <h2>5. Limitation of Liability</h2>
                <p>
                    Korgi Games is provided "as is" without any warranties. We
                    are not responsible for any damages or losses resulting from
                    your use of our platform.
                </p>
                <h2>6. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate your access to
                    Korgi Games if you violate these Terms of Use or engage in
                    harmful activities.
                </p>
                <h2>7. Changes to Terms</h2>
                <p>
                    We may update these Terms of Use at any time. Continued use
                    of Korgi Games after updates constitutes acceptance of the
                    new terms.
                </p>
                <h2>8. Contact Us</h2>
                <p>
                    If you have any questions regarding our Terms of Use, please
                    contact us at:
                    <a href="mailto:hello@korgigames.com">
                        {" "}
                        hello@korgigames.com
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

export default TermsOfUsePage;
