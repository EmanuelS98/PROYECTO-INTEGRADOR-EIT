import AppContext from "@/contexts/AppContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import ProductItem from "../product-item/ProductItem";
import ProductNewItem from "../product-new-item/ProductNewItem";
import "./product-gallery.scss";

const ProductGallery = ({ search }) => {
    const { productsContext } = useContext(AppContext);
    const { products, isLoading } = productsContext;

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes((search ?? "").toLowerCase()),
    );

    return (
        <div className="product-gallery">
            <ProductNewItem />
            {filteredProducts.length === 0 && (
                <div className="product-gallery__empty">No se encontraron resultados</div>
            )}
            {filteredProducts.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    isLoading={isLoading}/>
            ))}
        </div>
    );
};

ProductGallery.propTypes = {
    search: PropTypes.string,
};

export default ProductGallery;