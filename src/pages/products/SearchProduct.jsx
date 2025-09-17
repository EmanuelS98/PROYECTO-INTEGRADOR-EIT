import PropTypes from "prop-types";
import { useState } from "react";
import "./search-product.scss";

const SearchProduct = ({ onSearch }) => {
    const [ query, setQuery ] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search-product">
            <input
                type="text"
                placeholder="Buscar producto..."
                value={query}
                onChange={handleChange}/>
        </div>
    );
};

SearchProduct.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchProduct;