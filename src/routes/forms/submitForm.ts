import express, { Request, Response } from "express";
import validator from "../../helpers/validator";
import schema from "./../forms/schema"
import authentication from "../../auth/authentication";
import FormRepo from "../../database/repositories/FormRepo";

const router = express.Router();

router.post('/',
    validator(schema.submitForm),
    async (req: Request, res: Response) => {
        try {
            const formData = req.body;
            const reqParams = req.query.endpoint?.toString();
            const idArray = reqParams?.split("-");
            if (!idArray || idArray.length === 0) {
                throw "User Credentials Are Not Appropriate";
            }
            const userId = idArray[0];
            const formId = idArray[1];

            const { submittedForm } = await FormRepo.submitForm(formData, formId, userId);

            res.status(201).json({ message: "Form Submitted Successfully\n", submittedForm })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },
);

export default router;