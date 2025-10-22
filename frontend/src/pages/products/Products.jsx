import { useState } from "react";
import "../products/search-product/search-product.scss";
import ProductGallery from "./product-gallery/ProductGallery";
import SearchProduct from "./search-product/SearchProduct";

const Products = () => {
    const [ entryValue, setEntryValue ] = useState("");

    const handleChange = (e) => {
        setEntryValue(e.target.value);
    };

    const handleClear = () => {
        setEntryValue("");
    };

    return (
        <div className="products">
            <SearchProduct
                entryValue={entryValue}
                onChange={handleChange}
                onClear={handleClear}/>
            <ProductGallery entryValue={entryValue} />
        </div>
    );
};

export default Products;