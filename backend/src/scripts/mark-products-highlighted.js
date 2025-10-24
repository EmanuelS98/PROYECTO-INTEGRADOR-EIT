// Script para marcar productos como destacados en MongoDB
// Ejecutar con: node scripts/mark-products-highlighted.js

import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Conectar a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

// Definir el esquema de producto (ajusta según tu modelo)
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model("Product", productSchema);

// Función para marcar productos como destacados
const markProductsAsHighlighted = async () => {
    try {
    // OPCIÓN 1: Marcar productos específicos por ID
    // Reemplaza estos IDs con los IDs reales de tus productos
        const productIds = [
            "507f1f77bcf86cd799439011", // Reemplaza con ID real
            "507f1f77bcf86cd799439012", // Reemplaza con ID real
            "507f1f77bcf86cd799439013", // Reemplaza con ID real
        ];

        const result = await Product.updateMany({ _id: { $in: productIds } }, { $set: { highlighted: true } });

        console.log(`✅ ${result.modifiedCount} productos marcados como destacados`);

        // OPCIÓN 2: Marcar los primeros 3 productos (si no tienes IDs específicos)
        // Descomenta esto si quieres usar esta opción
        /*
        const products = await Product.find().limit(3);
        for (const product of products) {
            product.highlighted = true;
            await product.save();
            console.log(`✅ Producto "${product.title}" marcado como destacado`);
        }
        */

        // OPCIÓN 3: Marcar productos por categoría
        // Descomenta esto si quieres marcar productos de una categoría específica
    /*
        const result = await Product.updateMany(
            { category: 'Teclados' }, // Cambia la categoría según necesites
            { $set: { highlighted: true } }
        );
        console.log(`✅ ${result.modifiedCount} productos de la categoría marcados como destacados`);
        */
    } catch (error) {
        console.error("❌ Error al marcar productos:", error);
    } finally {
        await mongoose.connection.close();
        console.log("🔌 Desconectado de MongoDB");
    }
};

// Ejecutar el script
connectDB().then(() => {
    markProductsAsHighlighted();
});