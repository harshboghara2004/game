import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import ErrorPage from "../Error/ErrorPage";
import useUser from "../../hooks/useUser";
import NotFoundPage from "../Error/NotFoundPage";
import classes from "./ProfilePage.module.css";
import { MdFavoriteBorder } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { FiActivity } from "react-icons/fi";
import { Home, Settings } from "lucide-react";
import ProfileSidebar from "../../components/profile-page/ProfileSidebar";
import HomePage from "./HomePage";
import FavoriteGamesPage from "./FavoriteGamesPage";
import AchivementsPage from "./AchivementsPage";
import RecentActiviyPage from "./RecentActiviyPage";
import { FaCoins } from "react-icons/fa";
import RewardsPage from "./RewardsPage";

const ProfilePage = () => {
    const params = useParams();

    const { user, loading, error } = useUser(params.uid);
    const [currentPage, setCurrentPage] = useState("home");

    let selectedUser = {
        id: "1",
        name: "Sarah Wilson",
        email: "sarah.w@example.com",
        joinDate: "2024-02-15",
        lastActive: "2024-03-10",
        status: "active",
        gamesPlayed: 45,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "www.sarahwilson.com",
        favoriteGames: ["Cyberfusion", "Tower Buster", "Shadow Run"],
        achievements: [
            { name: "First Win", date: "2024-02-16" },
            { name: "Pro Gamer", date: "2024-03-01" },
            { name: "10 Game Streak", date: "2024-03-08" },
        ],
        recentActivity: [
            { action: "Won Cyberfusion tournament", date: "2024-03-10" },
            {
                action: "Achieved new high score in Tower Buster",
                date: "2024-03-09",
            },
            {
                action: "Completed Shadow Run challenge",
                date: "2024-03-08",
            },
        ],
    };

    const menuItems = [
        { id: "home", label: "Home", icon: <Home size={20} /> },
        {
            id: "favorite",
            label: "Favorite Games",
            icon: <MdFavoriteBorder size={20} />,
        },
        { id: "rewards", label: "Rewards", icon: <FaCoins size={20} /> },
        {
            id: "achievements",
            label: "Achievements",
            icon: <GoTrophy size={20} />,
        },
        {
            id: "activity",
            label: "Recent  Activity",
            icon: <FiActivity size={20} />,
        },
        { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    ];

    let content;
    if (loading) {
        content = <Loader message="Loading User..." />;
    } else if (error) {
        content = <ErrorPage message={error} />;
    } else if (!user) {
        content = <NotFoundPage message="Can not find an User" />;
    } else {
        content = (
            <>
                <ProfileSidebar
                    menuItems={menuItems}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    isAdmin
                />
                <main className="flex-1 overflow-y-auto p-8">
                    {currentPage === "home" && (
                        <HomePage
                            setCurrentPage={setCurrentPage}
                            name={user.name}
                        />
                    )}
                    {currentPage === "favorite" && <FavoriteGamesPage />}
                    {currentPage === "rewards" && <RewardsPage />}
                    {currentPage === "achievements" && <AchivementsPage />}
                    {currentPage === "activity" && <RecentActiviyPage />}
                </main>
            </>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {content}
        </div>
    );
};

export default ProfilePage;
