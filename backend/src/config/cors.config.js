import cors from "cors";

export const config = (app) => {
    app.use(cors({
        origin: "mi-tienda.com",
        methods:"GET,POST,PUT,DELETE,PATCH",
    }));
};