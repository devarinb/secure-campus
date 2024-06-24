import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { verifyJwt } from '../lib/utils/jwt'
import prisma from '../lib/prisma'
import UnauthorizedException from '../exceptions/UnauthorizedException'

// auth middleware
// will let user in only if a valid jwt is found in the cookie
export const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token: string

		token = req.cookies['jwt']

		if (token) {
			try {
				const decoded = verifyJwt(token)

				if (typeof decoded !== 'string') {
					let user = await prisma.user.findUnique({
						where: {
							id: decoded.sub
						}
					})

					if (user) {
						const { password, ...userWithoutPassword } = user
						req.user = userWithoutPassword
					}

					next()
				}
			} catch (error: any) {
				res.status(401)
				throw new UnauthorizedException(
					'Not authorized, token validation failed.'
				)
			}
		} else {
			res.status(401)
			throw new UnauthorizedException(
				'No token found. Failed to authorize user.'
			)
		}
	}
)
