import { useEffect, useState } from 'react'
import './Profile.css'

const Profile = () => {
	const [user, setUser] = useState<any>(null)

	useEffect(() => {
		const fetchUser = async () => {
			const res = await fetch('/api/auth/me', {
				method: 'GET'
			})

			if (res.ok) {
				const user = await res.json()
				console.log(user)
				setUser(user)
			}
		}

		fetchUser()
	}, [])

	return (
		<section className='container'>
			<header>User Details</header>
			{user && (
				<div>
					<div>
						<h3>Name:</h3>
						<p>{user.name}</p>
					</div>
					<div>
						<h3>Email:</h3>
						<p>{user.email}</p>
					</div>
					<div>
						<h3>Phone Number:</h3>
						<p>{user.phoneNumber}</p>
					</div>
					<div>
						<h3>Gender</h3>
						<p>{user.gender}</p>
					</div>
					<div>
						<h3>Address:</h3>
						<p>
							{user.streetAddress1}, {user.city}, {user.state}, {user.pincode}
						</p>
					</div>
				</div>
			)}
			<br />

			{user && (
				<div className='activity'>
					<header>Reported Incidents</header>
					<br />

					<div className='activity-data'>
						<div className='data names'>
							<span className='data-title'>Name</span>
							{user.Incident.map((i: any) => (
								<span key={user.id} className='data-list'>
									{i.name}
								</span>
							))}
						</div>
						<div className='data names'>
							<span className='data-title'>Description</span>
							{user.Incident.map((i: any) => (
								<span key={i.id} className='data-list'>
									{i.description}
								</span>
							))}
						</div>
						<div className='data names'>
							<span className='data-title'>Description</span>
							{user.Incident.map((i: any) => (
								<span key={i.id} className='data-list'>
									{i.status}
								</span>
							))}
						</div>
						<div className='data names'>
							<span className='data-title'>Description</span>
							{user.Incident.map((i: any) => (
								<span key={i.id} className='data-list'>
									{i.status}
								</span>
							))}
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Profile
