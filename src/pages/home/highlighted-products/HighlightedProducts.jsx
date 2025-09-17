import PropTypes from "prop-types";
import HighlightedProductCard from "../highlighted-product-card/HighlightedProductCard";
import "./highlighted-products.scss";

const HighlightedProducts = ({ products }) => (
    <div className="highlighted-products">
        {products.map( (product) => (
            <HighlightedProductCard key={product.id} product={product} />
        ))}
    </div>
);

HighlightedProducts.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.number.isRequired,
            thumbnail: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default HighlightedProducts;