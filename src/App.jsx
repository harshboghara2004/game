import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./pages/HomePage";
import Header from "./components/UI/Header"; // Import Header
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import Footer from "./components/UI/Footer";

function App() {

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game/:slug" element={<GamePage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
