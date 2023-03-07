import express, { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../../database/model/User";
import validator from "../../helpers/validator";
import schema from "./schema"
import UserRepo from "../../database/repositories/UserRepo";
import { secretKey } from "../../config";
import { createTokens } from "../../auth/authUtils";

const router = express.Router();

router.post('/', 
validator(schema.signup),
async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userAlreadyExists = await  UserRepo.findByEmail(email);

    //return with 403-Already Exists status code if user already exists
    if(userAlreadyExists) return res.status(403).json({ message : 'User Alredy Exists'});

    // validate input data according to SignUpUserModel
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // create a new user
    const { user } = await UserRepo.createUser(
      { 
        email : email, 
        password: hashedPassword,
        firstName : firstName, 
        lastName : lastName,
      } as User,
      );

      const jwtToken = createTokens(user, secretKey);

    // return the user and access token

    res.status(201).json({message : "User Registerd Successfully....\n", user, accessToken: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;