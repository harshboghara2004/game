import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminSideBar.css";

const AdminSideBar = ({ selectedTab, setCurrentTab }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };

    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li
                    className={selectedTab === "games" ? "active" : ""}
                    onClick={() => setCurrentTab("games")}
                >
                    Games
                </li>
                <li
                    className={selectedTab === "categories" ? "active" : ""}
                    onClick={() => setCurrentTab("categories")}
                >
                    Categories
                </li>
            </ul>
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
        </div>
    );
};

export default AdminSideBar;
