import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(
        <>
            <div className={classes.backdrop} onClick={onClose}></div>
            <div className={classes.modal}>{children}</div>
        </>,
        document.getElementById("modal-root")
    );
};

export default Modal;
