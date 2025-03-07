import React, { useState } from "react";
import {
    Mail,
    Calendar,
    MoreVertical,
    X,
    Activity,
    Trophy,
    Clock,
    GamepadIcon,
    MapPin,
    Phone,
    Globe,
} from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    joinDate: string;
    lastActive: string;
    status: "active" | "inactive";
    gamesPlayed: number;
    avatar: string;
    phone?: string;
    location?: string;
    website?: string;
    favoriteGames?: string[];
    achievements?: {
        name: string;
        date: string;
    }[];
    recentActivity?: {
        action: string;
        date: string;
    }[];
}

function UsersPage() {
    const [filterStatus, setFilterStatus] = useState<
        "all" | "active" | "inactive"
    >("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const users: User[] = [
        {
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
        },
        {
            id: "2",
            name: "Michael Chen",
            email: "michael.c@example.com",
            joinDate: "2024-01-20",
            lastActive: "2024-03-11",
            status: "active",
            gamesPlayed: 32,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            phone: "+1 (555) 234-5678",
            location: "New York, NY",
            website: "www.michaelchen.dev",
            favoriteGames: ["Fruit Chop", "Cricket Gunda", "Quiz Champions"],
            achievements: [
                { name: "Quick Learner", date: "2024-01-25" },
                { name: "Team Player", date: "2024-02-15" },
            ],
            recentActivity: [
                { action: "Joined Fruit Chop tournament", date: "2024-03-11" },
                {
                    action: "New personal best in Cricket Gunda",
                    date: "2024-03-10",
                },
            ],
        },
        {
            id: "3",
            name: "Emma Rodriguez",
            email: "emma.r@example.com",
            joinDate: "2024-02-01",
            lastActive: "2024-03-09",
            status: "inactive",
            gamesPlayed: 28,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
            phone: "+1 (555) 345-6789",
            location: "Miami, FL",
            website: "www.emmarodriguez.net",
            favoriteGames: [
                "Sticky Goo",
                "Dragon Annihilation",
                "Shade Shuffle",
            ],
            achievements: [
                { name: "Rising Star", date: "2024-02-10" },
                { name: "Speed Runner", date: "2024-02-28" },
            ],
            recentActivity: [
                { action: "Completed Sticky Goo level 10", date: "2024-03-09" },
                {
                    action: "Started Dragon Annihilation campaign",
                    date: "2024-03-08",
                },
            ],
        },
        {
            id: "4",
            name: "James Thompson",
            email: "james.t@example.com",
            joinDate: "2024-03-01",
            lastActive: "2024-03-11",
            status: "active",
            gamesPlayed: 15,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
            phone: "+1 (555) 456-7890",
            location: "Seattle, WA",
            website: "www.jamesthompson.io",
            favoriteGames: ["Darts", "Soccer Jerks", "Lane Battles"],
            achievements: [
                { name: "Newcomer", date: "2024-03-02" },
                { name: "Sharp Shooter", date: "2024-03-09" },
            ],
            recentActivity: [
                { action: "Won first Darts match", date: "2024-03-11" },
                { action: "Joined Soccer Jerks league", date: "2024-03-10" },
            ],
        },
    ];

    const filteredUsers = users.filter((user) => {
        const matchesStatus =
            filterStatus === "all" || user.status === filterStatus;
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Users
                </h1>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) =>
                            setFilterStatus(
                                e.target.value as "all" | "active" | "inactive"
                            )
                        }
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Users</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Join Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Games
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => setSelectedUser(user)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src={user.avatar}
                                            alt=""
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Last active: {user.lastActive}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-900">
                                        <Mail size={16} className="mr-2" />
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-900">
                                        <Calendar size={16} className="mr-2" />
                                        {user.joinDate}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.gamesPlayed}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-400 hover:text-gray-500">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* User Details Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center">
                                    <img
                                        src={selectedUser.avatar}
                                        alt={selectedUser.name}
                                        className="h-20 w-20 rounded-full"
                                    />
                                    <div className="ml-4">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {selectedUser.name}
                                        </h2>
                                        <p className="text-gray-500">
                                            Member since {selectedUser.joinDate}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Contact Information */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center text-gray-600">
                                            <Mail size={16} className="mr-2" />
                                            {selectedUser.email}
                                        </div>
                                        {selectedUser.phone && (
                                            <div className="flex items-center text-gray-600">
                                                <Phone
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                {selectedUser.phone}
                                            </div>
                                        )}
                                        {selectedUser.location && (
                                            <div className="flex items-center text-gray-600">
                                                <MapPin
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                {selectedUser.location}
                                            </div>
                                        )}
                                        {selectedUser.website && (
                                            <div className="flex items-center text-gray-600">
                                                <Globe
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                {selectedUser.website}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Gaming Stats */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Gaming Statistics
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-3 rounded-lg">
                                            <div className="flex items-center text-gray-600 mb-1">
                                                <GamepadIcon
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                Games Played
                                            </div>
                                            <p className="text-2xl font-bold">
                                                {selectedUser.gamesPlayed}
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg">
                                            <div className="flex items-center text-gray-600 mb-1">
                                                <Activity
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                Status
                                            </div>
                                            <span
                                                className={`px-2 py-1 text-sm font-semibold rounded-full ${
                                                    selectedUser.status ===
                                                    "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {selectedUser.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Favorite Games */}
                                {selectedUser.favoriteGames && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Favorite Games
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedUser.favoriteGames.map(
                                                (game, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center bg-white p-2 rounded-lg"
                                                    >
                                                        <GamepadIcon
                                                            size={16}
                                                            className="mr-2 text-blue-500"
                                                        />
                                                        {game}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Achievements */}
                                {selectedUser.achievements && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Achievements
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedUser.achievements.map(
                                                (achievement, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between bg-white p-2 rounded-lg"
                                                    >
                                                        <div className="flex items-center">
                                                            <Trophy
                                                                size={16}
                                                                className="mr-2 text-yellow-500"
                                                            />
                                                            {achievement.name}
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            {achievement.date}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Recent Activity */}
                            {selectedUser.recentActivity && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Recent Activity
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedUser.recentActivity.map(
                                            (activity, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-white p-2 rounded-lg"
                                                >
                                                    <div className="flex items-center">
                                                        <Clock
                                                            size={16}
                                                            className="mr-2 text-blue-500"
                                                        />
                                                        {activity.action}
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {activity.date}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersPage;
