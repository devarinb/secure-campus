import asyncHandler from 'express-async-handler'
import { nanoid } from 'nanoid'
import prisma from '../lib/prisma'
import BadRequestException from '../exceptions/BadRequestException'

export const getVisitors = asyncHandler(async (req, res) => {
	const visitors = await prisma.visitor.findMany()
	res.status(200).json(visitors)
})

export const addToVisitorLog = asyncHandler(async (req, res) => {
	const { name, purpose, checkInDate, checkOutDate } = req.body

	if (!name || !purpose || !checkInDate || !checkOutDate) {
		throw new BadRequestException('Check your inputs & try again.')
	}

	const uniqueId = nanoid(12)

	const newVisitor = await prisma.visitor.create({
		data: {
			name,
			purpose,
			uniqueId,
			checkIn: new Date(checkInDate),
			checkOut: new Date(checkOutDate)
		}
	})

	res.status(201).json(newVisitor)
})
