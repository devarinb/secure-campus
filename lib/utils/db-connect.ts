import mongoose from 'mongoose'
import config from '../../config'

const MONGO_URI = config.get('databaseUrl')

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI)

		console.log(`Connected to MongoDB Server ${conn.connection.host}`)

		return conn.connection
	} catch (error: any) {
		throw new Error(error.message || 'Could not connect to database')
	}
}

export default connectDB
