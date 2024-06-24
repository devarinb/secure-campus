import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from './context/auth'

import Navigation from './components/Navigation'

const Layout = () => {
	return (
		<>
			<AuthContextProvider>
				<Navigation />
				<Outlet />
			</AuthContextProvider>
		</>
	)
}
export default Layout
