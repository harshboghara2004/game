import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./LoginPage.css";
import { checkIsAdmin } from "../../util/checkAdmin";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const role = searchParams.get("role") || "user";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const response = await checkIsAdmin(email);
        if (response.status === 200) {
            if (role === "user" && response.isAdmin) {
                setError("You are admin. Login as admin");
                return;
            } else if (role === "admin" && !response.isAdmin) {
                setError("You are not admin. Login as user");
                return;
            }
        } else {
            setError(response.message);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("User login success", user);
            navigate("/");
        } catch (error) {
            setError(error.message);
            console.error("Error logging in:", error.code, error.message);
        }
    };

    const handleSignup = () => {
        navigate(`/signup?role=${role}`);
    };

    const handleAdminLogin = () => {
        if (role === "admin") {
            setSearchParams({ role: "user" });
        } else {
            setSearchParams({ role: "admin" });
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-text">Login ({role})</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="email-input"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="password-input"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn">
                        Login
                    </button>
                    <button className="btn" onClick={handleSignup}>
                        Go to Sign Up
                    </button>
                </form>

                <button onClick={handleAdminLogin} className="redirect-btn">
                    {role === "admin" ? "Login as User" : "Login as Admin"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
