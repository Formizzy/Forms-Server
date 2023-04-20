import express, { Request, Response, query } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../database/model/User";
import { encryptionKeyForUserVerification, initializationVectorForUserVerification } from "../../config";
import UserRepo from "../../database/repositories/UserRepo";
import { Types } from "mongoose";
import crypto from "crypto";

const router = express.Router();

router.get('/:encryptedUserData',
  async (req: Request, res: Response) => {

    const encryptedUserDataWithAuthTag  = req.params?.encryptedUserData.split("-");

    const encryptedUserData = encryptedUserDataWithAuthTag[0];

    const authenticatonTag = Buffer.from(encryptedUserDataWithAuthTag[1], 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKeyForUserVerification, initializationVectorForUserVerification);

    decipher.setAuthTag(authenticatonTag);

    let decryptedUserData = decipher.update(encryptedUserData, 'hex', 'utf-8');

    decryptedUserData += decipher.final('utf-8');

    const decryptedUserDataJSON = JSON.parse(decryptedUserData);

    const user: User = await UserRepo.findById(new Types.ObjectId(decryptedUserDataJSON?.userId));

    if (!user) {
      res.status(404).json({ message: 'user does not exist' });
      return;
    }

    if (Date.now() > Number(decryptedUserDataJSON?.expiresAt)) {
      res.status(404).json({ message: 'verification link is expired' });
      return;
    }

    const isUserEmailVerified = await UserRepo.verifyUserEmail(user);

    isUserEmailVerified && res.status(201).json({ message: "Your email is verified" });
  },
);

export default router;