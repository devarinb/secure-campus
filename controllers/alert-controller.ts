import asyncHandler from 'express-async-handler'
import prisma from '../lib/prisma'
import BadRequestException from '../exceptions/BadRequestException'

export const alertUsers = asyncHandler(async (req, res) => {
	const { alertName, description, group } = req.body

	if (!alertName || !description || !group) {
		throw new BadRequestException('Check your inputs & try again.')
	}

	const createdIncident = await prisma.alert.create({
		data: {
			name: alertName,
			message: description,
			role: group
		}
	})

	res.status(201).json(createdIncident)
})
