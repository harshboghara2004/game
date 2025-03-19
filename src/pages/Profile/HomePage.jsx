import { GamepadIcon } from "lucide-react";
import { GoTrophy } from "react-icons/go";
import { MdOutlineFavorite } from "react-icons/md";
import DailyRewards from "../../components/profile-page/DailyRewards";
import { FaCoins } from "react-icons/fa";
import { RewardsContext } from "../../context/RewardsContext";
import { useContext } from "react";

function StatCard({ icon, title, value, change, onClick }) {
    return (
        <div
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                        {title}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold mt-1 dark:text-white">
                        {value}
                    </h3>
                    <p className="text-green-500 text-xs sm:text-sm mt-1">
                        {change}
                    </p>
                </div>
                <div className="text-blue-500 text-lg sm:text-xl">{icon}</div>
            </div>
        </div>
    );
}

const HomePage = ({ name, noOfFavoriteGames, setCurrentPage }) => {
    const { currentCoins } = useContext(RewardsContext);

    return (
        <div className="px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white ml-4 lg:ml-0 mb-6">
                Welcome, {name}
            </h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                <StatCard
                    icon={<FaCoins size={20} />}
                    title="Total Coins"
                    value={currentCoins}
                    change={`+${currentCoins} added this week`}
                    onClick={() => setCurrentPage("home")}
                />
                <StatCard
                    icon={<GamepadIcon size={20} />}
                    title="Games Played"
                    value="156"
                    change="+8.2% from last month"
                    onClick={() => setCurrentPage("activity")}
                />
                <StatCard
                    icon={<MdOutlineFavorite size={20} />}
                    title="Favorite Games"
                    value={noOfFavoriteGames}
                    change={`+${noOfFavoriteGames} new games added`}
                    onClick={() => setCurrentPage("favorite")}
                />
                <StatCard
                    icon={<GoTrophy size={20} />}
                    title="Total Achievements"
                    value="12"
                    change="+2 new categories"
                    onClick={() => setCurrentPage("achievements")}
                />
            </div>

            <DailyRewards />
        </div>
    );
};

export default HomePage;
