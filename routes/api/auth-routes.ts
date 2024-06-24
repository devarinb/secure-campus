import express from 'express'
import { protect } from '../../middlewares/auth'
import {
	registerUser,
	login,
	logout,
	userDetails
} from '../../controllers/auth-controller'

const authRouter = express.Router()

authRouter.post('/register', registerUser)

authRouter.post('/login', login)

authRouter.get('/logout', logout)

authRouter.get('/me', protect, userDetails)

authRouter.get('/protected', protect, (req, res) => {
	res.status(200).json({
		message: 'Works'
	})
})

export default authRouter
