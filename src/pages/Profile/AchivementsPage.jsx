import React from "react";
import NoResult from "../../components/UI/NoResult";

const AchievementsPage = ({ achievements = [] }) => {
    return (
        <div className="min-h-screen">
            <div className="ml-8 lg:ml-0 flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center sm:text-left">
                    Achievements
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.length === 0 && (
                    <NoResult title="You have no achievements yet." />
                )}
                {achievements.map((achievement, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {achievement.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {achievement.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsPage;
