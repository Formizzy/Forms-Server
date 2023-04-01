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
			const { email, given_name, family_name } = await getGoogleUser({
				id_token,
				access_token,
			});

			let user: User = await UserRepo.findByEmail(email);

			if (!user) {
				const newUser: User = await UserRepo.createUser({
					email: email,
					name: given_name,
					password: null,
					authMethod: "GOOGLE",
				} as User);
				await switchDatabases(newUser._id.toString(), userDbSchemas);
				user = newUser
			}

			const jwtToken = createTokens(user._id.toString(), secretKey);
			res.cookie("session-token", jwtToken)

			res.redirect(`http://localhost:3000${pathUrl}`);
		} catch (err: any) {
			console.log('Failed to authorize Google User', err);
			return res.redirect(`http://localhost:3000/oauth/error`);
		}
	},
);

export default router;