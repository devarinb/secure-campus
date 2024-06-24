import express from 'express'
import { protect } from '../../middlewares/auth'
import { getUsers } from '../../controllers/user-controller'

const userRouter = express.Router()

userRouter.get('/', protect, getUsers)

export default userRouter
