export async function fetchJson<T = any>(
	url: string,
	options: RequestInit = {},
	timeout = 10000 // Timeout u milisekundama
): Promise<T> {
	const controller = new AbortController(); // Kontrola za timeout
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal,
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		});

		if (!response.ok) {
			const errorDetails = await tryParseJson(response);
			const errorMessage =
				errorDetails?.message || `HTTP Error ${response.status} - ${response.statusText}`;
			throw new Error(errorMessage);
		}

		return await tryParseJson(response);
	} catch (error: any) {
		if (error.name === 'AbortError') {
			throw new Error(`Request to ${url} timed out after ${timeout} ms`);
		}
		console.error(`Error fetching data from ${url}:`, error);
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
}

async function tryParseJson(response: Response): Promise<any> {
	try {
		return await response.json();
	} catch {
		return null;
	}
}
