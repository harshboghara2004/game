import { useEffect, useState } from "react";
import { Home, GamepadIcon, LayoutGrid, Settings, Users } from "lucide-react";
import Sidebar from "../../components/admin-page/Sidebar";
import HomePage from "./HomePage";
import GamesPage from "./GamesPage";
import CategoriesPage from "./CategoriesPage";
import SettingsPage from "./SettingsPage";
import UsersPage from "./UsersPage";
import { auth } from "../../firebase";
import NotFoundPage from "../Error/NotFoundPage";
import { onAuthStateChanged, User } from "firebase/auth";
import { checkIsAdmin } from "../../util/userActions";
import Loader from "../../components/UI/Loader";
import ErrorPage from "../Error/ErrorPage";
import { useNavigate } from "react-router-dom";

function AdminPage() {
    const currentUser = auth.currentUser;
    // console.log(currentUser);

    if (currentUser === undefined) {
        return (
            <NotFoundPage
                statusCode={404}
                message="Login to access admin panel"
            />
        );
    }

    const [currentPage, setCurrentPage] = useState("home");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);

    // check for admin
    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user: User | null) => {
                if (user) {
                    const currentUserUid: string | null = user.uid;
                    // console.log("Current User Email:", currentUserEmail);

                    try {
                        const response: {
                            status: number;
                            isAdmin?: boolean;
                            message?: string;
                        } = await checkIsAdmin(currentUserUid);
                        if (response.status === 200) {
                            setIsAdmin(response.isAdmin ?? false);
                        } else {
                            setError({
                                message:
                                    response.message ?? "Something went wrong",
                            });
                        }
                    } catch (error) {
                        setError({ message: "Failed to check admin status." });
                    }
                } else {
                    setError({ message: "No user is signed in." });
                }
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const menuItems = [
        { id: "home", label: "Home", icon: <Home size={20} /> },
        { id: "users", label: "Users", icon: <Users size={20} /> },
        { id: "games", label: "Games", icon: <GamepadIcon size={20} /> },
        {
            id: "categories",
            label: "Categories",
            icon: <LayoutGrid size={20} />,
        },
        { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    ];

    let content;
    if (isLoading) {
        content = <Loader message="Loading Admin..." />;
    } else if (error) {
        content = <ErrorPage message={error.message} />;
    } else if (!isAdmin) {
        content = (
            <NotFoundPage
                statusCode={401}
                message="Access Denied! You are not an admin."
            />
        );
    } else {
        content = (
            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar
                    menuItems={menuItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8 transition-all duration-300">
                    {currentPage === "home" && (
                        <HomePage setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === "users" && <UsersPage />}
                    {currentPage === "games" && <GamesPage />}
                    {currentPage === "categories" && <CategoriesPage />}
                    {currentPage === "settings" && <SettingsPage />}
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            {content}
        </div>
    );
}

export default AdminPage;
