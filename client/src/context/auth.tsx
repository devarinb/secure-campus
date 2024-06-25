import { ReactNode, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLocalStorage } from '@uidotdev/usehooks'

type Role = 'STUDENT' | 'ADMIN' | 'FACULTY'

type User = {
	id: string
	email: string
	name: string
	role: Role
}

type StateType = {
	isAuthenticated: boolean
	user: User | null
}

type AuthContextType = {
	state: StateType
	logIn: (email: string, password: string) => Promise<void>
	logOut: () => Promise<void>
}

const initialState: AuthContextType = {
	state: {
		isAuthenticated: false,
		user: null
	},
	logIn: async () => {},
	logOut: async () => {}
}

const AuthContext = createContext<AuthContextType>(initialState)

// hook for accessing authentication values
export const useAuthContext = () => {
	const { logIn, logOut, state } = useContext(AuthContext)
	return { logIn, logOut, state }
}

// custom auth-context provider
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setAuthenticationStatus] = useLocalStorage<boolean>(
		'isAuthenticated',
		false
	)

	const [authenticatedUser, setAuthenticatedUser] =
		useLocalStorage<User | null>('authenticatedUser', null)

	const navigate = useNavigate()

	const logIn = async (email: string, password: string) => {
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				email,
				password
			})
		})

		if (res.ok && res.status === 200) {
			const x = await res.json()
			if (x.id) {
				setAuthenticatedUser({
					id: x.id,
					email: x.email,
					name: x.name,
					role: x.role
				})

				setAuthenticationStatus(true)

				navigate('/admin')
				toast.success('Successfully logged in.')
			}
		} else {
			toast.error('Check your inputs & try again.')
		}
	}

	const logOut = async () => {
		const res = await fetch('/api/auth/logout', {
			method: 'GET'
		})

		if (res.ok && res.status === 200) {
			setAuthenticationStatus(false)
			setAuthenticatedUser(null)
			navigate('/')
			toast.success('Logged out successfully')
		}
	}

	return (
		<AuthContext.Provider
			value={{
				state: {
					isAuthenticated,
					user: authenticatedUser
				},
				logIn,
				logOut
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
