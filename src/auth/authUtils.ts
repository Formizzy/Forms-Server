import Jwt,{ JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../database/model/User";

export const validateTokenData = (payload: JwtPayload): boolean => {
    if (
      !payload ||
      !payload._id ||
      !Types.ObjectId.isValid(payload._id)
    ){
        return false;
    }
    return true;
  };

export const createTokens = (
  user: User,
  accessTokenKey: string,
): any => {
  const jwtToken = Jwt.sign(
    user,
    accessTokenKey,
    { expiresIn: '10 days' }
  );
  return {
    accessToken: jwtToken,
  };
};