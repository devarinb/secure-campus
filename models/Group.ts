import { Schema, model, HydratedDocument, Types } from 'mongoose'

export interface IGroup {
	group_name: string
	users: Types.ObjectId[]
	createdAt: Date
	updatedAt: Date
}

export type HydratedGroupDocument = HydratedDocument<IGroup>

const groupSchema = new Schema<IGroup>(
	{
		group_name: {
			type: String,
			required: true
		},
		users: {
			type: [Schema.ObjectId],
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

export default model<IGroup>('Group', groupSchema)
