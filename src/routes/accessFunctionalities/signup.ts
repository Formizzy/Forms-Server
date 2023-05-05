import express, { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../../database/model/User";
import validator from "../../helpers/validator";
import schema from "./schema"
import UserRepo from "../../database/repositories/UserRepo";
import { secretKey } from "../../config";
import { createTokens } from "../../auth/authUtils";
import { userDbSchemas } from "../../database/model/MultiDatabase";
import { switchDatabases } from "../../database/helpers/switcher";
import { getUserForResponse } from "../../helpers/objConverter";

const router = express.Router();

/**
 * @route /signup
 */
router.post('/',
  validator(schema.signup),
  async (req: Request, res: Response) => {
    try {

      const { name, email, password } = req.body;

      const userAlreadyExists = await UserRepo.findByEmail(email);

      //return with 403-Already Exists status code if user already exists
      if (userAlreadyExists) return res.status(403).json({ message: 'User Alredy Exists' });

      // validate input data according to SignUpUserModel
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Invalid data' });
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a new user
      const newUser = await UserRepo.createUser(
        {
          email: email,
          password: hashedPassword,
          name: name,
          authMethod: "EMAIL"
        } as User,
      );
      console.log("newUser", newUser)

      const jwtToken = createTokens(newUser._id.toString(), secretKey);
      console.log(jwtToken)
      await switchDatabases(newUser._id.toString(), userDbSchemas);

      const objForResponse: Object = getUserForResponse(newUser);

      // return the user and access token
      res.status(201).json({ message: "User Registerd Successfully....\n", objForResponse});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });


export default router;