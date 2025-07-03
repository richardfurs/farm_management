import AsyncFetch from '@/utils/AsyncFetch';

const FormActions = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const payload = Object.fromEntries(formData.entries());
	const url = new URL(request.url);
	const apiUrl = url.searchParams.get('_apiUrl');
	const method = request.method;

	const response = await AsyncFetch(`${apiUrl}`, payload, method);
	const data = await response.json();

	return data;
}

export default FormActions;