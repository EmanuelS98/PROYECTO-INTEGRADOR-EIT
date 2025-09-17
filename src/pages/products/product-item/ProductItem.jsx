import { ButtonPrimary } from "@/components/buttons";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButtonRemove from "@/components/icon-buttons/IconButtonRemove";
import { CardActionArea, Card as MuiCard } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./product-item.scss";

const ProductItem = (props) => {
    const {
        product,
        isLoading,
        className,
        ...restProps
    } = props;

    const navigate = useNavigate();
    const { shoppingCartContext, productsContext } = useContext(AppContext);
    const { addArticle, subtractArticle } = shoppingCartContext;
    const { deleteProduct } = productsContext || {};

    const classes = `product-item ${className ?? ""}`;

    const handleEditProduct = () => {
        navigate(`/products/${product.id}`);
    };

    const handleAddArticle = () => {
        addArticle(product.id, 1);
    };

    const handleSubtractArticle = () => {
        subtractArticle(product.id, 1);
    };

    const handleDeleteProduct = () => {
        if (deleteProduct) {
            deleteProduct(product.id);
        }
    };

    const renderActions = () => {
        if (product.stock === 0) {
            return (<Text variant="p">SIN STOCK</Text>);
        }

        return (
            <>
                <Skeleton className="product-item__actions--skeleton" isLoading={isLoading}>
                    <ButtonPrimary className="product-item__add" size="sm" onClick={handleAddArticle}><AddShoppingCartIcon/></ButtonPrimary>
                </Skeleton>
                <Skeleton className="product-item__actions--skeleton" isLoading={isLoading}>
                    <ButtonPrimary className="product-item__remove" size="sm" onClick={handleSubtractArticle}><RemoveCircleOutlineIcon/></ButtonPrimary>
                </Skeleton>
                <Skeleton className="product-item__actions--skeleton" isLoading={isLoading}>
                    <IconButtonRemove onClick={handleDeleteProduct} />
                </Skeleton>
            </>
        );
    };

    return (
        <MuiCard className={classes} {...restProps}>
            <Skeleton className="product-item__image--skeleton" isLoading={isLoading}>
                <CardActionArea>
                    <img
                        className="product-item__image"
                        src={`/images/products/${product.thumbnail}`}
                        alt="Imagen del producto"
                        onClick={handleEditProduct}/>
                </CardActionArea>
            </Skeleton>

            <div className="product-item__content">
                <Skeleton className="product-item__name--skeleton" isLoading={isLoading}>
                    <Text className="product-item__name" variant="h3">{product.name ?? "Sin nombre"}</Text>
                </Skeleton>
                <Skeleton className="product-item__description--skeleton" isLoading={isLoading}>
                    <Text className="product-item__description" variant="p">{product.description ?? "Sin descripción"}</Text>
                </Skeleton>
                <Skeleton className="product-item__price--skeleton" isLoading={isLoading}>
                    <Text className="product-item__price" variant="span">
                        {typeof product.price === "number" ? `$${product.price.toFixed(2)}` : "Sin precio"}
                    </Text>
                </Skeleton>
            </div>

            <div className="product-item__actions">
                {renderActions()}
            </div>
        </MuiCard>
    );
};

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        stock: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
    className: PropTypes.string,
};

export default ProductItem;