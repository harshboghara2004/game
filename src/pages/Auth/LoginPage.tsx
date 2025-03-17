import React, { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkIsAdmin } from "../../util/userActions";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../firebase";

interface PasswordRequirement {
    label: string;
    met: boolean;
    check: (password: string) => boolean;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [requirements, setRequirements] = useState<PasswordRequirement[]>([
        {
            label: "Between 8-12 characters",
            met: false,
            check: (password) => password.length >= 8 && password.length <= 12,
        },
        {
            label: "At least one uppercase letter",
            met: false,
            check: (password) => /[A-Z]/.test(password),
        },
        {
            label: "At least one lowercase letter",
            met: false,
            check: (password) => /[a-z]/.test(password),
        },
        {
            label: "At least one number",
            met: false,
            check: (password) => /\d/.test(password),
        },
        {
            label: "At least one special character",
            met: false,
            check: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
    ]);

    useEffect(() => {
        setRequirements((prev) =>
            prev.map((req) => ({
                ...req,
                met: req.check(password),
            }))
        );
    }, [password]);

    const validatePassword = (password: string) => {
        const unmetRequirements = requirements.filter(
            (req) => !req.check(password)
        );
        if (unmetRequirements.length > 0) {
            return unmetRequirements[0].label;
        }
        return "";
    };

    const handleToSignUp = () => {
        navigate(`/signup`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(`Password requirement not met: ${passwordError}`);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user: User = userCredential.user;
            console.log("User login success", user);
            navigate(`/profile/${user.uid}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("Error logging in:", error.name, error.message);
            } else {
                setError("An unknown error occurred.");
                console.error("Unknown error logging in:", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                        Login to access your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-500 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                {requirements.map((req, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center text-sm"
                                    >
                                        {req.met ? (
                                            <Check
                                                size={16}
                                                className="text-green-500 mr-2"
                                            />
                                        ) : (
                                            <X
                                                size={16}
                                                className="text-red-500 mr-2"
                                            />
                                        )}
                                        <span
                                            className={
                                                req.met
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                            }
                                        >
                                            {req.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <button
                                type="button"
                                onClick={() => navigate("/forget-password")}
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login
                            <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <button
                            onClick={handleToSignUp}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign up now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
