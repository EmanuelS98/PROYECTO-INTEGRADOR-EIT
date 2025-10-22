import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import useShoppingCart from "./shooping-form/shoppingForm";
import "./shopping-cart.scss";

const ShoppingCart = () => {
    const { shoppingCartContext } = useContext(AppContext);
    const { shoppingCart, clearCart } = shoppingCartContext;
    const { formik } = useShoppingCart();

    const handleCancel = () => {
        clearCart();
        formik.resetForm();
    };

    const handleBuy = async () => {
        for (const article of shoppingCart.articles) {
            await updateProduct(article.id, { stock: article.stock - article.quantity });
        }

        await fetchProducts();

        setOpenAlert(true);

        handleCancel();
    };
    return (
        <div className="shopping-cart">

            <Table>
                <TableHead>
                    <TableRow className="table__head">
                        <TableCell align="left">Producto</TableCell>
                        <TableCell align="right">Cant.</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Importe</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shoppingCart.articles?.map((article)=>(
                        <TableRow key={article.id} className="table__body">
                            <TableCell align="left">{article.name}</TableCell>
                            <TableCell align="right">{article.quantity}</TableCell>
                            <TableCell align="right">${article.price?.toFixed(2)}</TableCell>
                            <TableCell align="right">${article.amount?.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <>
                <Button variant="outlined" color="error" onClick={handleCancel}>Cancelar</Button>
                <Button
                    className="shopping-cart__button"
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleBuy}>
                        Comprar
                </Button>
            </>

            <div className="table__footer">
                <Text className="table__total" variant="p">Total: ${shoppingCart.totalAmount?.toFixed(2)}</Text>
            </div>
        </div>
    );
};

export default ShoppingCart;