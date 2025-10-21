import ErrorService from "../services/error.service.js";
import InquiryService from "../services/inquiry.service.js";
import { validateSendInquiry } from "../validators/inquiry.validator.js";

<<<<<<< HEAD
class InquiryController {
    #inquiryService;

    constructor() {
        this.inquiryService = new InquiryService();
    }

    async sendMail(req, res) {
=======
export default class InquiryController {
    #inquiryService;

    constructor() {
        this.#inquiryService = new InquiryService();
    }

    async sendInquiry(req, res) {
>>>>>>> ef1a34884deca951d691f6da9ebafb1401b38ef7
        try {
            const values = validateSendInquiry(req.body);
            await this.#inquiryService.sendInquiry(values);
            res.status(204).send();
        } catch (error) {
            const handledError = ErrorService.handleError(error);
            res.status(handledError.code).json({ status: "error", message: handledError.message });
        }
    }
}