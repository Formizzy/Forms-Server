import * as dotenv from 'dotenv'

dotenv.config() // why i need to do this in every single file where i want to use process.env???

export const db = {
	name: process.env.DB_NAME || '',
	host: process.env.DB_HOST || '',
	port: process.env.DB_PORT || '',
	user: process.env.DB_USER || '',
	password: process.env.DB_USER_PWD || '',
	minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
	maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
}