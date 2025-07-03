import { useFetcher } from "react-router";
import { useEffect } from "react";
import { Method, Field } from '@/Types';
import { useForm, SubmitHandler } from "react-hook-form";
import ValidationRules from '@/utils/ValidationRules';

interface ModalFormProps {
	title: string;
	method: Method;
	fields?: Field[];
	hideModal: () => void;
	afterSubmit: () => void;
	url: string;
	apiUrl: string;
	values?: Record<string, any> | null;
	isDestroy?: boolean;
}

const ModalForm = ({title, fields, url, method, apiUrl, hideModal, afterSubmit, values, isDestroy}: ModalFormProps) => {
	const fetcher = useFetcher()

	useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        afterSubmit();
      } else if (fetcher.data.errors) {
        clearErrors();

        for (const [field, messages] of Object.entries(fetcher.data.errors)) {
          setError(field as keyof typeof errors, { type: 'server', message: (messages as string[])[0] });
        }
      }
    }
  }, [fetcher.state, fetcher.data]);

	const { register, formState: { errors }, handleSubmit, setError, clearErrors } = useForm<Record<string, string>>();

	const validate: SubmitHandler<Record<string, string>> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    fetcher.submit(formData, { method, action: `${url}?_apiUrl=${apiUrl}` });
  };

	return (
		<div className="absolute w-full h-full top-0 left-0 z-10 backdrop-blur-xs bg-white/30 flex flex-col justify-center">
			<div className="flex justify-center">
				<div className="border border-gray-400 bg-white rounded-md relative p-8 md:min-w-lg">

					<svg onClick={hideModal} className="absolute top-2 right-2 cursor-pointer" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M11 1L1 11M1 1L11 11" stroke="#090A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
					
					<h1 className='text-xl font-bold text-center'>{title}</h1>

					{isDestroy ? (
						<fetcher.Form
							action={`${url}?_apiUrl=${apiUrl}`}
							method={method}
							className="flex flex-col rounded-md text-sm"
						>
							<button
								disabled={fetcher.state === "submitting"}
								className="mt-4 cursor-pointer bg-black text-white max-w-fit px-4 py-2 rounded-full self-center"
								type="submit"
							>
								Yes
							</button>
						</fetcher.Form>
					) : (
						<fetcher.Form
							onSubmit={handleSubmit(validate)}
							method={method}
							className="flex flex-col rounded-md text-sm"
						>
							{fields?.map((field) => (
								<div key={field.name} className="mt-2">
									<label htmlFor={field.name}>{field.label}</label>
										{field.type === 'select' && field.options ? (
											<select
												id={field.name}
												className="border border-slate-500 rounded-md p-1 w-full"
												{...register(field.name, ValidationRules(field))}
												defaultValue={values?.[field.name]?.id || ''}
											>
												<option value="" disabled>Select {field.label}</option>
												{field.options.map(opt => (
													<option key={opt.id} value={opt.id}>
														{opt.name}
													</option>
												))}
											</select>
										) : (
											<input
												id={field.name}
												type={field.type || "text"}
												className="border border-slate-500 rounded-md p-1 w-full"
												{...register(field.name, ValidationRules(field))}
												defaultValue={values?.[field.name] || ""}
											/>
										)}
									{errors[field.name] && (
										<p className="text-red-400 text-sm">{errors[field.name]?.message}</p>
									)}
								</div>
							))}
							<button
								disabled={fetcher.state === "submitting"}
								className="mt-4 cursor-pointer bg-black text-white max-w-fit px-4 py-2 rounded-full self-center"
								type="submit"
							>
								Submit
							</button>
						</fetcher.Form>
					)}


				</div>
			</div>
		</div>
	)
}

export default ModalForm;