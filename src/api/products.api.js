const KEY_PRODUCTS = "products";

const generateId = (products) => {
    let maxId = 0;

    products.forEach((item) => {
        if (item.id > maxId){
            maxId = item.id;
        }
    });

    return maxId + 1;
};

const generateSampleProducts = () => {
    const sampleProducts = [
        { id: 1, name: "Laptop Gaming", description: "Laptop de alto rendimiento para gaming", price: 1200, stock: 5, thumbnail: "img001.jpg" },
        { id: 2, name: "Mouse Inalámbrico", description: "Mouse ergonómico inalámbrico", price: 45, stock: 20, thumbnail: "img002.jpg" },
        { id: 3, name: "Teclado Mecánico", description: "Teclado mecánico RGB", price: 120, stock: 15, thumbnail: "img003.jpg" },
        { id: 4, name: "Monitor 4K", description: "Monitor 27 pulgadas 4K", price: 350, stock: 8, thumbnail: "img001.jpg" },
        { id: 5, name: "Auriculares", description: "Auriculares con cancelación de ruido", price: 200, stock: 12, thumbnail: "img002.jpg" },
        { id: 6, name: "Webcam HD", description: "Cámara web 1080p", price: 80, stock: 25, thumbnail: "img003.jpg" },
        { id: 7, name: "Micrófono USB", description: "Micrófono de estudio USB", price: 90, stock: 18, thumbnail: "img001.jpg" },
        { id: 8, name: "Tablet Pro", description: "Tablet profesional 12 pulgadas", price: 800, stock: 6, thumbnail: "img002.jpg" },
        { id: 9, name: "Smartphone", description: "Teléfono inteligente última generación", price: 600, stock: 10, thumbnail: "img003.jpg" },
        { id: 10, name: "Cargador Inalámbrico", description: "Cargador inalámbrico rápido", price: 35, stock: 30, thumbnail: "img001.jpg" },
        { id: 11, name: "Power Bank", description: "Batería externa 20000mAh", price: 50, stock: 22, thumbnail: "img002.jpg" },
        { id: 12, name: "Cable USB-C", description: "Cable USB-C de alta velocidad", price: 15, stock: 40, thumbnail: "img003.jpg" },
        { id: 13, name: "Adaptador HDMI", description: "Adaptador USB-C a HDMI", price: 25, stock: 35, thumbnail: "img001.jpg" },
        { id: 14, name: "Funda Protectora", description: "Funda protectora para laptop", price: 30, stock: 28, thumbnail: "img002.jpg" },
        { id: 15, name: "Soporte Monitor", description: "Soporte ajustable para monitor", price: 60, stock: 16, thumbnail: "img003.jpg" },
        { id: 16, name: "Alfombrilla Gaming", description: "Alfombrilla RGB para gaming", price: 40, stock: 24, thumbnail: "img001.jpg" },
        { id: 17, name: "Hub USB", description: "Hub USB con múltiples puertos", price: 35, stock: 32, thumbnail: "img002.jpg" },
        { id: 18, name: "Disco Duro Externo", description: "Disco duro externo 1TB", price: 80, stock: 14, thumbnail: "img003.jpg" },
        { id: 19, name: "Memoria RAM", description: "Memoria RAM DDR4 16GB", price: 120, stock: 8, thumbnail: "img001.jpg" },
        { id: 20, name: "SSD NVMe", description: "SSD NVMe 500GB", price: 100, stock: 12, thumbnail: "img002.jpg" },
    ];
    return sampleProducts;
};

const getProductsFromLocalStorage = () => {
    const data = localStorage.getItem(KEY_PRODUCTS);
    let products = JSON.parse(data) || [];
    
    // Si hay menos de 20 productos, generar productos de ejemplo
    if (products.length < 20) {
        const sampleProducts = generateSampleProducts();
        // Mantener productos existentes y agregar los que faltan
        const existingIds = products.map(p => p.id);
        const newProducts = sampleProducts.filter(p => !existingIds.includes(p.id));
        products = [...products, ...newProducts];
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
    }
    
    return products;
};

const fetchProducts = () => {
    return new Promise((resolve) => {
        resolve(getProductsFromLocalStorage());
    });
};

const fetchProductById = (id) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const product = products.find((item) => item.id === parseInt(id));
        if (!product) {
            reject(new Error("Producto no encontrado."));
        }

        resolve(product);
    });
};

const createProduct = (values) => {
    return new Promise((resolve) => {
        const products = getProductsFromLocalStorage();

        const product = { ...values, id: generateId(products) };
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify([ ...products, product ]));

        resolve(product);
    });
};

const updateProduct = (id, values) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const index = products.findIndex((item) => item.id === parseInt(id));
        if (index === -1) {
            reject(new Error("Producto no encontrado."));
        }

        products[index] = { ...products[index], ...values };
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));

        resolve(products[index]);
    });
};

const removeProduct = (id) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const index = products.findIndex((item) => item.id === parseInt(id));
        if (index === -1) {
            reject(new Error("Producto no encontrado."));
        }

        const updatedProducts = products.filter((item) => item.id !== parseInt(id));
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(updatedProducts));

        resolve(products[index]);
    });
};

const checkProductStock = (id, quantity) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const product = products.find((item) => item.id === parseInt(id));
        if (!product) {
            reject(new Error("Producto no encontrado."));
        }

        resolve(quantity <= product.stock);
    });
};

export default {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    removeProduct,
    checkProductStock,
};