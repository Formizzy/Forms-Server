import express from 'express'
import mongoose from 'mongoose'
import { switchDB , getDBModel} from '../../database/index.js'
import { masterDbSchemas, userDbSchemas } from '../../database/schemas/index.js'

const router = express.Router()

router.post("/create",async (req, res)=>{
	let db = await switchDB('masterDB', masterDbSchemas)
	let name = req.body.name;
	let mobile = req.body.mobile;
	let userModel = await getDBModel(db, 'user')
	let user = userModel({name: name, number: mobile})
	let result = await user.save()
	console.log(result._id)
	console.log(typeof result._id)
	// below i m changing db just to check if db got created on clustor
	// so what we can do is once user is created 
	// use his id to creat other db and use that db to server that respected user
	await switchDB(result._id+"", userDbSchemas)
	res.send(result)
})

export default router;