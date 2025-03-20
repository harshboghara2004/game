import { useState, useEffect } from "react";
import moment from "moment";

const getDateDifference = (date1, date2) => {
    return moment(date1, "DD-MM-YYYY").diff(
        moment(date2, "DD-MM-YYYY"),
        "days"
    );
};

const getTodayDate = () => moment().format("DD-MM-YYYY");

const useRewards = (claimedRewards) => {
    const todayDate = getTodayDate();
    const [today, setToday] = useState("Day 1");
    const [dailyRewards, setDailyRewards] = useState([
        { day: "Day 1", coins: 100, status: "Upcoming" },
        { day: "Day 2", coins: 150, status: "Upcoming" },
        { day: "Day 3", coins: 200, status: "Upcoming" },
        { day: "Day 4", coins: 250, status: "Upcoming" },
        { day: "Day 5", coins: 300, status: "Upcoming" },
        { day: "Day 6", coins: 400, status: "Upcoming" },
        { day: "Day 7", coins: 500, status: "Upcoming" },
    ]);

    useEffect(() => {
        if (!claimedRewards.length) return;

        let prevDate = todayDate;
        let rewards = [];
        let streakCount = 0;

        for (let i = 0; i < claimedRewards.length; i++) {
            let diff = getDateDifference(prevDate, claimedRewards[i].date);
            prevDate = claimedRewards[i].date;

            if (i === 0 && diff > 1) break;
            if (i > 0 && diff !== 1) break;

            rewards.push(claimedRewards[i]);
            streakCount++;
        }

        if (
            rewards.length > 0 &&
            getDateDifference(rewards[0].date, todayDate) === 0
        ) {
            setToday(`Day ${rewards.length}`);
        } else {
            setToday(`Day ${rewards.length + 1}`);
        }

        const reversedRewards = rewards.slice().reverse();
        const updatedRewards = dailyRewards.map((reward, index) => ({
            ...reward,
            status: reversedRewards[index] ? "Claimed" : "Upcoming",
            timeStamp: reversedRewards[index]?.timeStamp || null,
        }));

        setDailyRewards(updatedRewards);
    }, [claimedRewards]);

    const streak = dailyRewards.filter(
        (reward) => reward.status === "Claimed"
    ).length;

    return {
        dailyRewards,
        streak,
        today,
    };
};

export default useRewards;
