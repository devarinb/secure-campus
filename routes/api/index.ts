import express from 'express'
import authRouter from './auth-routes'
import incidentRouter from './incident-routes'
import lostItemRouter from './lost-items'
import visitorRouter from './visitor-routes'
import alertRouter from './alert-routes'
import guardRouter from './guard-routes'
import userRouter from './user-routes'

const apiRouter = express.Router()

apiRouter.use('/users', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/incident', incidentRouter)
apiRouter.use('/lost-item', lostItemRouter)
apiRouter.use('/visitor', visitorRouter)
apiRouter.use('/alert', alertRouter)
apiRouter.use('/guard', guardRouter)

apiRouter.get('/', (req, res) => {
	return res.json({
		message: 'Bruh!'
	})
})

export default apiRouter
