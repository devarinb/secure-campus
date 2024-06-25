import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import './Incident.css'

const Incident = () => {
	const [incidentName, setIncidentName] = useState('')
	const [description, setDescription] = useState('')

	const incidentReportHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const res = await fetch('/api/incident/report', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({ incidentName, description })
		})

		if (res.ok && res.status === 201) {
			toast.success('Incident reported successfully!!')
			setIncidentName('')
			setDescription('')
		} else {
			toast.error('Failed to report incident. Check your inputs & try again.')
		}
	}

	return (
		<>
			<section className='container'>
				<header>Incident Report</header>
				<form onSubmit={incidentReportHandler} className='form'>
					<div className='input-box'>
						<label>Name of the Incident</label>
						<input
							type='text'
							placeholder='Enter the name of incident'
							required
							value={incidentName}
							onChange={e => setIncidentName(e.target.value)}
						/>
					</div>
					<div className='text-box input-box'>
						<label htmlFor='alert-message'>Incident Description</label>
						<input
							type='text'
							id='alert-message'
							placeholder='Description of the incident'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</section>
		</>
	)
}
export default Incident
