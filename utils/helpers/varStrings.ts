import { AdType } from './types';

export const adTypeOptions = {
	'Ni jedno': AdType.NONE,
	'Mala reklama': AdType.SMALL,
	'Velika reklama': AdType.BIG,
	'Premium reklama': AdType.PREMIUM,
	'Sponzorska reklama': AdType.SPONSOR,
};

export const reverseAdTypeOptions = Object.fromEntries(
	Object.entries(adTypeOptions).map(([key, value]) => [value, key])
);
