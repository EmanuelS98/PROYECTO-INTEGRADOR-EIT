import PropTypes from "prop-types";
import "./highlighted-product-card.scss";

const HighlightedProductCard = ({ product }) => (
    <div className="highlighted-product-card">
        <img src={`/${product.thumbnail}`} alt={product.name}/>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span>${product.price.toFixed(2)}</span>
    </div>
);

HighlightedProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
    }).isRequired,
};

export default HighlightedProductCard;