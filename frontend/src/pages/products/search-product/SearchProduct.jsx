import { Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import "./search-product.scss";

const SearchProduct = ({ entryValue, onChange, onClear }) => {
    return (
        <div className="search-product">
            <TextField
                className="search-input"
                placeholder="Buscar producto..."
                onChange={onChange}
                value={entryValue}/>

            <Button className="clear-button" variant="contained" onClick={onClear}>
                Limpiar
            </Button>
        </div>
    );
};

SearchProduct.propTypes = {
    entryValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
};

export default SearchProduct;