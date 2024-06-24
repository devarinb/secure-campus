import asyncHandler from 'express-async-handler'
import prisma from '../lib/prisma'
import BadRequestException from '../exceptions/BadRequestException'

export const reportLostItem = asyncHandler(async (req, res) => {
	const { itemName, itemDescription, itemPictureUrl } = req.body

	if (!itemName || !itemDescription) {
		throw new BadRequestException('Check your inputs & try again.')
	}

	const createdLostItem = await prisma.lostItem.create({
		data: {
			name: itemName,
			description: itemDescription,
			imageUrl: itemPictureUrl,
			reportedById: req.user.id
		}
	})

	res.status(201).json(createdLostItem)
})
