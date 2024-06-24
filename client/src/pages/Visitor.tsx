import { FormEvent, useState } from 'react'
import './Visitor.css'

const Visitor = () => {
	const [name, setName] = useState('')
	const [purpose, setPurpose] = useState('')
	const [checkInDate, setCheckInDate] = useState('')
	const [checkOutDate, setCheckOutDate] = useState('')

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		console.log({
			name,
			purpose,
			checkInDate,
			checkOutDate
		})

		await fetch('/api/visitor/new-visitor', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				name,
				purpose,
				checkInDate,
				checkOutDate
			})
		})
	}

	return (
		<section className='container'>
			<header>Visitor Form</header>

			<form onSubmit={submitHandler} className='form'>
				<div className='input-box'>
					<label>Full Name</label>
					<input
						type='text'
						placeholder='Enter full name'
						required
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className='input-box'>
					<label>Purpose of Visit</label>
					<input
						type='text'
						placeholder='Enter the Purpose of the visit'
						required
						value={purpose}
						onChange={e => setPurpose(e.target.value)}
					/>
				</div>

				<div className='column'>
					<div className='input-box'>
						<label>Check In Date</label>
						<input
							type='date'
							placeholder='Enter birth date'
							required
							value={checkInDate}
							onChange={e => setCheckInDate(e.target.value)}
						/>
					</div>
					<div className='input-box'>
						<label>Check Out Date</label>
						<input
							type='date'
							placeholder='Enter birth date'
							required
							value={checkOutDate}
							onChange={e => setCheckOutDate(e.target.value)}
						/>
					</div>
				</div>

				<button type='submit'>Submit</button>
			</form>
		</section>
	)
}
export default Visitor
