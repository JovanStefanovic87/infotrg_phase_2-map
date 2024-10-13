import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Set up the timeout to update debouncedValue after the delay
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cleanup the timeout if the value changes before the delay finishes
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
