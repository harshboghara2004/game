import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import "./AdminPage.css";
import AdminSideBar from "../components/admin-page/AdminSideBar";
import GameSection from "../components/admin-page/games/GameSection";
import CategorySection from "../components/admin-page/categories/CategorySection";

const AdminPage = () => {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentTab, setCurrentTab] = useState("games");

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

    let content =
        currentTab === "games" ? (
            <GameSection games={games} />
        ) : (
            <CategorySection categories={categories} />
        );

    return (
        <div className="admin-container">
            <AdminSideBar
                selectedTab={currentTab}
                setCurrentTab={setCurrentTab}
            />

            <div className="content">{content}</div>
        </div>
    );
};

export default AdminPage;
