import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./GamePage.css";

const GamePage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(null); // State for the currently playing game

    useEffect(() => {
        // Fetch game data from JSON file
        fetch("/gameData.json") // Make sure the path is correct!
            .then((response) => response.json())
            .then((data) => {
                setGames(data.games);

                // Find the currently playing game based on the slug from URL
                const game = data.games.find((g) => g.slug === slug);
                setCurrentGame(game); // set the found game
            })
            .catch((error) => {
                console.error("Error fetching game data:", error);
            });
    }, [slug]); // Add slug as a dependency so it re-fetches when the slug changes

    if (games.length === 0) {
        return <div>Loading games...</div>; // Or a better loading indicator
    }

    if (!currentGame) {
        return <div className="not-found">Game not found!</div>;
    }

    // Determine games for sidebars and bottom grid
    const otherGames = games.filter((g) => g.slug !== currentGame.slug);
    const leftSideGames = otherGames.slice(0, 4);
    const rightSideGames = otherGames.slice(4, 8);
    const bottomGames = otherGames.slice(8);

    return (
        <div className="game-page">
            <div className="game-layout">
                {/* Left Sidebar */}
                <div className="game-sidebar left-sidebar">
                    {leftSideGames.map((otherGame) => (
                        <div
                            key={otherGame.slug}
                            className="game-card"
                            onClick={() => navigate(`/game/${otherGame.slug}`)}
                        >
                            <img
                                src={otherGame.gameImage}
                                alt={otherGame.gameTitle}
                                className="game-image"
                            />
                        </div>
                    ))}
                </div>

                {/* Game Window */}
                <div className="game-container">
                    <iframe
                        src={currentGame.gameUrl}
                        title={currentGame.gameTitle}
                        className="game-iframe"
                        frameBorder="0"
                    />
                    {/* Game Title */}
                    <h2 className="game-title">{currentGame.gameTitle}</h2>
                </div>

                {/* Right Sidebar */}
                <div className="game-sidebar right-sidebar">
                    {rightSideGames.map((otherGame) => (
                        <div
                            key={otherGame.slug}
                            className="game-card"
                            onClick={() => navigate(`/game/${otherGame.slug}`)}
                        >
                            <img
                                src={otherGame.gameImage}
                                alt={otherGame.gameTitle}
                                className="game-image"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Games Below */}
            <div className="game-grid">
                {bottomGames.map((otherGame) => (
                    <div
                        key={otherGame.slug}
                        className="game-card"
                        onClick={() => navigate(`/game/${otherGame.slug}`)}
                    >
                        <img
                            src={otherGame.gameImage}
                            alt={otherGame.gameTitle}
                            className="game-image"
                        />
                    </div>
                ))}
            </div>
            {/*Description Section: MOVED TO THE END*/}
            <div className="game-description-section">
                <div className="description-text-area">
                    <span className="description-category">
                        {" "}
                        {currentGame.gameCategory}{" "}
                    </span>
                    <h2 className="description-title">
                        {currentGame.gameTitle}
                    </h2>
                    <p className="description-text">
                        {" "}
                        {currentGame.description}{" "}
                    </p>
                    <p className="description-howToPlay">
                        {" "}
                        <b> How to play: </b> {currentGame.howToPlay}{" "}
                    </p>
                    <p className="description-whoCreated">
                        {" "}
                        <b> Who created: </b> {currentGame.whoCreated}{" "}
                    </p>
                    <p className="description-playForFree">
                        {" "}
                        <b> Play for Free: </b> {currentGame.playForFree}{" "}
                    </p>
                    <p className="description-mobileDesktop">
                        {" "}
                        <b> Platform to Play: </b> {currentGame.mobileDesktop}{" "}
                    </p>
                </div>
                <img
                    src={currentGame.gameImage}
                    alt={currentGame.gameTitle}
                    className="description-image"
                />
            </div>
        </div>
    );
};

export default GamePage;
