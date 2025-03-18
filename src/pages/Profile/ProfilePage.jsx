import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/UI/Loader";
import ErrorPage from "../Error/ErrorPage";
import useUser from "../../hooks/useUser";
import NotFoundPage from "../Error/NotFoundPage";
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

const ProfilePage = () => {
    const params = useParams();

    const { user, loading, error } = useUser(params.uid);
    const [currentPage, setCurrentPage] = useState("home");

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
                    isAdmin={user.isAdmin}
                />
                <main className="flex-1 overflow-y-auto p-8">
                    {currentPage === "home" && (
                        <HomePage
                            setCurrentPage={setCurrentPage}
                            name={user.name}
                        />
                    )}
                    {currentPage === "favorite" && (
                        <FavoriteGamesPage gameIds={user.favoriteGames} />
                    )}
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
