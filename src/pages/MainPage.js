import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import GameCard from "../components/GameCard"; // Import GameCard component
import GameDetail from "../components/GameDetailPage"; // Import GameDetail for iframe display
import "./MainPage.css"; // Import CSS for styling
import "./HomePage";
import "./GamePage";

const MainPage = ({ games }) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleGameSelect = (game) => {
        setSelectedGame(game); // Set the selected game to display in the iframe
        navigate(`/game/${game.slug}`); // Update the URL with the game's slug
    };

    const handleBack = () => {
        setSelectedGame(null); // Clear the selected game to go back to the game list
        navigate("/"); // Navigate back to the main page
    };

    return (
        <div className="main-page">
            {!selectedGame ? (
                <div className="game-list">
                    {games && games.length > 0 ? ( // Check if games exist and have length
                        games.map((game) => (
                            <GameCard
                                key={game.slug}
                                game={game}
                                onGameSelect={handleGameSelect}
                            /> // Use game.slug as key
                        ))
                    ) : (
                        <div>No games available.</div> // Handle case where no games are available
                    )}
                </div>
            ) : (
                <div className="game-details-container">
                    <button className="back-button" onClick={handleBack}>
                        Back
                    </button>
                    <GameDetail games={games} />{" "}
                    {/* Pass the games array to GameDetail */}
                    <h3>Other Games</h3>
                    <div className="other-games">
                        {games.map(
                            (game) =>
                                game.slug !== selectedGame.slug && ( // Exclude the selected game
                                    <GameCard
                                        key={game.slug}
                                        game={game}
                                        onGameSelect={handleGameSelect}
                                    />
                                )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
