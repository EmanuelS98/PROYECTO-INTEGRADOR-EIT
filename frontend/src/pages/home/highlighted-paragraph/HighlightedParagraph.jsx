import PropTypes from "prop-types";
import "./highlighted-paragraph.scss";

const HighlightedParagraph = ({ children }) => (
    <p className="highlighted-paragraph">{children}</p>
);

HighlightedParagraph.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HighlightedParagraph;