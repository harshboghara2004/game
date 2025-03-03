import React from "react";
import './FixedIframe.css'; // Import CSS for styling

const FixedIframe = ({ src, title }) => {
  return (
    <div className="iframe-container">
      <iframe
        src={src} // URL of the content to display
        title={title}
        className="fixed-iframe"
        frameBorder="0"
      
      ></iframe>
    </div>
  );
};

export default FixedIframe;