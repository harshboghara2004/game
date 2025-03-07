import { useEffect, useState } from "react";
import { Home, GamepadIcon, LayoutGrid, Settings, Users } from "lucide-react";
import Sidebar from "../../components/admin-page/Sidebar";
import HomePage from "./HomePage";
import GamesPage from "./GamesPage";
import CategoriesPage from "./CategoriesPage";
import SettingsPage from "./SettingsPage";
import UsersPage from "./UsersPage";
import { auth, database } from "../../firebase";
import NotFoundPage from "../Error/NotFoundPage";
import { onAuthStateChanged, User } from "firebase/auth";
import { checkIsAdmin } from "../../util/checkAdmin";
import Loader from "../../components/UI/Loader";
import ErrorPage from "../Error/ErrorPage";

function AdminPage() {
    const [currentPage, setCurrentPage] = useState("home");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ message: string } | null>(null);
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

    // check for admin
    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user: User | null) => {
                if (user) {
                    const currentUserEmail: string | null = user.email;
                    // console.log("Current User Email:", currentUserEmail);

                    try {
                        const response: {
                            status: number;
                            isAdmin?: boolean;
                            message?: string;
                        } = await checkIsAdmin(currentUserEmail);
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

    const handleLogout = () => {
        auth.signOut();
    };

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
            <>
                <Sidebar
                    menuItems={menuItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    onLogout={handleLogout}
                />
                <main className="flex-1 overflow-y-auto p-8">
                    {currentPage === "home" && (
                        <HomePage setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === "users" && <UsersPage />}
                    {currentPage === "games" && <GamesPage />}
                    {currentPage === "categories" && <CategoriesPage />}
                    {currentPage === "settings" && <SettingsPage />}
                </main>
            </>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {content}
        </div>
    );
}

export default AdminPage;
