import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from '@/routes/views/Login';
import Farms from '@/routes/views/Farms';
import Animals from '@/routes/views/Animals';
import AuthLayout, { authLoader } from '@/routes/AuthLayout';
import AsyncFetch from '@/utils/AsyncFetch';
import FormActions from '@/utils/FormActions';

const getFarms = async (page: string) => {
	const response = await AsyncFetch(`api/farms?page=${page}`);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		console.error('Get farms data failed')
	}
}

const getAnimals = async (page: string) => {
	const response = await AsyncFetch(`api/animals?page=${page}`);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		console.error('Get animals data failed')
	}
}

const router = createBrowserRouter([
	{
		path: '/',
		loader: () => {
			return Response.redirect('/farms');
		},
	},
	{
	  path: '/login',
	  element: <Login />,
		loader: async () => {
			const response = await AsyncFetch('/api/user');
			if (response.ok) {
				throw Response.redirect('/farms');
			}
			return null;
		}
	},
	{
	  element: <AuthLayout />,
	  loader: authLoader,
	  children: [
			{
				path: '/farms',
				loader: async ({ request }) => {
					const url = new URL(request.url);
					const page = url.searchParams.get('page') || '1';
					return { farms: await getFarms(page) };
				},
				action: FormActions,
				element: <Farms />,
			},
			{
				path: '/animals',
				loader: async ({ request }) => {
					const url = new URL(request.url);
					const page = url.searchParams.get('page') || '1';
					return { response: await getAnimals(page) };
				},
				action: FormActions,
				element: <Animals />,
			},
	  ],
	},
]);

const root = document.getElementById('app-root');

if (root) {
	ReactDOM.createRoot(root).render(
		<RouterProvider router={router} />
	);
}