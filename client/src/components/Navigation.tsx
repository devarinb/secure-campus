import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

import './Navigation.css'

const Navigation = () => {
	const {
		state: { user },
		logOut
	} = useAuthContext()

	return (
		<nav>
			<span className='logo_name'>Campus Security</span>

			<div className='menu-items'>
				<ul className='nav-links'>
					{user?.role === 'ADMIN' && (
						<li>
							<NavLink to='/admin'>
								<i className='uil uil-estate'></i>
								<span className='link-name'>Dashboard</span>
							</NavLink>
						</li>
					)}
					<li>
						<NavLink to='/incident'>
							<i className='uil uil-exclamation-octagon'></i>
							<span className='link-name'>Incident Reporting</span>
						</NavLink>
					</li>
					<li>
						<NavLink to='/lost-item'>
							<i className='uil uil-bag'></i>
							<span className='link-name'>Lost Item</span>
						</NavLink>
					</li>
					{user?.role === 'ADMIN' && (
						<li>
							<NavLink to='/visitor'>
								<i className='uil uil-smile'></i>
								<span className='link-name'>Visitor Log</span>
							</NavLink>
						</li>
					)}
					{user?.role === 'ADMIN' && (
						<li>
							<NavLink to='/register'>
								<i className='uil uil-user-md'></i>
								<span className='link-name'>Registration</span>
							</NavLink>
						</li>
					)}
					<li>
						<NavLink to='/profile'>
							<i className='uil uil-user'></i>
							<span className='link-name'>Profile</span>
						</NavLink>
					</li>
					{user?.role === 'ADMIN' && (
						<li>
							<NavLink to='/alert'>
								<i className='uil uil-bell'></i>
								<span className='link-name'>Alert</span>
							</NavLink>
						</li>
					)}
					{user?.role === 'ADMIN' && (
						<li>
							<NavLink to='/patrolling'>
								<i className='uil uil-shield'></i>
								<span className='link-name'>Patrolling</span>
							</NavLink>
						</li>
					)}
				</ul>

				<ul className='logout-mode'>
					<li>
						<NavLink to='#' onClick={() => logOut()}>
							<i className='uil uil-signout'></i>
							<span className='link-name'>Logout</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navigation
