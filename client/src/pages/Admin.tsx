import { useEffect, useState } from 'react'
import './Admin.css'

type User = {
	id: string
	name: string
	email: string
	phoneNumber: string
	createdAt: string
	role: 'ADMIN' | 'STUDENT' | 'FACULTY' | 'GUARD'
}

type Incident = {
	id: string
	name: string
	description: string
	status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED'
	submitterId: string
	createdAt: string
	updatedAt: string
}

type Visitor = {
	id: string
	name: string
	purpose: string
	uniqueId: string
	checkIn: string
	checkOut: string
	createdAt: string
	updatedAt: string
}

const Admin = () => {
	const [users, setUsers] = useState<User[]>([])
	const [incidents, setIncidents] = useState<Incident[]>([])
	const [visitors, setVisitors] = useState<Visitor[]>([])

	useEffect(() => {
		const getUsers = async () => {
			const res = await fetch('/api/users', {
				method: 'GET'
			})

			if (res.ok) {
				const u = await res.json()

				console.log(u)
				setUsers(u)
			}
		}

		const getIncidents = async () => {
			const res = await fetch('/api/incident/open-incidents', {
				method: 'GET'
			})

			if (res.ok) {
				const i = await res.json()
				setIncidents(i)
			}
		}

		const getVisitors = async () => {
			const res = await fetch('/api/visitor', {
				method: 'GET'
			})

			if (res.ok) {
				const v = await res.json()
				setVisitors(v)
			}
		}

		getUsers()
		getIncidents()
		getVisitors()
	}, [])

	return (
		<>
			<section className='dashboard'>
				{/* <div className='top'>
					<i className='uil uil-bars sidebar-toggle'></i>

					<div className='search-box'>
						<i className='uil uil-search'></i>
						<input type='text' placeholder='Search here...' />
					</div>

					<img src='images/profile.jpg' alt='' />
				</div> */}

				<div className='dash-content'>
					<div className='overview'>
						<div className='title'>
							<i className='uil uil-tachometer-fast-alt'></i>
							<span className='text'>Dashboard</span>
						</div>

						<div className='boxes'>
							<div className='box box1'>
								<i className='uil uil-user'></i>
								<span className='text'>Total User</span>
								<span className='number'>{users.length}</span>
							</div>
							<div className='box box2'>
								<i className='uil uil-exclamation-octagon'></i>
								<span className='text'>Open Incident</span>
								<span className='number'>{incidents.length}</span>
							</div>
							<div className='box box3'>
								<i className='uil uil-smile'></i>
								<span className='text'>Total Visitor</span>
								<span className='number'>{visitors.length}</span>
							</div>
						</div>
					</div>

					<div className='activity'>
						<div className='title'>
							<i className='uil uil-clock-three'></i>
							<span className='text'>Recent Activity</span>
						</div>

						<div className='activity-data'>
							<div className='data names'>
								<span className='data-title'>Name</span>
								{users.map(user => (
									<span key={user.id} className='data-list'>
										{user.name}
									</span>
								))}
							</div>
							<div className='data email'>
								<span className='data-title'>Email</span>
								{users.map(user => (
									<span key={user.id} className='data-list'>
										{user.email}
									</span>
								))}
							</div>
							<div className='data joined'>
								<span className='data-title'>Joined</span>
								{users.map(user => (
									<span key={user.id} className='data-list'>
										{new Date(user.createdAt).toLocaleDateString('en-IN', {})}
									</span>
								))}
							</div>
							<div className='data type'>
								<span className='data-title'>Type</span>
								{users.map(user => (
									<span key={user.id} className='data-list'>
										{user.role}
									</span>
								))}
							</div>
							<div className='data status'>
								<span className='data-title'>Phone No.</span>
								{users.map(user => (
									<span key={user.id} className='data-list'>
										{user.phoneNumber}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
export default Admin
