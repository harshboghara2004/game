import React, { useState } from "react";
import { Users, GamepadIcon, LayoutGrid, TrendingUp } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 45678 },
    { month: "Apr", revenue: 52000 },
    { month: "May", revenue: 48000 },
    { month: "Jun", revenue: 55000 },
];

function StatCard({
    icon,
    title,
    value,
    change,
    onClick,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    change: string;
    onClick?: () => void;
}) {
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

function RevenueChart() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-6 dark:text-white">
                Revenue Overview
            </h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => [`$${value}`, "Revenue"]}
                            contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ fill: "#3B82F6", r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function HomePage({
    setCurrentPage,
}: {
    setCurrentPage: (page: string) => void;
}) {
    const [showRevenueChart, setShowRevenueChart] = useState(false);

    const handleRevenueClick = () => {
        setShowRevenueChart(!showRevenueChart);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Welcome to Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={<Users size={24} />}
                    title="Total Users"
                    value="2,543"
                    change="+12.5% from last month"
                    onClick={() => setCurrentPage("users")}
                />
                <StatCard
                    icon={<GamepadIcon size={24} />}
                    title="Active Games"
                    value="156"
                    change="+8.2% from last month"
                    onClick={() => setCurrentPage("games")}
                />
                <StatCard
                    icon={<LayoutGrid size={24} />}
                    title="Categories"
                    value="12"
                    change="+2 new categories"
                    onClick={() => setCurrentPage("categories")}
                />
                <StatCard
                    icon={<TrendingUp size={24} />}
                    title="Total Revenue"
                    value="$45,678"
                    change="+15.3% from last month"
                    onClick={handleRevenueClick}
                />
            </div>

            {showRevenueChart && <RevenueChart />}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
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
            </div>
        </div>
    );
}

export default HomePage;
