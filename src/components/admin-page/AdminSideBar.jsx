import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import classes from "./AdminSideBar.module.css";

const AdminSideBar = ({ selectedTab, setCurrentTab }) => {
    const navigate = useNavigate();

    // handle log out
    const handleLogout = () => {
        auth.signOut();
        navigate("/");
    };

    return (
        <div className={classes.sidebar}>
            <h2>Admin Panel</h2>
            <ul>
                <li
                    className={selectedTab === "games" ? classes.active : ""}
                    onClick={() => setCurrentTab("games")}
                >
                    Games
                </li>
                <li
                    className={
                        selectedTab === "categories" ? classes.active : ""
                    }
                    onClick={() => setCurrentTab("categories")}
                >
                    Categories
                </li>
            </ul>
            <button onClick={handleLogout} className={classes["logout-btn"]}>
                Logout
            </button>
        </div>
    );
};

export default AdminSideBar;
