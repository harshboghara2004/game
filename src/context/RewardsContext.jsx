import { createContext, useEffect, useState } from "react";
import { fetchUserRewards, claimDailyReward } from "../util/rewardsActions";
import { auth } from "../firebase";
import moment from "moment";

// Create Rewards Context
export const RewardsContext = createContext();

export const RewardsProvider = ({ children }) => {
    const [claimedRewards, setClaimedRewards] = useState([]);
    const [currentCoins, setCurrentCoins] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch rewards & coins when user logs in
    const fetchRewards = async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        setLoading(true);
        const response = await fetchUserRewards(uid);

        if (response.status === 200) {
            setClaimedRewards(response.rewards);
            setCurrentCoins(response.currentCoins || 0);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    // Claim daily reward and update global state
    const claimReward = async (rewardAmount) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return { status: 400, message: "User not logged in!" };

        const response = await claimDailyReward(uid, rewardAmount);
        if (response.status === 200) {
            const todayDate = moment().format("DD-MM-YYYY");

            setClaimedRewards((prev) => [
                {
                    date: todayDate,
                    coins: rewardAmount,
                    timeStamp: moment().format("HH:mm"),
                },
                ...prev,
            ]);
            setCurrentCoins((prev) => prev + rewardAmount);
        }

        return response;
    };

    return (
        <RewardsContext.Provider
            value={{ claimedRewards, currentCoins, loading, claimReward }}
        >
            {children}
        </RewardsContext.Provider>
    );
};
