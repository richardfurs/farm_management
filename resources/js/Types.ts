export interface PaginationData {
	current_page: number;
	last_page: number;
}

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface Field {
	name: string;
	label: string;
	type?: string;
	options?: { name: string; id: number }[];
}