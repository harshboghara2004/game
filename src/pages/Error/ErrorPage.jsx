import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import classes from "./ErrorPage.module.css";

const ErrorPage = ({ message = "Please try Again Later." }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className={classes["error-container"]}>
            <h1 className={classes["error-title"]}>Error Occured!</h1>
            <p className={classes["error-message"]}>{message}</p>
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

export default ErrorPage;
