import { useState } from "react";
import { Text } from "@/components/texts";
import ProductGallery from "./product-gallery/ProductGallery";
import SearchProduct from "./SearchProduct";
import "./products.scss";

const Products = () => {
    const [ search, setSearch ] = useState("");

    return (
        <div className="products">
            <Text variant="h2">Productos</Text>
            <SearchProduct onSearch={setSearch} />
            <ProductGallery search={search} />
        </div>
    );
};

export default Products;