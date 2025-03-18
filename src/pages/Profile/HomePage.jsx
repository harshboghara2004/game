import { GamepadIcon, LayoutGrid, Users } from "lucide-react";
import React from "react";
import { GoTrophy } from "react-icons/go";

import { MdOutlineFavorite } from "react-icons/md";
import DailyRewards from "../../components/profile-page/DailyRewards";
function StatCard({ icon, title, value, change, onClick }) {
    return (
        <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1 dark:text-white">
                        {value}
                    </h3>
                    <p className="text-green-500 text-sm mt-2">{change}</p>
                </div>
                <div className="text-blue-500">{icon}</div>
            </div>
        </div>
    );
}

const rewards = [
    { day: 1, coins: 100 },
    { day: 2, coins: 150 },
    { day: 3, coins: 200 },
    { day: 4, coins: 250 },
    { day: 5, coins: 300 },
    { day: 6, coins: 400 },
    { day: 7, coins: 500 },
];

const HomePage = ({ name, noOfFavoriteGames, setCurrentPage }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Welcome {name},
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<GamepadIcon size={24} />}
                    title="Games Played"
                    value="156"
                    change="+8.2% from last month"
                    onClick={() => setCurrentPage("activity")}
                />
                <StatCard
                    icon={<MdOutlineFavorite size={24} />}
                    title="Favorite Games"
                    value={noOfFavoriteGames}
                    change={`+${noOfFavoriteGames} new games added`}
                    onClick={() => setCurrentPage("favorite")}
                />
                <StatCard
                    icon={<GoTrophy size={24} />}
                    title="Total Achievements"
                    value="12"
                    change="+2 new categories"
                    onClick={() => setCurrentPage("achievements")}
                />
            </div>

            <DailyRewards />
        </div>
    );
};

export default HomePage;
