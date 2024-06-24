import asyncHandler from 'express-async-handler'
import prisma from '../lib/prisma'
import BadRequestException from '../exceptions/BadRequestException'

export const getOpenIncidents = asyncHandler(async (req, res) => {
	const incidents = await prisma.incident.findMany({
		where: {
			status: 'OPEN'
		}
	})

	res.status(200).json(incidents)
})

export const reportIncident = asyncHandler(async (req, res) => {
	const { incidentName, description } = req.body

	if (!incidentName || !description) {
		throw new BadRequestException('Check your inputs & try again.')
	}

	const createdIncident = await prisma.incident.create({
		data: {
			name: incidentName,
			description,
			submitterId: req.user.id
		}
	})

	res.status(201).json(createdIncident)
})
