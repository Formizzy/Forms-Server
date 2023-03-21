import express, { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';
import { googleKeys, secretKey } from "../../config";
import UserRepo from "../../database/repositories/UserRepo";
import { createTokens } from "../../auth/authUtils";
import User from "../../database/model/User";
import { switchDatabases } from "../../database/helpers/switcher";
import { userDbSchemas } from "../../database/model/MultiDatabase";
import { getGoogleOauthToken, getGoogleUser } from "../../auth/googleAuthUtils";

const router = express.Router();

router.get('/',
	async (req: Request, res: Response) => {
		try {
			// Get the code from the query
			const code = req.query.code as string;
			const pathUrl = (req.query.state as string) || '/';

			// Use the code to get the id and access tokens
			const { id_token, access_token } = await getGoogleOauthToken({ code });

			// Use the token to get the User
			const data = await getGoogleUser({
				id_token,
				access_token,
			});

			console.log(data);
			res.cookie('email', data.email)


			res.redirect(`http://localhost:3001${pathUrl}`);
		} catch (err: any) {
			console.log('Failed to authorize Google User', err);
			return res.redirect(`http://localhost:3001/oauth/error`);
		}
	},
);

export default router;