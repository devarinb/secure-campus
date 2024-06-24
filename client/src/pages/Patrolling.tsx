import { FormEvent, useState, useEffect } from 'react'
import './Patrolling.css'

type Guard = {
	id: string
	email: string
	name: string
	role: 'ADMIN' | 'STUDENT' | 'FACULTY' | 'GUARD'
}

const Patrolling = () => {
	const [allGuards, setAllGuards] = useState<Guard[]>([])
	const [area, setArea] = useState('')
	const [guard, setGuard] = useState('Name of the guard')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	useEffect(() => {
		const fetchGuards = async () => {
			const res = await fetch('/api/guard', {
				method: 'GET'
			})

			if (res.ok) {
				const g = await res.json()
				setAllGuards(g)
			}
		}

		fetchGuards()
	}, [])

	const assignmentHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		console.log({
			area,
			guard,
			startDate,
			endDate
		})

		await fetch('/api/guard/assign-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				area,
				guard,
				startDate,
				endDate
			})
		})
	}

	return (
		<section className='container'>
			<header>Patrol Assignment</header>
			<form onSubmit={assignmentHandler} className='form'>
				<div className='input-box'>
					<label>Name of the area to Patrol</label>
					<input
						type='text'
						placeholder='Enter full name'
						required
						value={area}
						onChange={e => setArea(e.target.value)}
					/>
				</div>
				<br />
				<div className='select-box'>
					<select
						id='guard'
						value={guard}
						onChange={e => setGuard(e.target.value)}
					>
						<option value='Name of the guard'>Name of the guard</option>
						{allGuards.map(guard => (
							<option key={guard.id} value={guard.id}>
								{guard.name}
							</option>
						))}
					</select>
				</div>
				<div className='input-box'>
					<label>Start From</label>
					<input
						type='date'
						placeholder='Enter Patrol Start Date'
						required
						value={startDate}
						onChange={e => setStartDate(e.target.value)}
					/>
				</div>
				<div className='input-box'>
					<label>Till</label>
					<input
						type='date'
						placeholder='Enter Patrol End Date'
						required
						value={endDate}
						onChange={e => setEndDate(e.target.value)}
					/>
				</div>
				<button>Submit</button>
			</form>
		</section>
	)
}

export default Patrolling
