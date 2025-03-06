import React from "react";
import { Eye } from "lucide-react";
import "./GameWindowBottomBar.css";

const GameWindowBottomBar = ({ title, whoCreated, image, views = 0 }) => {
    return (
        <div className="bottom-bar">
            {/* Left Side: Image, Name, Who Created */}
            <div className="left-section">
                <img src={image} alt="Thumbnail" className="thumbnail" />
                <div className="text-info">
                    <span className="name">{title}</span>
                    <span className="creator">by {whoCreated}</span>
                </div>
            </div>

            {/* Right Side: Icon and Views Text */}
            <div className="right-section">
                <Eye className="icon" />
                <span className="views">{views}</span>
            </div>
        </div>
    );
};

export default GameWindowBottomBar;
