import { useNavigate } from "react-router-dom";
import classes from "./NotFoundPage.module.css";
import { motion } from "framer-motion";

const NotFoundPage = ({ statusCode = 404, message = "Page Not Found" }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className={classes["not-found-container"]}>
            <h1 className={classes["not-found-title"]}>{statusCode}</h1>
            <p className={classes["not-found-message"]}>{message}</p>
            <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleClick}
                className={classes["home-link"]}
            >
                Go Back Home
            </motion.button>
        </div>
    );
};

export default NotFoundPage;
