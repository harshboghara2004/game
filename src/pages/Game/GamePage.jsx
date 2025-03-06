import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GamePage.css";
import SideBar from "../../components/game-page/SideBar";
import GamesGrid from "../../components/home-page/GamesGrid";
import GameWindow from "../../components/game-page/GameWindow";
import GameDescription from "../../components/game-page/GameDescription";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import Loader from "../../components/UI/Loader";
import NotFoundPage from "../Error/NotFoundPage";

const divideGames = (games) => {
    const leftSideGames = games.slice(0, 4);
    const rightSideGames = games.slice(4, 9);
    const bottomGames = games.slice(9);
    return { leftSideGames, rightSideGames, bottomGames };
};

const GamePage = () => {
    const { slug } = useParams();
    const [games, setGames] = useState([]);
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
                    <div className="game-layout">
                        {/* Left Sidebar */}
                        <SideBar
                            games={leftSideGames}
                            className="left-sidebar"
                            addHome
                        />

                        {/* Game Window */}
                        <GameWindow game={currentGame} />

                        {/* Right Sidebar */}
                        <SideBar
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

    return <div className="game-page">{content}</div>;
};

export default GamePage;
