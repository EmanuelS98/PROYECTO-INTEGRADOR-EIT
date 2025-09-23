import { Text } from "@/components/texts";
import HighlightedParagraph from "./highlighted-paragraph/HighlightedParagraph";
import HighlightedProducts from "./highlighted-products/HighlightedProducts";
import "./home.scss";

const highlightedProducts = [
    {
        id: 1,
        name: "Producto 1",
        description: "Descripción del producto 1",
        price: 100,
        thumbnail: "images/products/ps5.jpg",
    },
    {
        id: 2,
        name: "Producto 2",
        description: "Descripción del producto 2",
        price: 150,
        thumbnail: "images/products/switch.jpg",
    },
];

const Home = () => {
    return (
        <div className="home">
            <HighlightedParagraph>
                ¡Bienvenido/a! Explora nuestra tienda y encuentra los mejores productos para vos.
            </HighlightedParagraph>
            <Text className="home__text" variant="h3">Productos destacados</Text>
            <HighlightedProducts products={highlightedProducts} />
        </div>
    );
};

export default Home;