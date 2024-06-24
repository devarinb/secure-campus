import { Schema, model, HydratedDocument, Types } from 'mongoose'

export interface IAlert {
	message: string
	group: Types.ObjectId
	createdAt: Date
	updatedAt: Date
}

export type HydratedAlertDocument = HydratedDocument<IAlert>

const alertSchema = new Schema<IAlert>(
	{
		message: {
			type: String,
			required: true
		},
		group: {
			type: Schema.Types.ObjectId,
			ref: 'Group'
		}
	},
	{
		timestamps: true
	}
)

export default model<IAlert>('Alert', alertSchema)
