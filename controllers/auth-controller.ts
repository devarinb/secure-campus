import asyncHandler from 'express-async-handler'
import config from '../config'
import prisma from '../lib/prisma'
import { hash, verify } from '../lib/utils/hash'
import { signJwt } from '../lib/utils/jwt'
import BadRequestException from '../exceptions/BadRequestException'
import { $Enums } from '@prisma/client'

export const registerUser = asyncHandler(async (req, res) => {
	const {
		name,
		email,
		password,
		city,
		country,
		pincode,
		streetAddress1,
		streetAddress2,
		phoneNumber,
		dateOfBirth,
		state,
		gender
	} = req.body

	const userExists = await prisma.user.findFirst({
		where: {
			email
		}
	})

	if (userExists) {
		throw new BadRequestException('User already exists with the same email!')
	}

	const passwordHash = await hash(password)

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: passwordHash,
			city,
			country,
			dateOfBirth: new Date(dateOfBirth),
			phoneNumber,
			pincode,
			state,
			streetAddress1,
			streetAddress2,
			gender: $Enums.Gender[gender.toUpperCase()]
		}
	})

	user.password = ''

	res.status(201).json(user)
})

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	console.log({ email, password })

	const userExists = await prisma.user.findFirst({
		where: {
			email
		}
	})

	if (!userExists) {
		throw new BadRequestException('Please check your inputs and try again.')
	}

	const passwordMatch = await verify(password, userExists.password)

	if (!passwordMatch) {
		throw new BadRequestException('Please check your inputs and try again.')
	}

	const token = signJwt({ sub: userExists.id })

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: config.get('env') !== 'development',
		sameSite: 'strict',
		maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
	})

	const { password: _, ...userWithoutPassword } = userExists

	res.status(200).json({
		...userWithoutPassword
	})
})

export const logout = asyncHandler(async (req, res) => {
	res.clearCookie('jwt')
	res.status(200).json({
		message: 'Logged out successfully!'
	})
})

export const userDetails = asyncHandler(async (req, res) => {
	const user = await prisma.user.findFirst({
		where: {
			id: req.user.id
		},
		include: {
			alerts: true,
			FoundItem: true,
			Incident: true,
			LostItem: true,
			Patrol: true
		}
	})

	// @ts-ignore
	const { password, ...userWithoutPassword } = user

	res.status(200).json(userWithoutPassword)
})
