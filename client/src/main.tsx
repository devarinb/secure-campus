import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Registration from './pages/Registration.tsx'
import Layout from './Layout.tsx'
import Admin from './pages/Admin.tsx'
import Alert from './pages/Alert.tsx'
import Incident from './pages/Incident.tsx'
import LostItem from './pages/LostItem.tsx'
import Patrolling from './pages/Patrolling.tsx'
import Visitor from './pages/Visitor.tsx'
import Profile from './pages/Profile.tsx'
import { AuthContextProvider } from './context/auth.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<AuthContextProvider>
				<Login />
			</AuthContextProvider>
		),
		index: true
	},
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'admin',
				element: <Admin />,
			},
			{
				path: 'register',
				element: <Registration />
			},
			{
				path: 'alert',
				element: <Alert />
			},
			{
				path: 'incident',
				element: <Incident />
			},
			{
				path: 'lost-item',
				element: <LostItem />
			},
			{
				path: 'patrolling',
				element: <Patrolling />
			},
			{
				path: 'visitor',
				element: <Visitor />
			},
			{
				path: 'profile',
				element: <Profile />
			}
		]
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
