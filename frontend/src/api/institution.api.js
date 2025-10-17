
import { mission } from "./data/mission.js";
import { values } from "./data/values.js";
import { vision } from "./data/vision.js";

import { API_URL } from "@/constants/api.constant.js";

const fetchInstitution = async () => {
    try {
        const response = await fetch(`${API_URL}/institutions/first`);
        const data = await response.json();

        const initialize = () => {
            const initialData = {
                name: "Gaming Store",
                address: "Sarmiento 3302, Buenos Aires, Argentina",
                phone: "011-4222333",
                email: "gamingstore@miapp.com",
                about: {
                    mission: mission,
                    vision: vision,
                    values: values,
                },
            };
        };

        if (response.status != 200) {
            throw new Error("Error al obtener la institución");
        }

        const institution = data.payload;
        return institution;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default {
    fetchInstitution,
};