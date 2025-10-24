"use client";

import { Text } from "@/components/texts";
import { getHighlightedProducts } from "@/services/productService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./highlighted-products.scss";

const HighlightedProducts = () => {
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHighlighted = async () => {
            try {
                const data = await getHighlightedProducts();
                // Limitar a 3 productos
                setProducts(data.slice(0, 3));
            } catch (err) {
                setError("No se pudieron cargar los productos destacados");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlighted();
    }, []);

    if (loading) {
        return (
            <section className="highlighted-products">
                <div className="highlighted-products__container">
                    <Text variant="h2" className="highlighted-products__title">
            Productos Destacados
                    </Text>
                    <div className="highlighted-products__loading">Cargando...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="highlighted-products">
                <div className="highlighted-products__container">
                    <Text variant="h2" className="highlighted-products__title">
            Productos Destacados
                    </Text>
                    <div className="highlighted-products__error">{error}</div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="highlighted-products">
            <div className="highlighted-products__container">
                <Text variant="h2" className="highlighted-products__title">
          Productos Destacados
                </Text>
                <div className="highlighted-products__grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card" onClick={() => navigate(`/products/${product._id}`)}>
                            <div className="product-card__image">
                                <img
                                    src={
                                        product.thumbnail
                                            ? `${import.meta.env.VITE_API_URL}/public/images/products/${product.thumbnail}`
                                            : "/placeholder.svg?height=300&width=300"
                                    }
                                    alt={product.name || "Producto"}
                                    onError={(e) => {
                                        e.target.src = "/placeholder.svg?height=300&width=300";
                                    }}/>
                            </div>
                            <div className="product-card__content">
                                <Text variant="h3" className="product-card__title">
                                    {product.title}
                                </Text>
                                <Text variant="p" className="product-card__category">
                                    {product.category}
                                </Text>
                                <div className="product-card__footer">
                                    <Text variant="p" className="product-card__price">
                    ${product.price.toLocaleString("es-AR")}
                                    </Text>
                                    <button className="product-card__button">Ver más</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightedProducts;