import express, { Request, Response } from "express";
import validator from "../../helpers/validator";
import schema from "./../forms/schema"
import authentication from "../../auth/authentication";
import FormRepo from "../../database/repositories/FormRepo";

const router = express.Router();

//Authentication is done firstly before providing the submitForm functinality.
router.use(authentication);

router.post('/',
    validator(schema.submitForm),
    async (req: Request, res: Response) => {
        try {
            const { formData, userId } = req.body;

            const submittedForm = await FormRepo.submitForm(formData, userId.toString());

            res.status(201).json({ message: "Form Submitted Successfully\n", submittedForm })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },
);

export default router;