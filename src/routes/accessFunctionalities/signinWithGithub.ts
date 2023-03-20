import express, { Request, Response } from "express";
import { createTokens } from "../../auth/authUtils";
import { secretKey } from "../../config";
import User from "../../database/model/User";
import UserRepo from "../../database/repositories/UserRepo";

const router = express.Router();

router.post("/signin-with-github", 
  async (req: Request, res: Response) => {
    let email = req.body.user.email || "";
    let name = req.body.user.name || "";
    let user: User = await UserRepo.findByEmail(email);

    if (user) {
      const jwtToken = createTokens(user._id.toString(), secretKey);
      res
        .status(201)
        .json({
          message: "User Signed In....\n",
          userAlreadyExists: user,
          jwtToken,
        });
      return;
    }

    name = name.split(' ')
    // create a new user
    const newUser: User = await UserRepo.createUser({
      email: email,
      firstName: name[0] ?? null,
      lastName: name[1] ?? null,
      password: null,
      authMethod: "GITHUB",
    } as User);

    const jwtToken = createTokens(newUser._id.toString(), secretKey);

    // return the user and access token

    res
      .status(201)
      .send({ message: "User Registerd Successfully....\n", user, jwtToken });
  });

export default router;
