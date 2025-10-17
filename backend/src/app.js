import "dotenv/config";
import express from "express";
import { config as configCors } from "./config/cors.config.js";
import { config as configJson } from "./config/json.config.js";
import { connectDB } from "./config/mongoose.config.js";
import { config as configStatic } from "./config/static.config.js";

import inquiryRouter from "./routes/inquiry.router.js";
import institutionRouter from "./routes/institution.router.js";
import productRouter from "./routes/product.router.js";

const app = express();
configCors(app);
configJson(app);
configStatic(app);
configCors(app);
connectDB();
configStatic(app);

// Declaración de rutas
app.use("/api/institutions", institutionRouter);
app.use("/api/products", productRouter);
app.use("/api/inquiry", inquiryRouter);

if (process.env.NODE_ENV === "production") {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);

    app.use(express.static(path.join(dirname, "../../frontend/dist")));

    // Catch-all → React Router
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
}

// Control de rutas inexistentes (solo para desarrollo)
app.use((req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// ✅ Solo escuchar en entorno local
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;
    const HOST = process.env.HOST || "localhost";

    // Método oyente de solicitudes (solo para desarrollo local)
    if (process.env.NODE_ENV !== "production") {
        app.listen(PORT, HOST, () => {
            console.log(`Ejecutándose en http://${HOST}:${PORT}`);
        });
    }
}

// Exportar aplicación para desplegar en Vercel
export default app;