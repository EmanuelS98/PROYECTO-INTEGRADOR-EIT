import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import ProductItem from "../product-item/ProductItem";
import ProductNewItem from "../product-new-item/ProductNewItem";
import "./product-gallery.scss";

const ProductGallery = ({ entryValue }) => {
    const { productsContext } = useContext(AppContext);
    const { products, isLoading } = productsContext;

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes((entryValue ?? "").toLowerCase()),
    );

    return (
        <div className="product-gallery">
            <ProductNewItem />

            {filteredProducts.length === 0 ? (
                <Text variant="p" className="no-result">No se encontraron resultados...</Text>
            ) : (
                filteredProducts.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        isLoading={isLoading}/>
                ))
            )}
        </div>
    );
};
ProductGallery.propTypes = {
    entryValue: PropTypes.string,
};

export default ProductGallery;