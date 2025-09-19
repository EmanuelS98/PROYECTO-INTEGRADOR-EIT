import Slider from "@/components/slider/Slider";
import { Text } from "@/components/texts";
import HighlightedParagraph from "./highlighted-paragraph/HighlightedParagraph";
import HighlightedProducts from "./highlighted-products/HighlightedProducts";
import "./home.scss";

// Ejemplo de productos destacados
const highlightedProducts = [
    {
        id: 1,
        name: "Producto 1",
        description: "Descripción del producto 1",
        price: 100,
        thumbnail: "images/products/img003.jpg",
    },
    {
        id: 2,
        name: "Producto 2",
        description: "Descripción del producto 2",
        price: 150,
        thumbnail: "images/products/img001.jpg",
    },
];

const Home = () => {
    return (
        <div className="home">
            <Slider />
            <Text variant="h2">Inicio</Text>
            <HighlightedParagraph>
                ¡Bienvenido/a! Explora nuestra tienda y encuentra los mejores productos para vos.
            </HighlightedParagraph>
            <Text variant="h3">Productos destacados</Text>
            <HighlightedProducts products={highlightedProducts} />
        </div>
    );
};

export default Home;