import { Link } from "lucide-react";

export const GameCard = ({
    id,
    slug,
    gameImage,
    gameUrl,
    gameTitle,
    gameCategory,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={gameImage}
                alt={gameTitle}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{gameTitle}</h3>
                <p className="text-gray-600 text-sm mb-2">
                    Category: {gameCategory}
                </p>
                {gameUrl && (
                    <a
                        href={`/game/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-700"
                    >
                        <Link size={16} className="mr-1" />
                        Play Game
                    </a>
                )}
            </div>
        </div>
    );
};
