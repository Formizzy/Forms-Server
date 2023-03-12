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

    const user: User = await UserRepo.findByEmail(req.body.email);

    if (!user) {
      res.status(404).json({ message: 'user is not signup' });
      return;
    }

    if (user.authMethod === "GOOGLE") {
      res.status(404).json({ message: 'You were signed up using google.' });
      return
    }

    if (!user.password) {
      throw Error("Password not found from database.")
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