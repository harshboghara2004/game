import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./SignupPage.module.css";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const role = searchParams.get("role") || "user";

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("User sign-up success", user);

            await addDoc(collection(db, role), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
            });

            console.log("User data added to Firestore as", role);
            navigate("/"); // Redirect after signup
        } catch (error) {
            setError(error.message);
            console.error("Error signing up:", error.code, error.message);
        }
    };

    const handleLogin = () => {
        navigate(`/login?role=${role}`);
    };

    const handleAdminSignup = () => {
        if (role === "admin") {
            setSearchParams({ role: "user" });
        } else {
            setSearchParams({ role: "admin" });
        }
    };

    return (
        <div className={classes["signup-page"]}>
            <div className={classes["signup-container"]}>
                <h2 className={classes["signup-text"]}>Sign Up ({role})</h2>
                {error && <p className={classes["error"]}>{error}</p>}
                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={classes["email-input"]}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={classes["password-input"]}
                    />
                    <button type="submit" className={classes.btn}>
                        Sign Up
                    </button>
                    <button className={classes.btn} onClick={handleLogin}>
                        Go to Login
                    </button>
                </form>

                <button
                    onClick={handleAdminSignup}
                    className={classes["redirect-btn"]}
                >
                    {role === "admin" ? "Sign Up as User" : "Sign up as Admin"}
                </button>
            </div>
        </div>
    );
};

export default SignupPage;
