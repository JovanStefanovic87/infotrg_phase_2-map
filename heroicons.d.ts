declare module '@heroicons/react/outline' {
	import React from 'react';
	const content: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> };
	export = content;
}

declare module '@heroicons/react/solid' {
	import React from 'react';
	const content: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> };
	export = content;
}

declare module '@heroicons/react' {
	import { ComponentType, SVGProps } from 'react';
	export const ExclamationCircleIcon: ComponentType<SVGProps<SVGSVGElement>>;
	export const InformationCircleIcon: ComponentType<SVGProps<SVGSVGElement>>;
	// Dodajte još ikona koje koristite, ako je potrebno
}
