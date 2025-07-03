import { Outlet, redirect } from "react-router";
import AsyncFetch from '@/utils/AsyncFetch';
import Navigation from "@/components/Navigation";

export async function authLoader() {
	const response = await AsyncFetch(`api/user`);

  if (response.ok) return response.json();

  throw redirect('/login');
}

export default function AuthLayout() {
	return (
		<>
			<Navigation />
      <div className="pt-16 px-2 lg:px-40">
        <Outlet />
      </div>
		</>
	);
}