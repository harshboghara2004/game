import DOMPurify from "dompurify";

const RenderHTML = ({ htmlString }) => {
    const sanitizedHtml = DOMPurify.sanitize(htmlString);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default RenderHTML;
