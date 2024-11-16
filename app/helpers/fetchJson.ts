export async function fetchJson<T = any>(
	url: string,
	options: RequestInit = {},
	timeout = 10000 // Timeout u milisekundama
): Promise<T> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...options,
			cache: 'no-store',
			signal: controller.signal,
			headers: {
				...(!(options.headers as Record<string, string>)?.['Content-Type'] && {
					'Content-Type': 'application/json',
				}),
				...options.headers,
			},
		});

		if (!response.ok) {
			const errorDetails = await (response.headers.get('Content-Type')?.includes('application/json')
				? response.json()
				: Promise.resolve(null));
			const errorMessage = `${url}: HTTP Error ${response.status} - ${response.statusText} ${
				errorDetails?.message ? `(${errorDetails.message})` : ''
			}`;
			throw new Error(errorMessage);
		}

		return response.headers.get('Content-Type')?.includes('application/json')
			? await response.json()
			: null;
	} catch (error: any) {
		if (error.name === 'AbortError') {
			throw new Error(`Request to ${url} timed out after ${timeout} ms`);
		}
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
}
