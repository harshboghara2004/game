import React, { useContext } from "react";
import { RewardsContext } from "../../context/RewardsContext";
import { toast } from "react-toastify";
import moment from "moment";

const DAILY_REWARDS = [
    { day: "Day 1", coins: 100 },
    { day: "Day 2", coins: 150 },
    { day: "Day 3", coins: 200 },
    { day: "Day 4", coins: 250 },
    { day: "Day 5", coins: 300 },
    { day: "Day 6", coins: 400 },
    { day: "Day 7", coins: 500 },
];

const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const DailyRewards = () => {
    const { claimedRewards, currentCoins, loading, claimReward } =
        useContext(RewardsContext);

    const handleClaimReward = async (rewardAmount) => {
        const response = await claimReward(rewardAmount);
        response.status === 200
            ? toast.success(response.message)
            : toast.error(response.message);
    };

    const getRewardStatus = (date) => {
        const reward = claimedRewards.find((r) => r.date === date);
        if (reward)
            return `Claimed at ${convertTo12HourFormat(reward.timeStamp)}`;
        return moment(date, "DD-MM-YYYY").isBefore(moment())
            ? "Not Claimed"
            : "Upcoming";
    };

    return (
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
                Daily Rewards (Coins: {currentCoins})
            </h2>

            {loading ? (
                <p className="text-gray-500 dark:text-gray-400">
                    Loading rewards...
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4">
                    {DAILY_REWARDS.map((reward, index) => {
                        const rewardDate = moment()
                            .startOf("week")
                            .add(index, "days")
                            .format("DD-MM-YYYY");
                        const formattedDate = moment(
                            rewardDate,
                            "DD-MM-YYYY"
                        ).format("D MMM");
                        const statusText = getRewardStatus(rewardDate);
                        const isToday =
                            moment().format("DD-MM-YYYY") === rewardDate;
                        const isClaimed = statusText.includes("Claimed at");
                        const isPast = moment(
                            rewardDate,
                            "DD-MM-YYYY"
                        ).isBefore(moment(), "day");

                        return (
                            <div
                                key={rewardDate}
                                className={`p-3 sm:p-4 rounded-lg text-center border shadow-md text-sm
                                ${
                                    isToday
                                        ? "bg-blue-500 text-white border-blue-600"
                                        : isClaimed
                                        ? "bg-green-100 text-green-800 border-green-300"
                                        : isPast
                                        ? "bg-red-100 text-red-600 border-red-300"
                                        : "bg-gray-100 dark:bg-gray-700 border-gray-300"
                                }`}
                            >
                                <p className="font-medium">{reward.day}</p>
                                <p className="text-base font-semibold">
                                    {reward.coins} Coins
                                </p>

                                {isClaimed ? (
                                    <p className="text-xs sm:text-sm mt-1 font-semibold">
                                        {statusText}
                                    </p>
                                ) : isToday ? (
                                    <button
                                        className="mt-2 w-full px-3 py-1 text-xs sm:text-sm rounded bg-green-500 text-white shadow-md hover:bg-green-600 transition"
                                        onClick={() =>
                                            handleClaimReward(reward.coins)
                                        }
                                    >
                                        Claim Now
                                    </button>
                                ) : (
                                    <p className="text-xs sm:text-sm mt-1 italic opacity-70">
                                        {statusText}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DailyRewards;
