import express from 'express'
import { protect } from '../../middlewares/auth'
import {
	addToVisitorLog,
	getVisitors
} from '../../controllers/visitor-controller'

const visitorRouter = express.Router()

visitorRouter.get('/', protect, getVisitors)

visitorRouter.post('/new-visitor', protect, addToVisitorLog)

export default visitorRouter
