import { GamepadIcon, LayoutGrid, Users } from "lucide-react";
import React from "react";
import { GoTrophy } from "react-icons/go";

import { MdOutlineFavorite } from "react-icons/md";
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

const HomePage = ({ name, setCurrentPage }) => {
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
                    value="20"
                    change="+10 new games added"
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

            {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                    Gaming Portal Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Welcome to your Korgi gaming portal administration
                    dashboard. Here you can manage all aspects of your gaming
                    platform, including game listings, categories, and user
                    settings. The dashboard provides real-time statistics and
                    insights about your platform's performance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="border dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-semibold mb-2 dark:text-white">
                            Quick Actions
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li>• Add new games to the platform</li>
                            <li>• Manage game categories</li>
                            <li>• Review user feedback</li>
                            <li>• Update platform settings</li>
                        </ul>
                    </div>
                    <div className="border dark:border-gray-700 rounded-lg p-4">
                        <h3 className="font-semibold mb-2 dark:text-white">
                            Recent Updates
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li>• New game category added</li>
                            <li>• Platform performance improved</li>
                            <li>• User interface updated</li>
                            <li>• Security features enhanced</li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default HomePage;
