import React from "react";

const NoResult = () => {
    return (
        <div
            style={{
                gridColumn: "span 4",
                width: "100%",
                maxWidth: "1000px",
                padding: "40px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h2
                style={{
                    fontSize: "35px",
                    marginBottom: "10px",
                    color: "#333",
                    fontFamily: '"Sour Gummy", sans-serif',
                    fontWeight: 500,
                    fontStyle: "normal",
                }}
            >
                Hmm, nothing’s coming up for that.
            </h2>
            <p
                style={{
                    fontSize: "15px",
                    color: "#777",
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 600,
                    fontStyle: "normal",
                }}
            >
                Try searching for something else or play one of these great
                games.
            </p>
        </div>
    );
};

export default NoResult;
