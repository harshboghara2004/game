import React from "react";
import { useParams } from "react-router-dom";
import "./GameDetailPage.css";
import GameCard from "./GameCard";

const GameDetailPage = ({ games }) => {
    const { slug } = useParams();

    // Find the selected game by slug
    const game = games.find((g) => g.slug === slug);

    if (!game) {
        return <div>Game not found!</div>;
    }

    return (
        <div className="game-details">
            <h2>{game.gameTitle}</h2>
            <div className="iframe-container">
                <iframe
                    src={game.gameUrl}
                    title={game.gameTitle}
                    className="game-iframe"
                    frameBorder="0"
                ></iframe>
            </div>

            <h3>Other Games</h3>
            <div className="other-games">
                {games
                    .filter((g) => g.slug !== game.slug)
                    .map((otherGame) => (
                        <GameCard key={otherGame.slug} game={otherGame} />
                    ))}
            </div>
        </div>
    );
};

export default GameDetailPage;
