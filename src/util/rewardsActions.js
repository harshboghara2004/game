import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

export const claimDailyReward = async (uid, rewardAmount) => {
    try {
        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            console.error("User document does not exist in Firestore!");
            return { status: 404, message: "User not found" };
        }

        const userData = userSnapshot.data();
        const rewards = userData.rewards || [];

        // Format today's date as DD-MM-YYYY
        const todayDate = moment().format("DD-MM-YYYY");
        const claimTime = moment().format("HH:mm");

        // Check if today's reward is already claimed
        const alreadyClaimed = rewards.find(
            (reward) => reward.date === todayDate
        );

        if (alreadyClaimed) {
            console.warn(`Reward for ${todayDate} already claimed!`);
            return {
                status: 400,
                message: `You already claimed today's reward at ${alreadyClaimed.timeStamp}`,
            };
        }

        const newReward = {
            date: todayDate,
            coins: rewardAmount,
            timeStamp: claimTime,
        };

        // Append new reward
        const updatedRewards = [newReward, ...rewards];

        // Update Firestore
        await updateDoc(userRef, {
            rewards: updatedRewards,
            currentCoins: (userData.currentCoins || 0) + rewardAmount,
        });

        console.log(
            `Successfully claimed reward for ${todayDate} at ${claimTime}!`
        );
        return {
            status: 200,
            message: `You received ${rewardAmount} coins at ${claimTime}!`,
        };
    } catch (error) {
        console.error("Error storing reward in Firestore:", error);
        return { status: 500, message: "Failed to claim reward" };
    }
};

export const fetchUserRewards = async (uid) => {
    if (!uid) return { status: 400, message: "User not logged in!" };

    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const sortedRewards = (userData.rewards || [])
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 7); // Get first 7 entries

            return { status: 200, rewards: sortedRewards };
        } else {
            return { status: 404, message: "User data not found!" };
        }
    } catch (error) {
        console.error("Error fetching rewards:", error);
        return { status: 500, message: "Failed to load rewards." };
    }
};
