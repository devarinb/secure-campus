import express from 'express'
import { protect } from '../../middlewares/auth'
import { reportLostItem } from '../../controllers/lost-item-controller'

const lostItemRouter = express.Router()

lostItemRouter.post('/report', protect, reportLostItem)

export default lostItemRouter
