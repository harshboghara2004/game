import React from "react";
import NoResult from "../../components/UI/NoResult";

const RecentActiviyPage = ({ activities = [] }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Recent Activities
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activities.length === 0 && (
                    <NoResult title="There is no activity found." />
                )}
            </div>
        </>
    );
};

export default RecentActiviyPage;
