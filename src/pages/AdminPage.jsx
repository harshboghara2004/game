import React, { useState, useEffect } from "react";
import { auth, database, db } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import "./AdminPage.css";
import AdminSideBar from "../components/admin-page/AdminSideBar";
import GameSection from "../components/admin-page/games/GameSection";
import CategorySection from "../components/admin-page/categories/CategorySection";
import NotFoundPage from "./NotFoundPage";
import Loader from "../components/UI/Loader";
import { checkIsAdmin } from "../util/checkAdmin";
import ErrorPage from "./ErrorPage";
import { onAuthStateChanged } from "firebase/auth";

const AdminPage = () => {
    const [games, setGames] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [currentTab, setCurrentTab] = useState("games");

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const currentUserEmail = user.email;
                // console.log("Current User Email:", currentUserEmail);

                try {
                    const response = await checkIsAdmin(currentUserEmail);
                    if (response.status === 200) {
                        setIsAdmin(response.isAdmin);
                    } else {
                        setIsError({ message: response.message });
                    }
                } catch (error) {
                    setIsError({ message: "Failed to check admin status." });
                }
            } else {
                setIsError({ message: "No user is signed in." });
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const gamesRef = ref(database, "games");
        const categoriesRef = ref(database, "categories");

        onValue(gamesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const gameList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setGames(gameList);
            } else {
                setGames([]);
            }
        });

        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const categoryList = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setCategories(categoryList);
            } else {
                setCategories([]);
            }
        });
    }, []);

    let content;
    if (isLoading) {
        content = <Loader message="Loading Admin..." />;
    } else if (isError) {
        content = <ErrorPage message={isError.message} />;
    } else if (!isAdmin) {
        content = (
            <NotFoundPage
                statusCode={401}
                message="Access Denied! You are not an admin."
            />
        );
    } else {
        content = (
            <>
                {" "}
                <AdminSideBar
                    selectedTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
                <div className="content">
                    {currentTab === "games" && <GameSection games={games} />}
                    {currentTab === "categories" && (
                        <CategorySection categories={categories} />
                    )}
                </div>
            </>
        );
    }

    return <div className="admin-container">{content}</div>;
};

export default AdminPage;
