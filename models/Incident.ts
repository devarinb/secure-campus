import { Schema, model, HydratedDocument, Types } from 'mongoose'

export interface IIncident {
	description: string
	status: string
	submitter: Types.ObjectId
	createdAt: Date
	updatedAt: Date
}

export type HydratedIncidentDocument = HydratedDocument<IIncident>

const incidentSchema = new Schema<IIncident>(
	{
		description: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		submitter: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)

export default model<IIncident>('Incident', incidentSchema)
