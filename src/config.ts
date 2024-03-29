import * as dotenv from 'dotenv'
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

export const googleKeys = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  secretKey: process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl: process.env.GOOGLE_REDIRECT_URL
}

export const githubKeys = {
  clientId: process.env.GITHUB_ID,
  secretKey: process.env.GITHUB_SECRET
}