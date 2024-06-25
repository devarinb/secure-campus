import { FormEvent, useState } from 'react'
import { useAuthContext } from '../context/auth'

import './Login.css'

const Login = () => {
	const [username, setUsername] = useState('arindam@gmail.com')
	const [password, setPassword] = useState('12345678')

	const { logIn } = useAuthContext()

	const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		logIn(username, password)
	}

	return (
		<div className='login-container'>
			<div className='login-form'>
				<form onSubmit={loginHandler}>
					<h1>Login Here</h1>
					<label htmlFor='username'>Username</label>
					<div className='input-field'>
						<i className='fas fa-user'></i>
						<input
							type='text'
							required
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<label htmlFor='password'>Password</label>
					<div className='input-field'>
						<i className='fas fa-eye-slash'></i>
						<input
							type='password'
							required
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<a href='#' className='forget'>
						Forget Password
					</a>
					<button className='login' type='submit'>
						Login
					</button>
					<button className='login-guest' type='button'>
						Login as Guest
					</button>
				</form>
			</div>
		</div>
	)
}
export default Login
