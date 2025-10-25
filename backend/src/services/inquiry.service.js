import SibApiV3Sdk from "sib-api-v3-sdk";

export default class InquiryService {
    #apiInstance;

    constructor() {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        this.#apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    }

    async sendInquiry(data) {
        const { name, surname, phone, email, inquiry } = data;

        const sendSmtpEmail = {
            sender: {
                email: process.env.SMTP_FROM,
                name: `${name} ${surname}`,
            },
            to: [{
                email: process.env.SMTP_RECIPIENT,
                name: "Administrador",
            }],
            subject: "Consulta Web",
            htmlContent: `
                <div style="font-family: Arial, sans-serif; padding:20px;">
                    <h2 style="color: #333;">Nueva Consulta desde el sitio Web</h2>
                    <p>Nombre: ${name}</p>
                    <p>Apellido: ${surname}</p>
                    <p>Teléfono: ${phone}</p>
                    <p>Email: ${email}</p>
                    <p>Consulta:</p>
                    <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${inquiry}</p>
                </div>
            `,
        };

        try {
            const result = await this.#apiInstance.sendTransacEmail(sendSmtpEmail);
            return result;
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Error al enviar el correo");
        }
    }
}