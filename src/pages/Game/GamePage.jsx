import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./GamePage.module.css";
import SideBar from "../../components/game-page/SideBar";
import GamesGrid from "../../components/home-page/GamesGrid";
import GameWindow from "../../components/game-page/GameWindow";
import GameDescription from "../../components/game-page/GameDescription";
import { database } from "../../firebase";
import { onValue, ref } from "firebase/database";
import Loader from "../../components/UI/Loader";
import NotFoundPage from "../Error/NotFoundPage";
import Modal from "../../components/UI/Modal";
import SearchPage from "../Search/SearchPage";
import { motion } from "framer-motion";
import { fetchGames } from "../../util/gamesActions";
import ErrorPage from "../Error/ErrorPage";
import { fetchCategories } from "../../util/categoryActions";
import RedirectCard from "../../components/Cards/RedirectCard";

const divideGames = (games) => {
    const leftSideGames = games.slice(0, 4);
    const rightSideGames = games.slice(4, 9);
    const bottomGames = games.slice(9);
    return { leftSideGames, rightSideGames, bottomGames };
};

const GamePage = () => {
    // console.log(games);
    const { slug } = useParams();

    let currentGame = null;
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSearching, setIsSearching] = useState(false);

    // get all games and categories
    useEffect(() => {
        setIsLoading(true);

        fetchGames().then((response) => {
            if (response.status === 200) {
                setGames(response.data);
            } else {
                setError(response.error);
            }
        });

        fetchCategories().then((response) => {
            if (response.status === 200) {
                setCategories(response.data);
            } else {
                setError(response.error);
            }
            setIsLoading(false);
        });
    }, []);

    let content;
    if (games.length === 0 || isLoading) {
        content = <Loader message="Loading Game..." />;
    } else if (error) {
        content = <ErrorPage message={error} />;
    } else {
        currentGame = games.find((g) => g.slug === slug);
        if (!currentGame) {
            return <NotFoundPage message="Game Not Found" />;
        } else {
            const otherGames = games.filter((g) => g.slug !== currentGame.slug);
            const { leftSideGames, rightSideGames, bottomGames } =
                divideGames(otherGames);
            content = (
                <>
                    <RedirectCard />
                    {/* Game Layout */}
                    <div className={classes["game-layout"]}>
                        {/* Left Sidebar */}
                        <SideBar
                            key="left-sidebar"
                            games={leftSideGames}
                            setIsSearching={setIsSearching}
                            className="left-sidebar"
                            addHome
                        />

                        {/* Game Window */}
                        <GameWindow game={currentGame} />

                        {/* Right Sidebar */}
                        <SideBar
                            key="right-sidebar"
                            games={rightSideGames}
                            className="right-sidebar"
                        />
                    </div>

                    {/* Games Below */}
                    <GamesGrid games={bottomGames} />

                    {/*Description Section: MOVED TO THE END*/}
                    <GameDescription game={currentGame} />
                </>
            );
        }
    }

    return (
        <div className={classes["game-page"]}>
            {isSearching && <div className={classes.dimmedContent}></div>}
            {content}
            {/* Open Search */}
            {isSearching && (
                <Modal onClose={() => setIsSearching(false)}>
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }} // Start off-screen (left)
                        animate={{ x: "0%", opacity: 1 }} // Slide in to view
                        exit={{ x: "-100%", opacity: 0 }} // Slide out when closing
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            type: "spring",
                        }} // Smooth transition
                    >
                        <SearchPage
                            key="search-game"
                            games={games}
                            categories={categories}
                        />
                    </motion.div>
                </Modal>
            )}
        </div>
    );
};

export default GamePage;
