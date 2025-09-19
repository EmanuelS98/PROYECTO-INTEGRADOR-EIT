import AlertSuccessForm from "@/components/alerts/AlertSuccessForm";
import { ButtonDanger, ButtonPrimary } from "@/components/buttons";
import { InputEmail, InputName, InputPhone, InputSurname } from "@/components/inputs";
import { Text } from "@/components/texts";
import AppContext from "@/contexts/AppContext";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./shopping-cart.scss";

const ShoppingCart = () => {
    const { shoppingCartContext, productsContext } = useContext(AppContext);
    const { shoppingCart, removeArticle, clearCart } = shoppingCartContext;
    const { updateProduct } = productsContext;
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        surname: Yup.string().required("El apellido es requerido"),
        email: Yup.string().email("Email inválido").required("El email es requerido"),
        phone: Yup.string().required("El teléfono es requerido"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            phone: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await handlePurchase(values);
        },
    });

    const handleRemoveArticle = (id) => {
        removeArticle(id);
    };

    const handleCancel = () => {
        clearCart();
        formik.resetForm();
    };

    const handlePurchase = async (customerData) => {
        try {
            // Validar stock para todos los productos
            for (const article of shoppingCart.articles) {
                const product = await productsContext.fetchProductById(article.id);
                if (article.quantity > product.stock) {
                    alert(`Stock insuficiente para ${article.name}. Stock disponible: ${product.stock}`);
                    return;
                }
            }

            // Descontar stock y registrar compra
            for (const article of shoppingCart.articles) {
                const product = await productsContext.fetchProductById(article.id);
                const newStock = product.stock - article.quantity;
                await updateProduct(article.id, { stock: newStock });
            }

            // Registrar compra en localStorage
            const purchase = {
                id: Date.now(),
                date: new Date().toISOString(),
                customer: customerData,
                articles: shoppingCart.articles,
                totalAmount: shoppingCart.totalAmount,
                totalQuantity: shoppingCart.totalQuantity,
            };

            const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
            purchases.push(purchase);
            localStorage.setItem('purchases', JSON.stringify(purchases));

            // Limpiar carrito y mostrar éxito
            clearCart();
            formik.resetForm();
            setIsSubmitted(true);
        } catch (error) {
            alert("Error al procesar la compra: " + error.message);
        }
    };

    const closeAlert = () => {
        setIsSubmitted(false);
        navigate("/products");
    };

    return (
        <div className="shopping-cart">
            <Text variant="h2">Carrito</Text>

            {shoppingCart.articles?.length > 0 ? (
                <>
                    <Table>
                        <TableHead>
                            <TableRow className="table__head">
                                <TableCell align="left">Producto</TableCell>
                                <TableCell align="right">Cant.</TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Importe</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shoppingCart.articles?.map((article)=>(
                                <TableRow key={article.id} className="table__body">
                                    <TableCell align="left">{article.name}</TableCell>
                                    <TableCell align="right">{article.quantity}</TableCell>
                                    <TableCell align="right">${article.price?.toFixed(2)}</TableCell>
                                    <TableCell align="right">${article.amount?.toFixed(2)}</TableCell>
                                    <TableCell align="center">
                                        <ButtonDanger size="sm" onClick={() => handleRemoveArticle(article.id)}>
                                            Eliminar
                                        </ButtonDanger>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="table__footer">
                        <Text className="table__total" variant="p">
                            Total ({shoppingCart.totalQuantity} unidades): ${shoppingCart.totalAmount?.toFixed(2)}
                        </Text>
                    </div>

                    <div className="shopping-cart__form">
                        <Text variant="h3">Datos del Cliente</Text>
                        <form onSubmit={formik.handleSubmit}>
                            <InputName formik={formik} />
                            <InputSurname formik={formik} />
                            <InputEmail formik={formik} />
                            <InputPhone formik={formik} />
                            
                            <div className="shopping-cart__actions">
                                <ButtonPrimary type="submit" disabled={formik.isSubmitting}>
                                    Comprar
                                </ButtonPrimary>
                                <ButtonDanger type="button" onClick={handleCancel}>
                                    Cancelar
                                </ButtonDanger>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <div className="shopping-cart__empty">
                    <Text variant="p">El carrito está vacío</Text>
                    <ButtonPrimary onClick={() => navigate("/products")}>
                        Ver Productos
                    </ButtonPrimary>
                </div>
            )}

            <AlertSuccessForm
                open={isSubmitted}
                message="¡Compra realizada con éxito!"
                onClose={closeAlert}
            />
        </div>
    );
};

export default ShoppingCart;