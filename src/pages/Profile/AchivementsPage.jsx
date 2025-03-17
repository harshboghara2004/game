import React from "react";
import NoResult from "../../components/UI/NoResult";

const AchivementsPage = ({ achievements = [] }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Achievements
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.length === 0 && (
                    <NoResult title="There is no achievements you have." />
                )}
            </div>
        </>
    );
};

export default AchivementsPage;
