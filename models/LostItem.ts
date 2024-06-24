import { Schema, model, HydratedDocument, Types } from 'mongoose'

export interface ILostItem {
	description: string
	reportedBy: Types.ObjectId
}

export type HydratedLostItemDocument = HydratedDocument<ILostItem>

const lostItemSchema = new Schema<ILostItem>(
	{
		description: {
			type: String,
			required: true
		},
		reportedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

export default model<ILostItem>('LostItem', lostItemSchema)
