const getCookie = (name: string): string | undefined => {
	const matches = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

	return matches && matches[2] ? decodeURIComponent(matches[2]) : undefined;
};

const AsyncFetch = async (url: string, data: any = null, method: string = 'GET') => {
	const csrfToken = getCookie('XSRF-TOKEN');

	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			...(csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {})
		},
		credentials: 'include',
		...(data ? { body: JSON.stringify(data) } : {}),
	}

	const response = await fetch(url, options);

	return response;
};

export default AsyncFetch;