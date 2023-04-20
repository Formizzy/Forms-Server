import express, { NextFunction, Request, Response } from 'express';
import UserRepo from '../database/repositories/UserRepo';
import validator, { ValidationSource } from '../helpers/validator';
import schema from '../routes/accessFunctionalities/schema';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { secretKey } from '../config';
import mongoose from 'mongoose';
import { validateTokenData } from './authUtils';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtAuthToken = req.headers.authorization;
    try {
      const jwtPayload = Jwt.verify(jwtAuthToken as string, secretKey) as JwtPayload;

      const isTokenPayloadRight = validateTokenData(jwtPayload);

      if (!isTokenPayloadRight) throw 'Invalid Access Token';

      const user = await UserRepo.findById(jwtPayload.id as mongoose.Types.ObjectId);
      if (!user) throw 'User Not Found';
      if (!user.isEmailVerified) throw 'Email Verification Pending';

      res.locals.user = user
      res.locals.userId = user._id
      return next();
    } catch (error) {
      return res.status(401).json({ message: error });
    }
  }
);
