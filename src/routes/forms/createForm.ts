import express, { Request, Response } from "express";
import validator from "../../helpers/validator";
import schema from "./../forms/schema"
import authentication from "../../auth/authentication";
import FormRepo from "../../database/repositories/FormRepo";
import Form from "../../database/model/Form";
import { userDbSchemas } from "../../database/model/MultiDatabase";
import { switchDatabases } from "../../database/helpers/switcher";

const router = express.Router();

//Authentication is done firstly before providing the createForm functinality.
router.use(authentication);

router.post('/', 
    validator(schema.createForm),
    async (req : Request, res : Response) => {
        const userId = req.query.id as string;
        const { form } = await FormRepo.createForm({
          formName : req.body.formName,
          totalSubmissions : req.body.totalSubmissions,
          endpoint : req.body.endpoint,
        } as Form, userId);

        res.status(201).json({ message: "Form Created Successfully\n", form })
    },
  );

export default router;