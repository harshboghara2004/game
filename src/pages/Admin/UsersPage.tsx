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
import UserDetailsModal from "../../components/admin-page/UserDetailsModal";

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
        favoriteGames: ["Sticky Goo", "Dragon Annihilation", "Shade Shuffle"],
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

function UsersPage() {
    const [filterStatus, setFilterStatus] = useState<
        "all" | "active" | "inactive"
    >("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = users.filter((user) => {
        const matchesStatus =
            filterStatus === "all" || user.status === filterStatus;
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="ml-10 lg:ml-0 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Users
                </h1>
                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) =>
                            setFilterStatus(
                                e.target.value as "all" | "active" | "inactive"
                            )
                        }
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                    >
                        <option value="all">All Users</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    User
                                </th>
                                <th className="px-6 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Contact
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Join Date
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Games
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
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
                                    <td className="px-6 sm:px-6 py-4 whitespace-nowrap flex items-center">
                                        <img
                                            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                                            src={user.avatar}
                                            alt=""
                                        />
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-500">
                                                Last active: {user.lastActive}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 sm:px-6 py-4 text-sm text-gray-900">
                                        <Mail
                                            size={16}
                                            className="mr-2 inline"
                                        />
                                        {user.email}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                                        <Calendar
                                            size={16}
                                            className="mr-2 inline"
                                        />
                                        {user.joinDate}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full ${
                                                user.status === "active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                                        {user.gamesPlayed}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-500">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Details Modal */}
            {selectedUser && (
                <UserDetailsModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}

export default UsersPage;
