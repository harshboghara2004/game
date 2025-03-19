import React, { useState, useEffect } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
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

const Sidebar: React.FC<SidebarProps> = ({
    menuItems,
    currentPage,
    setCurrentPage,
}) => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Toggle dark mode
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    // Logout function
    const handleLogout = () => {
        auth.signOut();
        toast.success("Logged out successfully.");
        navigate("/");
    };

    // Navigate to profile
    const handleSwitchToProfile = () => {
        const uid = auth.currentUser?.uid;
        if (uid) navigate(`/profile/${uid}`);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 p-2 rounded-md shadow-md"
            >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative w-64 z-10 bg-white dark:bg-gray-900 shadow-md flex flex-col h-screen transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                {/* Header */}
                <div className="p-6 py-4 lg:py-6 flex justify-between items-center">
                    <h1 className="ml-10 lg:ml-0 text-2xl font-bold text-gray-800 dark:text-white">
                        Korgi Admin
                    </h1>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setCurrentPage(item.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
                                currentPage === item.id
                                    ? "bg-gray-200 dark:bg-gray-700 border-l-4 border-blue-500"
                                    : ""
                            }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Profile & Logout Section */}
                <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition mt-2"
                    >
                        <LogOut size={20} className="mr-3" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
