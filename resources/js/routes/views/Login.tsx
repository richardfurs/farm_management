import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import AsyncFetch from '@/utils/AsyncFetch';
import { useState } from 'react';

interface IFormInputs {
  email: string
  password: string
}

const Login = () => {

	const [message, setMessage] = useState(null);

	const { register, formState: { errors }, handleSubmit } = useForm<IFormInputs>();

	const navigate = useNavigate();

	const submit: SubmitHandler<IFormInputs> = async (data) => {

		await fetch(`${import.meta.env.VITE_DEV_BASE_URL}/sanctum/csrf-cookie`, {
			credentials: 'include',
		});

		const response = await AsyncFetch(`api/login`, data, 'POST');

		if (response.ok) {
			navigate('/farms');
		} else {
			const data = await response.json();
			if (data.message) setMessage(data.message);
		}
  }

	return (
		<div className="flex flex-col justify-center h-screen px-8">
			<form onSubmit={handleSubmit(submit)} className="flex flex-col bg-white p-4 rounded-md shadow-lg">
				<label htmlFor="email">Email</label>
				<input id="email" className="border border-slate-500 rounded-md p-2" {...register('email', {
					required: 'Email is required', 
					pattern: {
						value: /\S+@\S+\.\S+/,
						message: 'Invalid email format',
					}
					})}
				/>
				{errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

				<label className="mt-2" htmlFor="password">Password</label>
				<input className="border border-slate-500 rounded-md p-2" id="password" type="password" {...register('password', {required: true})} />
				{errors.password && <p className="text-red-400 text-sm">Password is required</p>}
				{message && <p className="text-red-400 text-sm self-center mt-4">{message}</p>}

				<button className="mt-2 cursor-pointer bg-black text-white max-w-fit px-4 py-2 rounded-full self-center" type="submit">Login</button>
			</form>
		</div>
  );
};

export default Login;