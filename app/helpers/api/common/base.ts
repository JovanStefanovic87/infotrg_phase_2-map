export const postData = async (url: string, data: any) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			// Proveravamo status i vraćamo opisnu grešku
			const errorData = await response.json();
			throw new Error(errorData.error || 'Došlo je do greške prilikom obrade zahteva');
		}

		return await response.json();
	} catch (error) {
		// Vraćamo opisnu grešku
		console.error('Greška prilikom POST zahteva:', error);
		throw error;
	}
};

export async function postDataMultipart(url: string, data: FormData) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: data,
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function getData(url: string) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function getWithParams(url: string, params?: any) {
	try {
		const queryString = new URLSearchParams(
			Object.entries(params).reduce((acc, [key, value]) => {
				acc[key] = typeof value === 'object' ? JSON.stringify(value) : value;
				return acc;
			}, {} as any)
		).toString();

		const urlConstructed = `${url}${queryString ? '?' + queryString : ''}`;

		const response = await fetch(urlConstructed, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function getWithParamsWithNull(url: string, params?: any) {
	try {
		const queryString = new URLSearchParams(
			Object.entries(params || {}).reduce((acc, [key, value]) => {
				// Čuvamo `null` kao `"null"`, a `undefined` se ne dodaje u query string.
				if (value === null) {
					acc[key] = 'null';
				} else if (value !== undefined) {
					acc[key] = typeof value === 'object' ? JSON.stringify(value) : String(value);
				}
				return acc;
			}, {} as Record<string, string>)
		).toString();

		const urlConstructed = `${url}${queryString ? '?' + queryString : ''}`;

		const response = await fetch(urlConstructed, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function deleteData(url: string) {
	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function putData(url: string, data: any) {
	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function putDataMultipart(url: string, data: any) {
	try {
		const response = await fetch(url, {
			method: 'PUT',
			body: data,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export async function patchData(url: string, data: any) {
	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}
