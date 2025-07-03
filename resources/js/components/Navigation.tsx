import { NavLink, useNavigate } from "react-router";
import AsyncFetch from '@/utils/AsyncFetch';

const Navigation = () => {

	const navigate = useNavigate();

	const logout = async () => {
		const response = await AsyncFetch(`api/logout`, {}, 'POST');

		if (response.ok) {
			navigate('/login');
		} else {
			console.error('Logout failed');
		}
	}

	return (
		<div className="flex items-center justify-between bg-black text-white fixed top-0 w-full h-16 px-6 lg:px-40">
			<nav>
				<NavLink to="/farms" className={({ isActive }) =>
            `cursor-pointer ${isActive ? 'text-yellow-100 font-bold' : ''}`
          }>Farms</NavLink>
				<NavLink to="/animals" className={({ isActive }) =>
            `cursor-pointer ml-4 ${isActive ? 'text-yellow-100 font-bold' : ''}`
          }>Animals</NavLink>
			</nav>
			<div onClick={logout} className="cursor-pointer">Logout</div>
		</div>
	);
}

export default Navigation;