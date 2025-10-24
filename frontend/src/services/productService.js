const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Obtener todos los productos
export const getAllProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }

        const data = await response.json();
        return data.payload;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const getHighlightedProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/api/products/highlighted`);

        if (!response.ok) {
            throw new Error("Error al obtener productos destacados");
        }

        const data = await response.json();
        return data.payload;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};