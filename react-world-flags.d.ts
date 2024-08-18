declare module 'react-world-flags' {
	import * as React from 'react';

	interface FlagProps {
		code: string;
		alt?: string;
	}

	const Flag: React.FC<FlagProps>;
	export default Flag;
}
