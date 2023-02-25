import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
	name: {
		type: String,
	},
	number: {
		type: String
	}
})

export default userSchema