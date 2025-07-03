import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from '@/routes/views/Login';
import Farms from '@/routes/views/Farms';
import Animals from '@/routes/views/Animals';
import AuthLayout, { authLoader } from '@/routes/AuthLayout';
import AsyncFetch from '@/utils/AsyncFetch';
import FormActions from '@/utils/FormActions';

const getFarms = async (page: string) => {
	const response = await AsyncFetch(`${import.meta.env.VITE_DEV_BASE_URL}/api/farms?page=${page}`);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		console.error('Get farms data failed')
	}
}

const getAnimals = async (page: string) => {
	const response = await AsyncFetch(`${import.meta.env.VITE_DEV_BASE_URL}/api/animals?page=${page}`);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		console.error('Get animals data failed')
	}
}

const router = createBrowserRouter([
	{
	  path: '/login',
	  element: <Login />,
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