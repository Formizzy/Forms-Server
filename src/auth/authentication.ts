import express, { NextFunction, Request, Response } from 'express';
import UserRepo from '../database/repositories/UserRepo';
import validator, { ValidationSource } from '../helpers/validator';
import schema from '../routes/accessFunctionalities/schema';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { secretKey } from '../config';
import { Types } from 'mongoose';
import { validateTokenData } from './authUtils';

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  async (req : Request, res : Response , next : NextFunction) => {
    const jwtAuthToken = req.headers.authorization;
    
    try {
      const payload = Jwt.verify(jwtAuthToken as string, secretKey) as JwtPayload;
      const isTokenPayloadRight = validateTokenData(payload);

      if(!isTokenPayloadRight) throw 'Invalid Access Token';

      const user = await UserRepo.findById(new Types.ObjectId(payload._id));
      if (!user) throw 'User Not Found';

      return next();
    } catch (e) {
      throw e;
    }
  }
);
