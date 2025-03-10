import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";
import HomePage from "./pages/Home/HomePage";
import GamePage from "./pages/Game/GamePage";
import AdminPage from "./pages/Admin/AdminPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import ForgotPasswordPage from "./pages/Admin/ForgetPasswordPage";
import Footer from "./components/UI/Footer";
import SearchPage from "./pages/Search/SearchPage";
import { games } from "../public/data/gameData";
import { categories } from "../public/data/categoryData";

const App = () => {
    return (
        <div className={classes.app}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/game/:slug" element={<GamePage />} />
                <Route path="/admin-panel" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                    path="/forget-password"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path="/search"
                    element={
                        <SearchPage games={games} categories={categories} />
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
