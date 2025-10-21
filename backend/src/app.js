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

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Declaración de rutas
app.use("/api/institutions", institutionRouter);
app.use("/api/products", productRouter);
app.use("/api/inquiry", inquiryRouter);

// Control de rutas inexistentes
app.use((req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

<<<<<<< HEAD
// Método oyente de solicitudes
if( process.env.NODE_ENV !== "production") {
=======
// Método oyente de solicitudes (solo para desarrollo local)
if (process.env.NODE_ENV !== "production") {
>>>>>>> ef1a34884deca951d691f6da9ebafb1401b38ef7
    app.listen(PORT, HOST, () => {
        console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    });
}

<<<<<<< HEAD
=======
// Exportar aplicación para desplegar en Vercel
>>>>>>> ef1a34884deca951d691f6da9ebafb1401b38ef7
export default app;