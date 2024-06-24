import { Schema, model, HydratedDocument, Types } from 'mongoose'

export interface IFoundItem {
	description: string
	foundBy: Types.ObjectId
	createdAt: Date
	updatedAt: Date
}

export type HydratedFoundItemDocument = HydratedDocument<IFoundItem>

const foundItemSchema = new Schema<IFoundItem>(
	{
		description: {
			type: String,
			required: true
		},
		foundBy: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

export default model<IFoundItem>('FoundItem', foundItemSchema)
