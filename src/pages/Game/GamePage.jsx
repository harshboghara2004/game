import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./GamePage.module.css";
import SideBar from "../../components/game-page/SideBar";
import GamesGrid from "../../components/home-page/GamesGrid";
import GameWindow from "../../components/game-page/GameWindow";
import GameDescription from "../../components/game-page/GameDescription";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import Loader from "../../components/UI/Loader";
import NotFoundPage from "../Error/NotFoundPage";
import Modal from "../../components/UI/Modal";
import SearchPage from "../Search/SearchPage";

const divideGames = (games) => {
    const leftSideGames = games.slice(0, 4);
    const rightSideGames = games.slice(4, 9);
    const bottomGames = games.slice(9);
    return { leftSideGames, rightSideGames, bottomGames };
};

const categories = [
    { id: "action", name: "Action", image: "/images/action.jpg" },
    {
        id: "sports_and_Racing",
        name: "Sports & Racing",
        image: "/images/sports_and_racing.png",
    },
    { id: "adventure", name: "Adventure", image: "/images/adventure.jpg" },
    { id: "strategy", name: "Strategy", image: "/images/strategy.png" },
    { id: "merge", name: "Merge", image: "/images/merge.png" },
    {
        id: "puzzle_and_Logic",
        name: "Puzzle & Logic",
        image: "/images/puzzle_and_logic.jpg",
    },
    { id: "arcade", name: "Arcade", image: "/images/arcade.jpg" },
];

const GamePage = () => {
    const { slug } = useParams();
    const [games, setGames] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    let currentGame = null;

    // Get all games
    useEffect(() => {
        const dataRef = ref(database, "/games");

        const unsubscribe = onValue(dataRef, (snapshot) => {
            const gamesArray = Object.values(snapshot.val());
            setGames(gamesArray);
        });

        return () => unsubscribe();
    }, []);

    let content;
    if (games.length === 0) {
        content = <Loader message="Loading Game..." />;
    } else {
        currentGame = games.find((g) => g.slug === slug);
        if (!currentGame) {
            return <NotFoundPage message="Game Not Found" />;
        } else {
            const otherGames = games.filter((g) => g.slug !== currentGame.slug);
            const { leftSideGames, rightSideGames, bottomGames } =
                divideGames(otherGames);
            content = (
                <>
                    {/* Game Layout */}
                    <div className={classes["game-layout"]}>
                        {/* Left Sidebar */}
                        <SideBar
                            key="left-sidebar"
                            games={leftSideGames}
                            setIsSearching={setIsSearching}
                            className="left-sidebar"
                            addHome
                        />

                        {/* Game Window */}
                        <GameWindow game={currentGame} />

                        {/* Right Sidebar */}
                        <SideBar
                            key="right-sidebar"
                            games={rightSideGames}
                            className="right-sidebar"
                        />
                    </div>

                    {/* Games Below */}
                    <GamesGrid games={bottomGames} />

                    {/*Description Section: MOVED TO THE END*/}
                    <GameDescription game={currentGame} />
                </>
            );
        }
    }

    return (
        <div className={classes["game-page"]}>
            {isSearching && <div className={classes.dimmedContent}></div>}
            {content}
            {isSearching && (
                <Modal onClose={() => setIsSearching(false)}>
                    <SearchPage games={games} categories={categories} />
                </Modal>
            )}
        </div>
    );
};

export default GamePage;
