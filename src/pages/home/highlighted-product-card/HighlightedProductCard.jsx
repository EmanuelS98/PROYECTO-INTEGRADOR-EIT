import PropTypes from "prop-types";
import "./highlighted-product-card.scss";

const HighlightedProductCard = ({ product }) => (
    <div className="highlighted-product-card">
        <img src={`/images/products/${product.thumbnail}`} alt={product.name}/>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
            {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description} </p>
        <span className="product-price">${product.price.toFixed(2)}</span>
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