import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";
import HomePage from "./pages/Home/HomePage";
import GamePage from "./pages/Game/GamePage";
import Footer from "./components/UI/Footer";
import AdminPage from "./pages/Admin/AdminPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";

function App() {
    return (
        <Router>
            <div className={classes.app}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game/:slug" element={<GamePage />} />
                    <Route path="/admin-panel" element={<AdminPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
