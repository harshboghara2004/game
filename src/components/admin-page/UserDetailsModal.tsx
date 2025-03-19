import React from "react";
import {
    X,
    Mail,
    Phone,
    MapPin,
    Globe,
    GamepadIcon,
    Trophy,
    Clock,
    Activity,
} from "lucide-react";

interface User {
    name: string;
    email: string;
    avatar: string;
    phone?: string;
    location?: string;
    website?: string;
    gamesPlayed: number;
    status: "active" | "inactive";
    favoriteGames?: string[];
    achievements?: { name: string; date: string }[];
    recentActivity?: { action: string; date: string }[];
    joinDate: string;
}

interface UserDetailsModalProps {
    user: User;
    onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
    user,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-20 w-20 rounded-full"
                            />
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {user.name}
                                </h2>
                                <p className="text-gray-500">
                                    Member since {user.joinDate}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
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
                            <div className="space-y-3 text-gray-600">
                                <div className="flex items-center">
                                    <Mail size={16} className="mr-2" />
                                    {user.email}
                                </div>
                                {user.phone && (
                                    <div className="flex items-center">
                                        <Phone size={16} className="mr-2" />
                                        {user.phone}
                                    </div>
                                )}
                                {user.location && (
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-2" />
                                        {user.location}
                                    </div>
                                )}
                                {user.website && (
                                    <div className="flex items-center">
                                        <Globe size={16} className="mr-2" />
                                        <a
                                            href={user.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {user.website}
                                        </a>
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
                                <div className="bg-white p-3 rounded-lg text-center">
                                    <GamepadIcon
                                        size={16}
                                        className="text-blue-500 mx-auto mb-2"
                                    />
                                    <p className="text-sm text-gray-600">
                                        Games Played
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {user.gamesPlayed}
                                    </p>
                                </div>
                                <div className="bg-white p-3 rounded-lg text-center">
                                    <Activity
                                        size={16}
                                        className="text-blue-500 mx-auto mb-2"
                                    />
                                    <p className="text-sm text-gray-600">
                                        Status
                                    </p>
                                    <span
                                        className={`px-2 py-1 text-sm font-semibold rounded-full ${
                                            user.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Favorite Games */}
                        {user.favoriteGames &&
                            user.favoriteGames.length > 0 && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Favorite Games
                                    </h3>
                                    <div className="space-y-2">
                                        {user.favoriteGames.map(
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
                        {user.achievements && user.achievements.length > 0 && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">
                                    Achievements
                                </h3>
                                <div className="space-y-2">
                                    {user.achievements.map(
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
                    {user.recentActivity && user.recentActivity.length > 0 && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">
                                Recent Activity
                            </h3>
                            <div className="space-y-2">
                                {user.recentActivity.map((activity, index) => (
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
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;
