import React, { useEffect, useState } from "react";
import { claimDailyReward, fetchUserRewards } from "../../util/rewardsActions";
import { auth } from "../../firebase";
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

const DailyRewards = () => {
    const [claimedRewards, setClaimedRewards] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch current Rewards
    useEffect(() => {
        const fetchRewards = async () => {
            const uid = auth.currentUser?.uid;
            if (!uid) return;

            setLoading(true);
            const response = await fetchUserRewards(uid);

            if (response.status === 200) {
                setClaimedRewards(response.rewards);
            } else {
                toast.error(response.message);
            }

            setLoading(false);
        };

        fetchRewards();
    }, []);

    const handleClaimReward = async (rewardAmount) => {
        const uid = auth.currentUser?.uid;
        if (!uid) {
            toast.error("User not logged in!");
            return;
        }

        const response = await claimDailyReward(uid, rewardAmount);
        if (response.status === 200) {
            const todayDate = moment().format("DD-MM-YYYY");
            setClaimedRewards((prev) => [
                ...prev,
                {
                    date: todayDate,
                    coins: rewardAmount,
                    timeStamp: moment().format("HH:mm"),
                },
            ]);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    const getRewardStatus = (date) => {
        const reward = claimedRewards.find((r) => r.date === date);
        if (reward) return `Claimed at ${reward.timeStamp}`;
        return moment(date, "DD-MM-YYYY").isBefore(moment())
            ? "Not Claimed"
            : "Upcoming";
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Daily Rewards
            </h2>

            {loading ? (
                <p className="text-gray-500 dark:text-gray-400">
                    Loading rewards...
                </p>
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {DAILY_REWARDS.map((reward, index) => {
                        const rewardDate = moment()
                            .startOf("week")
                            .add(index, "days")
                            .format("DD-MM-YYYY");
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
                                className={`p-4 rounded-lg text-center border shadow-md
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
                                <p className="text-sm font-medium">
                                    {reward.day}
                                </p>
                                <p className="text-lg font-semibold">
                                    {reward.coins} Coins
                                </p>

                                {isClaimed ? (
                                    <p className="text-sm mt-2 font-semibold">
                                        {statusText}
                                    </p>
                                ) : isToday ? (
                                    <button
                                        className="mt-2 px-3 py-1 text-sm rounded bg-green-500 text-white shadow-md hover:bg-green-600 transition"
                                        onClick={() =>
                                            handleClaimReward(reward.coins)
                                        }
                                    >
                                        Claim Now
                                    </button>
                                ) : (
                                    <p className="text-sm mt-2 italic opacity-70">
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
