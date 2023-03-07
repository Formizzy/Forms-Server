import express from 'express'
import mongoose from 'mongoose'
import { switchDB, getDBModel } from '../../database/index.js'
import { masterDbSchemas, userDbSchemas } from '../../database/schemas/index.js'

const router = express.Router()

router.post("/create", async (req, res) => {
	let db = await switchDB('masterDB', masterDbSchemas)
	let name = req.body.name;
	let mobile = req.body.mobile;
	let userModel = await getDBModel(db, 'user')
	let user = userModel({ name: name, number: mobile })
	let result = await user.save()
	// below i m changing db just to check if db got created on clustor
	// so what we can do is once user is created 
	// use his id to creat other db and use that db to server that respected user
	await switchDB(result._id + "", userDbSchemas)
	res.send(result)
})


/**
 * 🚨🚨WARNING🚨🚨 : MAKE SURE YOU ARE AWARE BEFORE CALLING THIS API 
 * IT WILL CLEAR ALL THE DATABASES AND USERS.
 */
router.delete("/cleardb", async (req, res) => {
	let db = await switchDB('masterDB', masterDbSchemas)

	let userModel = await getDBModel(db, 'user')
	userModel.find({}, function (err, users) {

		users.forEach(async function (user) {
			const userDb = await switchDB(user._id + "", userDbSchemas)
			userDb.dropDatabase(function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log(userDb.db.databaseName + " dropped");
				}
			});
		});

		res.send("dropped Db");
	});

	// userModel.deleteMany({}, (err) => {
	// 	console.log("deleted all documents in users collection.");
	// })
})

export default router;