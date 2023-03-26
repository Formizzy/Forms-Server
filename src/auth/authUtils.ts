import Jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../database/model/User";

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.id ||
    !Types.ObjectId.isValid(payload.id)
  ) {
    return false;
  }
  return true;
};

export const createTokens = (
  userId: string,
  accessTokenKey: string,
): any => {
  const jwtToken = Jwt.sign(
    { id: userId },
    accessTokenKey,
    { expiresIn: '10 days' }
  );
  return jwtToken;
};
