import path from 'node:path'
import express from 'express'
import cookieParser from 'cookie-parser'
import config from './config'
import router from './routes'
import { errorHandler } from './middlewares/error-handler'

const app = express()
const port = config.get('port')

// parsing cookies
app.use(cookieParser())

// parse incoming request body & form data
app.use(express.json())
app.use(
	express.urlencoded({
		extended: false
	})
)

// register all routes
app.use(router)

// register the error handler
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

	app.get('*', (_, res) =>
		res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
	)
} else {
	app.get('/', (_, res) => {
		res.send('Hello from server')
	})
}

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`)
})
