import { sendMail } from "../utils/mailer.js";
import ErrorService from "./error.service.js";

export default class InquiryService {
<<<<<<< HEAD
    async sendInquiry(inquiryData) {
        const { name, surname, phone, email, inquiry } = inquiryData;
=======
    async sendInquiry(data) {
        const { name, surname, phone, email, inquiry } = data;
>>>>>>> ef1a34884deca951d691f6da9ebafb1401b38ef7

        const from = `"${name} ${surname}" <${process.env.SMTP_RECIPIENT}>`;
        const to = process.env.SMTP_RECIPIENT;
        const subject = "Consulta Web";
        const contentHtml = `
        <div>
            <p>Nombre: ${name}</p>
            <p>Apellido: ${surname}</p>
            <p>Teléfono: ${phone}</p>
            <p>Email: ${email}</p>
            <p>Consulta: ${inquiry}</p>
        </div>`;

        const result = await sendMail(from, to, subject, contentHtml);

        if (!result) {
            throw new ErrorService("Error al enviar el correo");
        }

        return result;
    }
}