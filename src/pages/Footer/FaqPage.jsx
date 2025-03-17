import React from "react";
import classes from "./FAQPage.module.css"; // Import CSS module

const questionsList = [
    {
        question: "What is Korgi Games?",
        answer: "Korgi Games is a free online playground that offers the best online games selection. You can play alone or with friends. We offer instant play for all of our games without needing to download, log in, see pop-ups, or deal with any distractions.",
    },
    {
        question: "Are Korgi Games educational?",
        answer: "Yes! We offer a variety of educational games including Math Games, Multiplication Games, and Puzzle Games.",
    },
    {
        question: "Is Korgi Games safe and secure?",
        answer: "Yes, we take all necessary precautions to ensure the safety of our users. However, we recommend users stay within our website for a secure experience.",
    },
    {
        question: "What can I do if I see an inappropriate ad?",
        answer: (
            <>
                If you see an inappropriate ad, please report it to us at:
                <a
                    href="mailto:hello@korgigames.com"
                    className={classes["faq-link"]}
                >
                    hello@korgigames.com
                </a>
            </>
        ),
    },
    {
        question: "Can you get viruses on Korgi Games?",
        answer: "No, Korgi Games runs completely in your browser. We never ask you to download anything, ensuring a safe and virus-free experience.",
    },
    {
        question: "Do I have to download or install something to play?",
        answer: "Never! You only need a web browser to play our games. We don’t require any downloads.",
    },
    {
        question: "Does Korgi Games have a mobile app?",
        answer: "Currently, Korgi Games does not have a mobile app.",
    },
    {
        question: "Are Korgi Games games completely free?",
        answer: "Yes. Every game is 100% free on Korgi Games! In order to keep our games completely free, we work with advertisers and share the revenue we make with the developers of the games available on Korgi Games.",
    },
];

const FAQPage = () => {
    return (
        <div className={classes["faq-page"]}>
            <div className={classes["faq-container"]}>
                <h1 className={classes["faq-title"]}>
                    Frequently Asked Questions (FAQ)
                </h1>
                <ul className={classes["faq-list"]}>
                    {questionsList.map((faq, index) => (
                        <li key={index} className={classes["faq-item"]}>
                            <h2 className={classes["faq-question"]}>
                                Q{index + 1}. {faq.question}
                            </h2>
                            <p className={classes["faq-answer"]}>
                                <strong>Ans.</strong> {faq.answer}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FAQPage;
