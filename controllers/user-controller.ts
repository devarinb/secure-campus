import asyncHandler from 'express-async-handler'
import prisma from '../lib/prisma'

export const getUsers = asyncHandler(async (req, res) => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			phoneNumber: true,
			createdAt: true,
			role: true
		}
	})

	res.status(200).json(users)
})
