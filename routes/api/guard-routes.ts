import express from 'express'
import { protect } from '../../middlewares/auth'
import { getGuards, assignGuard } from '../../controllers/guard-controller'

const guardRouter = express.Router()

guardRouter.get('/', getGuards)

guardRouter.post('/assign-post', protect, assignGuard)

export default guardRouter
