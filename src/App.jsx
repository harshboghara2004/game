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
import AboutPage from "./pages/Footer/AboutPage";
import ContactPage from "./pages/Footer/ContactPage";
import FAQPage from "./pages/Footer/FaqPage";
import PrivacyStatementPage from "./pages/Footer/PrivacyStatementPage";
import TermsOfUsePage from "./pages/Footer/TermsofUsePage";

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
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy" element={<PrivacyStatementPage />} />
                <Route path="/terms" element={<TermsOfUsePage />} />

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
