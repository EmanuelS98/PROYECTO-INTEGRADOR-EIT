import AlertSuccess from "@/components/alerts/AlertSuccessForm";
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext, useState } from "react";
import useShoppingCart from "./shooping-form/shoppingForm.js";
import "./shopping-cart.scss";

const ShoppingCart = () => {
    const { shoppingCartContext, productsContext } = useContext(AppContext);
    const { shoppingCart, addArticle, subtractArticle, removeArticle, clearCart } = shoppingCartContext;
    const { updateProduct, fetchProducts } = productsContext;

    const { formik, isSubmitDisabled } = useShoppingCart();
    const [ openAlert, setOpenAlert ] = useState(false);

    const handleCancel = () => {
        clearCart();
        formik.resetForm();
    };

    const handleBuy = async () => {
        for (const article of shoppingCart.articles) {
            await updateProduct(article.id, { stock: article.stock - article.quantity });
        }

        await fetchProducts();
        clearCart();
        formik.resetForm();
        setOpenAlert(true);
        handleCancel();
    };

    return (
        <div className="shopping-cart">
            <h2 className="shopping-cart__title">Carrito</h2>

            <Table>
                <TableHead className="table__head">
                    <TableRow>
                        <TableCell align="left">Producto</TableCell>
                        <TableCell align="right">Cant.</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Importe</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shoppingCart.articles?.map((article) => (
                        <TableRow key={article.id} className="table__body">
                            <TableCell align="left">{article.name}</TableCell>
                            <TableCell align="right">{article.quantity}</TableCell>
                            <TableCell align="right">${article.price?.toFixed(2)}</TableCell>
                            <TableCell align="right">${article.amount?.toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <Button size="small" onClick={() => addArticle(article.id, 1)}>+</Button>
                                <Button size="small" onClick={() => subtractArticle(article.id, 1)}>-</Button>
                                <Button size="small" color="error" onClick={() => removeArticle(article.id)}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="table__footer">
                <Text className="table__total" variant="p">
                    Total unidades: {shoppingCart.totalQuantity}
                </Text>
                <Text className="table__total" variant="p">
                    Total: ${shoppingCart.totalAmount?.toFixed(2)}
                </Text>
            </div>

            <form onSubmit={formik.handleSubmit} className="table__form">
                <input
                    name="nombre"
                    placeholder="Nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}/>
                <input
                    name="apellido"
                    placeholder="Apellido"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}/>
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}/>
                <input
                    name="telefono"
                    placeholder="Teléfono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}/>

                <div className="table__form--actions">
                    <Button variant="outlined" className="table__btn" color="error" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitDisabled()}
                        onClick={handleBuy}
                        className="table__button">
                        Comprar
                    </Button>
                </div>
            </form>

            <AlertSuccess
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                message="¡Compra realizada con éxito!"/>
        </div>
    );
};

export default ShoppingCart;