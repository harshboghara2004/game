import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.css";
import SideBar from "../components/game-page/SideBar";
import GamesGrid from "../components/home-page/GamesGrid";
import GameWindow from "../components/home-page/GameWindow";
import GameDescription from "../components/game-page/GameDescription";
import { database } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";

const GamePage = () => {
    const { slug } = useParams();
    const [games, setGames] = useState([]);
    let currentGame = null;

    useEffect(() => {
        const dataRef = ref(database, "/games");

        const unsubscribe = onValue(dataRef, (snapshot) => {
            const gamesArray = Object.values(snapshot.val());
            setGames(gamesArray);
        });

        return () => unsubscribe();
    }, []);

    if (games.length === 0) {
        return <div>Loading games...</div>; // Or a better loading indicator
    } else {
        currentGame = games.find((g) => g.slug === slug);
    }

    if (!currentGame) {
        return <div className="not-found">Game not found!</div>;
    }

    const otherGames = games.filter((g) => g.slug !== currentGame.slug);
    const leftSideGames = otherGames.slice(0, 4);
    const rightSideGames = otherGames.slice(4, 8);
    const bottomGames = otherGames.slice(8);

    return (
        <div className="game-page">
            {/* Game Layout */}
            <div className="game-layout">
                {/* Left Sidebar */}
                <SideBar games={leftSideGames} className="left-sidebar" />

                {/* Game Window */}
                <GameWindow game={currentGame} />

                {/* Right Sidebar */}
                <SideBar games={rightSideGames} className="right-sidebar" />
            </div>

            {/* Games Below */}
            <GamesGrid games={bottomGames} />

            {/*Description Section: MOVED TO THE END*/}
            <GameDescription game={currentGame} />
        </div>
    );
};

export default GamePage;
