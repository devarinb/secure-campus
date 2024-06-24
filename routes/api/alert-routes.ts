import express from 'express'
import { protect } from '../../middlewares/auth'
import { alertUsers } from '../../controllers/alert-controller'

const alertRouter = express.Router()

alertRouter.post('/new-alert', protect, alertUsers)

export default alertRouter
