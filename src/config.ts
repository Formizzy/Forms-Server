import * as dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const timezone = process.env.TZ;


export const db = {
  dbName: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
};

export const tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

export const secretKey = process.env.SECRET_KEY || "temp_secret_key";

export const encryptionKeyForUserVerification = crypto.randomBytes(32)

export const initializationVectorForUserVerification = crypto.randomBytes(12)

export const userVerificationSecret = process.env.SECRET_KEY_FOR_USER_VERIFICATION || "temp_secret_key";

export const currentUrl = process.env.CURRENT_WORKING_URL || "http://localhost:3001/";

export const authEmail = process.env.AUTHORIZATION_EMAIL || "190420107011.co19s1@scet.ac.in";

export const authPassword = process.env.AUTHORIZATION_PASSWORD || "xedrmdyxfyofftxu";

export const orgEmailId = process.env.ORGANIZATION_EMAIL || "190420107011.co19s1@scet.ac.in";

export const googleKeys = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  secretKey: process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl: process.env.GOOGLE_REDIRECT_URL
}

export const githubKeys = {
  clientId: process.env.GITHUB_ID,
  secretKey: process.env.GITHUB_SECRET
}