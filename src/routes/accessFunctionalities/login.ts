import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import User from "../../database/model/User";
import { sign } from "jsonwebtoken";
import validator from "../../helpers/validator";
import schema from "./schema"
import { secretKey } from "../../config";
import UserRepo from "../../database/repositories/UserRepo";
import { createTokens } from "../../auth/authUtils";

const router = express.Router();

router.post('/login',
  validator(schema.credential),
  async (req: Request, res: Response) => {

    const user = await UserRepo.findByEmail(req.body.email);

    if (!user || !user.password) {
      res.status(404).json({ message: 'user is not signup' });
      return;
    }

    const match = bcrypt.compare(req.body.password, user.password);

    if (!match) {
      res.status(404).json({ message: 'password is incorrect' });
      return;
    }

    const jwtToken = createTokens(user, secretKey);

    res.status(201).json({ message: "User Logged In....\n", user, accessToken: jwtToken });
  },
);

export default router;