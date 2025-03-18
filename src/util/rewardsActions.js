import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore instance
import moment from "moment";

/**
 * Claims today's reward and updates Firestore.
 * @param {string} uid - The user's UID (Firestore document ID).
 * @param {number} rewardAmount - The reward amount to be added.
 * @returns {Promise<{status: number, message: string}>}
 */
export const claimDailyReward = async (uid, rewardAmount) => {
    try {
        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
            return { status: 404, message: "User not found" };
        }

        const userData = userSnapshot.data();
        const lastClaimedDate = userData.lastClaimedDate || null;
        const currentReward = userData.rewards || 0;

        const today = moment().format("YYYY-MM-DD"); // Get today's date in YYYY-MM-DD format

        // Check if the reward has already been claimed today
        if (lastClaimedDate === today) {
            return { status: 400, message: "Reward already claimed for today" };
        }

        // Update the user's rewards and set last claimed date
        await updateDoc(userRef, {
            rewards: currentReward + rewardAmount,
            lastClaimedDate: today,
        });

        return {
            status: 200,
            message: `Successfully claimed ${rewardAmount} coins`,
        };
    } catch (error) {
        console.error("Error claiming reward:", error);
        return { status: 500, message: "Failed to claim reward" };
    }
};
