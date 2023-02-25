import mongoose from 'mongoose'

const formSchema = mongoose.Schema({
	name: {
		type: String,
	},
	data: {
		type: Object
	}
})

export default formSchema