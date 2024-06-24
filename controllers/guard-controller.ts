import asyncHandler from 'express-async-handler'
import prisma from '../lib/prisma'
import BadRequestException from '../exceptions/BadRequestException'

export const getGuards = asyncHandler(async (req, res) => {
	const guards = await prisma.user.findMany({
		where: {
			role: 'GUARD'
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true
		}
	})

	res.status(200).json(guards)
})

export const assignGuard = asyncHandler(async (req, res) => {
	const { area, guard, startDate, endDate } = req.body

	if (!area || !guard || !startDate || !endDate) {
		throw new BadRequestException('Check your inputs & try again.')
	}

	const newPatrol = await prisma.patrol.create({
		data: {
			area,
			userId: guard,
			startDate: new Date(startDate),
			endDate: new Date(endDate)
		}
	})

	res.status(201).json(newPatrol)
})
