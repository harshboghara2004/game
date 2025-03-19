import React, { useState } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { HiMenu, HiX } from "react-icons/hi"; // Import menu icons

function ProfileSidebar({ menuItems, currentPage, setCurrentPage }) {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // State for mobile menu

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    const handleLogout = () => {
        auth.signOut();
        toast.success("Log out successfully.");
        navigate("/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 p-2 rounded-md"
            >
                {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:relative w-64 z-10 bg-white dark:bg-gray-800 shadow-md flex flex-col h-screen transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                {/* Header with Dark Mode Toggle */}
                <div className="p-6 py-3 flex justify-between items-center">
                    <h1 className="ml-10 lg:ml-0 text-2xl font-bold text-gray-800 dark:text-white">
                        Korgi Profile
                    </h1>
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                                setCurrentPage(item.id);
                                setIsOpen(false);
                            }}
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

                {/* Logout Button */}
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
        </>
    );
}

export default ProfileSidebar;
