/**
 * This single file contains all env variable so ,
 * no need to import dotenv in every file.
 * @author Birju
 * @editor Kartik
 */
import * as dotenv from 'dotenv'
dotenv.config()

export const environment = {
	name: process.env.DB_NAME || '',
	host: process.env.DB_HOST || '',
	dbPort: process.env.DB_PORT || '',
	serverPort: parseInt(process.env.SERVER_PORT || 5000),
	user: process.env.DB_USER || '',
	password: process.env.DB_USER_PWD || '',
	minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
	maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
}