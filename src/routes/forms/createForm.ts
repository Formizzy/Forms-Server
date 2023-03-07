import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import User from "../../database/model/User";
import { sign } from "jsonwebtoken";
import validator from "../../helpers/validator";
import schema from "./../forms/schema"
import { secretKey } from "../../config";
import UserRepo from "../../database/repositories/UserRepo";
import { createTokens } from "../../auth/authUtils";
import authentication from "../../auth/authentication";
import FormRepo from "../../database/repositories/FormRepo";
import Form from "../../database/model/Form";

const router = express.Router();

//Authentication is done firstly before providing the createForm functinality.
router.use(authentication);

router.post('/', 
    validator(schema.createForm),

    async (req : Request, res : Response) => {
        const { form } = await FormRepo.createForm({
          formName : req.body.formName,
          totalSubmissions : req.body.totalSubmissions,
          endpoint : req.body.endpoint,
        } as Form);

        res.status(201).json({ message: "Form Created Successfully\n", form })
    },
  );

export default router;