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
		const googlePayload = ticket.getPayload();

		const email = googlePayload?.email || "";
		const name = googlePayload?.name || "";

		let user: User = await UserRepo.findByEmail(email);

		if (user) {
			const jwtToken = createTokens(user._id.toString(), secretKey);
			res.status(201).json({ message: "User Signed In....\n", userAlreadyExists: user, jwtToken });
			return;
		}

		// create a new user
		const newUser: User = await UserRepo.createUser(
			{
				email: email,
				firstName: name,
				lastName: name,
				password: null,
				authMethod: "GOOGLE"
			} as User,
		);

		const jwtToken = createTokens(newUser._id.toString(), secretKey);

		// return the user and access token

		res.status(201).send({ message: "User Registerd Successfully....\n", user, jwtToken });
	},
);

export default router;