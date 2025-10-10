import fs from "fs";
import path from "path";
import paths from "./paths.js";

// Valida que el nombre del archivo sea válido
const ensureFilename = (filename) => {
    if (!filename) {
        throw new Error("El nombre del archivo es obligatorio");
    }
};

// Verifica si un archivo de imagen existe
export const existsImageFile = async (filename) => {
    try {
        const filePath = path.join(paths.images, filename);
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
};

// Elimina un archivo de imagen de forma segura
export const deleteImageFile = async (filename) => {
    try {
        ensureFilename(filename);

        const pathFile = path.join(paths.images, filename);
        await fs.promises.unlink(pathFile);
    } catch (error) {
        throw new Error(`Error al eliminar la imagen. ${error.message}`);
    }
};