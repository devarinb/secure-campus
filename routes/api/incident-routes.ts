import express from 'express'
import { protect } from '../../middlewares/auth'
import {
	reportIncident,
	getOpenIncidents
} from '../../controllers/incident-controller'

const incidentRouter = express.Router()

incidentRouter.get('/open-incidents', protect, getOpenIncidents)

incidentRouter.post('/report', protect, reportIncident)

export default incidentRouter
