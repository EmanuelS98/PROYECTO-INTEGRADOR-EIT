"use client";

import HighlightedProducts from "@/components/HighlightedProducts/HighlightedProducts";
import { Text } from "@/components/texts";
import { useNavigate } from "react-router-dom";
import "./home.scss";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="hero">
                <div className="hero__overlay">
                    <div className="hero__content">
                        <Text variant="h2" className="hero__title">
              Equipate como un pro
                        </Text>
                        <Text variant="p" className="hero__subtitle">
              Descubrí los mejores periféricos y armá tu setup soñado.
                        </Text>
                        <button className="hero__cta" onClick={() => navigate("/products")}>
              Ver productos
                        </button>
                    </div>
                </div>
            </div>

            <HighlightedProducts />
        </>
    );
};

export default Home;