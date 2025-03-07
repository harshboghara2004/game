import React, { useState, useEffect } from "react";
import {
    Mail,
    Lock,
    User,
    ArrowRight,
    Eye,
    EyeOff,
    Check,
    X,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

interface PasswordRequirement {
    label: string;
    met: boolean;
    check: (password: string) => boolean;
}

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const role = searchParams.get("role") || "user";

    useEffect(() => {
        setRequirements((prev) =>
            prev.map((req) => ({
                ...req,
                met: req.check(formData.password),
            }))
        );
    }, [formData.password]);

    const validatePassword = (password: string) => {
        const unmetRequirements = requirements.filter(
            (req) => !req.check(password)
        );
        if (unmetRequirements.length > 0) {
            return unmetRequirements[0].label;
        }
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleToLogin = () => {
        navigate(`/login?role=${role}`);
    };

    const handleRoleChange = () => {
        if (role === "user") {
            setSearchParams({ role: "admin" });
        } else {
            setSearchParams({ role: "user" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill in all fields");
            return;
        }

        if (!formData.email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }

        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setError(`Password requirement not met: ${passwordError}`);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // sign up to firebase
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;
            console.log("User sign-up success", user);

            await addDoc(collection(db, role), {
                uid: user.uid,
                name: formData.name,
                email: user.email,
                createdAt: new Date(),
            });
            console.log("User data added to Firestore as", role);
            navigate("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                console.error("Error signing up:", error.name, error.message);
            } else {
                setError("An unknown error occurred.");
                console.error("Unknown error signing up:", error);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                        Create an account ({role})
                    </h2>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                        Join our gaming community
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
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
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

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Account
                            <ArrowRight size={20} className="ml-2" />
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <button
                            onClick={handleToLogin}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Login
                        </button>
                    </p>
                </div>
                <div className="mt-4 text-center">
                    <button
                        onClick={handleRoleChange}
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign up as {role === "user" ? "Admin" : "User"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
