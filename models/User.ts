import { Schema, model, HydratedDocument, Types } from 'mongoose'

const Roles = ['STUDENT', 'ADMIN'] as const

// user with only data from the database
export interface IUser {
	name: string
	email: string
	password: string
	role: (typeof Roles)[number]
	createdAt: Date
	updatedAt: Date
}

export type HydratedUserDocument = HydratedDocument<IUser>

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: Roles,
			default: 'STUDENT',
			required: true
		}
	},
	{
		timestamps: true
	}
)
const UserModel = model<IUser>('User', userSchema)

export default UserModel
