import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHighlightedProducts } from "../../services/productService";
import "./highlighted-products.scss";

const HighlightedProducts = () => {
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHighlighted = async () => {
            try {
                const data = await getHighlightedProducts();
                console.log(data);
                setProducts(data.slice(0, 3));
            } catch (error) {
                console.error("Error al cargar productos destacados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlighted();
    }, []);

    if (loading) {
        return <div className="highlighted-loading">Cargando productos destacados...</div>;
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="highlighted-section">
            <div className="highlighted-container">
                <h2 className="highlighted-title">Productos Destacados</h2>
                <div className="highlighted-grid">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="highlighted-card"
                            onClick={() => navigate(`/products/${product._id}`)}>
                            <div className="highlighted-card__image">
                                <img
                                    src={
                                        product.thumbnail
                                            ? `${import.meta.env.VITE_API_URL}/public/images/products/${product.thumbnail}`
                                            : "/placeholder.svg?height=300&width=300"
                                    }
                                    alt={product.name}
                                    onError={(e) => {
                                        e.target.src = "/placeholder.svg?height=300&width=300";
                                    }}/>
                            </div>
                            <div className="highlighted-card__content">
                                <h3 className="highlighted-card__name">{product.name}</h3>
                                <p className="highlighted-card__price">${product.price}</p>
                                <button
                                    className="highlighted-card__btn"
                                    onClick={(e) => {
                                        e.stopPropagation(); // evita que se ejecute el onClick de la card
                                        navigate("/products"); // redirige al listado general
                                    }}>
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightedProducts;