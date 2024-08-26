import axios from 'axios';

interface ApiRequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	url: string;
	data?: any;
}

const apiClient = async <T>({ method, url, data }: ApiRequestOptions): Promise<T> => {
	try {
		const response = await axios({
			method,
			url,
			data,
		});
		return response.data;
	} catch (error) {
		console.error(`Failed to ${method} ${url}`, error);
		throw error;
	}
};

export default apiClient;
