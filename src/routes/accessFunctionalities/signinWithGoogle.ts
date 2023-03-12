import express, { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';
import { googleKeys, secretKey } from "../../config";
import UserRepo from "../../database/repositories/UserRepo";
import { createTokens } from "../../auth/authUtils";
import User from "../../database/model/User";

const client = new OAuth2Client(googleKeys.clientId);

const router = express.Router();

router.post('/signin-with-google',
    async (req : Request, res : Response) => {
		console.log(req.body)
		console.log(typeof req.body)
		console.log("We are getting request from next app")
		const ticket = await client.verifyIdToken({
			idToken: req.body.user.account.id_token,
			audience: googleKeys.clientId,  
		});
		const payload = ticket.getPayload();
		console.log(payload)


		const email  = payload?.email || "";
		const name = payload?.name || "";
		

		const userAlreadyExists = await  UserRepo.findByEmail(email);
	
		//return with 403-Already Exists status code if user already exists
		if(userAlreadyExists) return res.status(403).json({ message : 'User Alredy Exists'});
	
		
		// create a new user
		const { user } = await UserRepo.createUser(
		  { 
			email : email, 
			firstName : name,
			lastName: name,
			password: "",
		  } as User,
		  );
	
		  const jwtToken = createTokens(user, secretKey);
	
		// return the user and access token

		res.status(201).json({message : "User Registerd Successfully....\n", user, accessToken: jwtToken });

		res.send({temp: "bhai bhai"})
    },
  );

export default router;