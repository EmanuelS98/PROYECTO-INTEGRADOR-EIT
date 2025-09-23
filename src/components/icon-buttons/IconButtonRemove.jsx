import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PropTypes from "prop-types";
import IconButton from "./IconButton";

const IconButtonRemove = (props) => {
    const { className, onClick, ...restProps } = props;
    const classes = `icon-button__remove ${className ?? ""}`;

    return (
        <IconButton className={classes} onClick={onClick} {...restProps}>
            <DeleteOutlineIcon/>
        </IconButton>
    );
};

IconButtonRemove.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default IconButtonRemove;