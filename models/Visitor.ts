import { Schema, model, HydratedDocument, Types } from 'mongoose'

export interface IVisitor {
	name: string
	purpose: string
	checkIn: Date
	checkOut: Date
}

export type HydratedVisitorDocument = HydratedDocument<IVisitor>

const visitorSchema = new Schema<IVisitor>({
	name: {
		type: String,
		required: true
	},
	purpose: {
		type: String,
		required: true
	},
	checkIn: {
		type: Date,
		required: true
	},
	checkOut: {
		type: Date,
		required: true
	}
})

export default model<IVisitor>('Visitor', visitorSchema)
