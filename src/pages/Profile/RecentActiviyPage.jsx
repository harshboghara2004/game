import React from "react";
import NoResult from "../../components/UI/NoResult";

const RecentActivityPage = ({ activities = [] }) => {
    return (
        <div className="min-h-screen">
            <div className="ml-8 lg:ml-0 flex justify-between items-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Recent Activities
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activities.length === 0 ? (
                    <NoResult title="No recent activity found." />
                ) : (
                    activities.map((activity, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                {activity.title}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                {activity.description}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivityPage;
