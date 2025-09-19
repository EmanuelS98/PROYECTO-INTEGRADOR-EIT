import { Text } from "@/components/texts";
import { useEffect, useState } from "react";
import "./slider.scss";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            id: 1,
            title: "¡Bienvenido a nuestra tienda!",
            description: "Descubre los mejores productos tecnológicos",
            image: "/images/products/img001.jpg"
        },
        {
            id: 2,
            title: "Ofertas especiales",
            description: "Encuentra las mejores promociones del mes",
            image: "/images/products/img002.jpg"
        },
        {
            id: 3,
            title: "Productos destacados",
            description: "Los artículos más populares de la temporada",
            image: "/images/products/img003.jpg"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="slider">
            <div className="slider__container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slider__slide ${index === currentSlide ? 'slider__slide--active' : ''}`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="slider__image"
                        />
                        <div className="slider__content">
                            <Text variant="h2" className="slider__title">
                                {slide.title}
                            </Text>
                            <Text variant="p" className="slider__description">
                                {slide.description}
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="slider__indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`slider__indicator ${index === currentSlide ? 'slider__indicator--active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
