import ErrorService from "../services/error.service.js";
import { validateSendInquiry } from "../validators/inquiry.validator.js";

class InquiryController {
    async sendMail(req, res) {
        try {
            const values = validateSendInquiry(req.body);
            await inquiryService.sendInquiry(values);
            res.status(200).json({ status: "success" });
        } catch (error) {
            const handledError = ErrorService.handleError(error);
            res.status(handledError.code).json({ status: "error", message: handledError.message });
        }
    }
}

export default new InquiryController();