import path from "path";

// Obtiene la ruta del directorio raíz del proyecto
const ROOT_PATH = path.resolve();

// Define las rutas relativas del proyecto
const paths = {
    root: ROOT_PATH,
    src: path.join(ROOT_PATH, "src"),
    public: path.join(ROOT_PATH, "public"),
    data: path.join(ROOT_PATH, "src", "data"),
    images: path.join(ROOT_PATH, "public", "images"),
<<<<<<< HEAD
    imageProducts: path.join(ROOT_PATH, "public", "images", "products"),
=======
    imagesProducts: path.join(ROOT_PATH, "public", "images", "products"),
>>>>>>> ef1a34884deca951d691f6da9ebafb1401b38ef7
};

export default paths;