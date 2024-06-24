import { ErrorRequestHandler } from 'express'
import Exception from '../exceptions/Exception'

export const errorHandler: ErrorRequestHandler = (
	err: Exception,
	req,
	res,
	next
) => {
	let statusCode = err.status || 500
	let message = err.message || 'Internal Server Error. Please try again'

	console.error(err)

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_END === 'production' ? undefined : err.stack
	})
}
