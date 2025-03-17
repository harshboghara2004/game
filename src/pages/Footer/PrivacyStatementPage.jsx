import React from "react";
import classes from "./PrivacyStatementPage.module.css";

function PrivacyStatementPage() {
    return (
        <div className={classes["privacy-statement-wrapper"]}>
          <div className={classes["privacy-statement-page"]}>
              <h1>Privacy Statement</h1>
              <p>Last Updated: March 2025</p>
              <p>
                  At Korgi Games, we are committed to protecting your privacy.
                  This Privacy Statement explains how we collect, use, and
                  safeguard your information while using our platform.
              </p>
              <h2>1. Information We Collect</h2>
              <p>
                  We strive to collect as little personal data as possible.
                  However, we may collect:
              </p>
              <ul>
                  <li>
                      Anonymous usage data (e.g., pages visited, time spent, game
                      interactions).
                  </li>
                  <li>
                      Device and browser information for optimizing user
                      experience.
                  </li>
                  <li>Basic non-personalized data for analytics purposes.</li>
              </ul>
              <h2>2. How We Use Your Information</h2>
              <p>The data we collect is used to:</p>
              <ul>
                  <li>Improve website performance and game recommendations.</li>
                  <li>Analyze usage trends and enhance user experience.</li>
                  <li>Ensure security and prevent fraudulent activities.</li>
              </ul>
              <h2>3. Cookies and Tracking Technologies</h2>
              <p>
                  Korgi Games uses cookies and similar tracking technologies to
                  personalize your experience. These include essential cookies for
                  website functionality and optional cookies for analytics.
              </p>
              <p>
                  You can manage or disable cookies through your browser settings.
                  Note that disabling cookies may impact certain features of our
                  website.
              </p>
              <h2>4. Third-Party Services</h2>
              <p>
                  We may use third-party services (e.g., Google Analytics,
                  advertising networks) to enhance your experience. These services
                  may collect non-personally identifiable data. Please refer to
                  their respective privacy policies for more information.
              </p>
              <h2>5. Data Security</h2>
              <p>
                  We take data security seriously and implement industry-standard
                  measures to protect your information from unauthorized access,
                  alteration, or disclosure.
              </p>
              <h2>6. Children's Privacy</h2>
              <p>
                  Korgi Games is designed for a general audience and does not
                  knowingly collect personal information from children under 13.
                  If we discover such data, it will be promptly deleted.
              </p>
              <h2>7. Your Privacy Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                  <li>Request access to the data we collect about you.</li>
                  <li>Request deletion of your data (where applicable).</li>
                  <li>Opt-out of certain data collection practices.</li>
              </ul>
              <h2>8. Changes to This Privacy Statement</h2>
              <p>
                  We may update this Privacy Statement periodically. Continued use
                  of our website after changes are made constitutes acceptance of
                  the new terms.
              </p>
              <h2>9. Contact Us</h2>
              <p>
                  If you have any questions about our privacy practices, please
                  contact us at:
                  <a href="mailto:hello@korgigames.com"> hello@korgigames.com</a>.
              </p>
          </div>
        </div>
    );
}

export default PrivacyStatementPage;
