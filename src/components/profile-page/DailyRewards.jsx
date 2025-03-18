import React from "react";
import moment from "moment";

const getWeekDaysWithDates = () => {
    const startOfWeek = moment().startOf("isoWeek"); // Monday as the start of the week
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
        const day = startOfWeek.clone().add(i, "days");
        weekDays.push({
            dayName: day.format("ddd"), // Short day name (Mon, Tue, etc.)
            date: day.format("DD MMM"), // Date format (e.g., 04 Mar)
            isCurrentDay: day.isSame(moment(), "day"), // Check if it's today
            isClaimed: day.isBefore(moment(), "day"), // Mark previous days as "claimed"
        });
    }

    return weekDays;
};

const DailyRewards = () => {
    const rewards = [100, 150, 200, 250, 300, 400, 500]; // Rewards per day
    const weekDays = getWeekDaysWithDates();

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
            {weekDays.map((day, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg text-center shadow-md 
                        ${
                            day.isCurrentDay
                                ? "bg-blue-500 text-white font-bold"
                                : "bg-white dark:bg-gray-800"
                        } 
                        ${day.isClaimed ? "opacity-50" : ""}
                    `}
                >
                    <p className="text-lg">{day.dayName}</p>
                    <p className="text-sm">{day.date}</p>
                    <p className="font-semibold">{rewards[index]} coins</p>
                    <p className="text-xs">
                        {day.isClaimed
                            ? "Not Claimed"
                            : day.isCurrentDay
                            ? "Claim Now!"
                            : "Upcoming"}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DailyRewards;
