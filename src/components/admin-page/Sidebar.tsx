import React from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { toast } from "react-toastify";

interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface SidebarProps {
    menuItems: MenuItem[];
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

function Sidebar({ menuItems, currentPage, setCurrentPage }: SidebarProps) {
    const navigate = useNavigate();
    const [isDark, setIsDark] = React.useState(false);
    // console.log(isDark);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    const handleLogout = () => {
        auth.signOut();
        toast.success("Log out successfully.");
        navigate("/");
    };

    const handleSwithToAdmin = () => {
        const uid = auth.currentUser?.uid;
        navigate(`/profile/${uid}`);
    };

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
            <div className="p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Korgi Admin
                </h1>
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    aria-label="Toggle dark mode"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            <nav className="mt-6 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            currentPage === item.id
                                ? "bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500"
                                : ""
                        }`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={handleSwithToAdmin}
                    className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                    <PiUserSwitchDuotone size={20} className="mr-3" />
                    Switch to Profile page
                </button>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                    <LogOut size={20} className="mr-3" />
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
