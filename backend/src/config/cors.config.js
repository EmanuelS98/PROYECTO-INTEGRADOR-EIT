import cors from "cors";

// Configuración de CORS para permitir peticiones desde el frontend
export const config = (app) => {
    app.use(cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,PATCH",
    }));
};