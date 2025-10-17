import cors from "cors";

// Configuración de CORS para permitir peticiones desde el frontend
export const config = (app) => {
    app.use(
        cors({
            origin: function (origin, callback) {
                // Permitir sin origin (Postman, etc.)
                if (!origin) return callback(null, true);

                // Permitir cualquier localhost (sin importar puerto)
                if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) {
                    return callback(null, true);
                }

                // Permitir dominios de producción en Vercel
                const allowedOrigins = [
                    "https://proyecto-integrador-eit-three.vercel.app/",
                    "https://proyecto-integrador-eit-q-git-69d326-emanuels-projects-24f1eb50.vercel.app/",
                ];
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }

                // Si no matchea ninguno → rechazar
                return callback(new Error("No permitido por CORS: " + origin));
            },
            credentials: true,
            methods: [ "GET", "POST", "PUT", "DELETE", "OPTIONS" ],
            allowedHeaders: [ "Content-Type", "Authorization" ],
        }),
    );
};