import { FormEvent, useState } from 'react'
import './Alert.css'

const Alert = () => {
	const [alertName, setAlertName] = useState('')
	const [description, setDescription] = useState('')
	const [group, setGroup] = useState('STUDENT')

	const alertUserHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		await fetch('/api/alert/new-alert', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				alertName,
				description,
				group
			})
		})
	}

	return (
		<section className='container'>
			<header>Alert Form</header>
			<form onSubmit={alertUserHandler} className='form'>
				<div className='input-box'>
					<label>Name of the Alert</label>
					<input
						type='text'
						placeholder='Enter the name of the alert'
						required
						value={alertName}
						onChange={e => setAlertName(e.target.value)}
					/>
				</div>
				<div className='text-box input-box'>
					<label htmlFor='alert-message'>Alert Description</label>
					<input
						type='text'
						id='alert-message'
						placeholder='Type the alert description'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</div>

				<div className='select-box'>
					<select defaultValue={group} onChange={e => setGroup(e.target.value)}>
						<option value='STUDENT'>Student</option>
						<option value='FACULTY'>Faculty</option>
						<option value='GUARD'>Security Guard</option>
					</select>
				</div>
				<button>Submit</button>
			</form>
		</section>
	)
}
export default Alert
