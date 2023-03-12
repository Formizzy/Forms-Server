import express, { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';
import { googleKeys, secretKey } from "../../config";
import UserRepo from "../../database/repositories/UserRepo";
import { createTokens } from "../../auth/authUtils";
import User from "../../database/model/User";

const client = new OAuth2Client(googleKeys.clientId);

const router = express.Router();

router.post('/signin-with-google',
	async (req: Request, res: Response) => {
		const ticket = await client.verifyIdToken({
			idToken: req.body.user.account.id_token,
			audience: googleKeys.clientId,
		});
		const payload = ticket.getPayload();

		const email = payload?.email || "";
		const name = payload?.name || "";

		const userAlreadyExists = await UserRepo.findByEmail(email);

		if (userAlreadyExists) {
			const jwtToken = createTokens(userAlreadyExists, secretKey);
			res.status(201).json({ message: "User Signed In....\n", userAlreadyExists, accessToken: jwtToken });
			return;
		}

		// create a new user
		const { user } = await UserRepo.createUser(
			{
				email: email,
				firstName: name,
				lastName: name,
				password: null,
				authMethod: "GOOGLE"
			} as User,
		);

		const jwtToken = createTokens(user, secretKey);

		// return the user and access token

		res.status(201).send({ message: "User Registerd Successfully....\n", user, accessToken: jwtToken });
	},
);

export default router;