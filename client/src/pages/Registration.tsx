import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import './Registration.css'

const Registration = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState('')
	const [gender, setGender] = useState('')

	const [streetAddress1, setStreetAddress1] = useState('')
	const [streetAddress2, setStreetAddress2] = useState('')
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [pincode, setPincode] = useState('')

	const registationHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				name,
				email,
				password,
				phoneNumber,
				dateOfBirth,
				gender,
				streetAddress1,
				streetAddress2,
				country,
				city,
				state,
				pincode
			})
		})

		if (res.ok) {
			const x = await res.json()

			if (x.id) {
				toast.success('User registered successfully')

				setName('')
				setEmail('')
				setPassword('')
				setPhoneNumber('')
				setDateOfBirth('')
				setGender('')

				setStreetAddress1('')
				setStreetAddress2('')
				setCountry('')
				setCity('')
				setState('')
				setPincode('')
			}
		} else {
			toast.error('Check your inputs and try again.')
		}
	}

	return (
		<>
			<section className='container'>
				<header>Registration Form</header>
				<form onSubmit={registationHandler} className='form'>
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
						<label>Email Address</label>
						<input
							type='email'
							placeholder='Enter email address'
							required
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<div className='input-box'>
						<label>Password</label>
						<input
							type='password'
							placeholder='Password'
							required
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<div className='column'>
						<div className='input-box'>
							<label>Phone Number</label>
							<input
								type='number'
								placeholder='Enter phone number'
								required
								value={phoneNumber}
								onChange={e => setPhoneNumber(e.target.value)}
							/>
						</div>
						<div className='input-box'>
							<label>Birth Date</label>
							<input
								type='date'
								placeholder='Enter birth date'
								required
								value={dateOfBirth}
								onChange={e => setDateOfBirth(e.target.value)}
							/>
						</div>
					</div>
					<div className='gender-box'>
						<h3>Gender</h3>
						<div className='gender-option'>
							<div className='gender'>
								<input
									type='radio'
									id='check-male'
									name='gender'
									value='MALE'
									checked={gender === 'male'}
									onChange={() => setGender('male')}
								/>
								<label htmlFor='check-male'>Male</label>
							</div>
							<div className='gender'>
								<input
									type='radio'
									id='check-female'
									name='gender'
									value='FEMALE'
									checked={gender === 'female'}
									onChange={() => setGender('female')}
								/>
								<label htmlFor='check-female'>Female</label>
							</div>
							<div className='gender'>
								<input
									type='radio'
									id='check-other'
									name='gender'
									value='PREFER_NOT_TO_SAY'
									checked={gender === 'none'}
									onChange={() => setGender('none')}
								/>
								<label htmlFor='check-other'>Prefer not to say</label>
							</div>
						</div>
					</div>
					<div className='input-box address'>
						<label>Address</label>
						<input
							type='text'
							placeholder='Enter street address'
							required
							value={streetAddress1}
							onChange={e => setStreetAddress1(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Enter street address line 2'
							required
							value={streetAddress2}
							onChange={e => setStreetAddress2(e.target.value)}
						/>
						<div className='column'>
							<input
								type='text'
								placeholder='Country'
								required
								value={country}
								onChange={e => setCountry(e.target.value)}
							/>
							<input
								type='text'
								placeholder='Enter your city'
								required
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
						</div>
						<div className='column'>
							<input
								type='text'
								placeholder='Enter your state'
								required
								value={state}
								onChange={e => setState(e.target.value)}
							/>
							<input
								type='number'
								placeholder='Enter postal code'
								required
								value={pincode}
								onChange={e => setPincode(e.target.value)}
							/>
						</div>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</section>
		</>
	)
}
export default Registration
