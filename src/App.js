import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage"; // Import MainPage
import Header from "./components/Header"; // Import Header
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import GameDetailPage from "./components/GameDetailPage";

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetching the games data
        fetch("./gamedata.json")
            .then((response) => response.json())
            .then((data) => setGames(data.games)) // Ensure data.games is defined
            .catch((error) => console.error("Error fetching games:", error));
    }, []);

    return (
        <Router>
            <div className="App">
                <Header /> {/* Include the Header component */}
                <Routes>
                    <Route path="/" element={<HomePage games={games} />} />
                    <Route
                        path="/game/:slug"
                        element={<GamePage games={games} />}
                    />
                    {/* <Route path="/" element={<MainPage games={games} />} />
                    <Route
                        path="/game/:slug"
                        element={<GameDetailPage games={games} />}
                    />{" "} */}
                    {/* Route for game details */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
