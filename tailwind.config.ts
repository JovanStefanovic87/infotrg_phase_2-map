import type { Config } from 'tailwindcss';

const config: Config = {
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				main: '#1f1c17',
				mainWhite: '#F1F1F1',
				iconBgWhite: '#e2f4fd',
				blue: '#00aaff',
				blueDark: '#0284c7',
				blueDarker: '#0284c7',
				blueLight: '#40c9ff',
				blueLighter: '#76d1ff',
				blueLightest: '#9ddeff',
				blueMain: '#111827',
				grayDarkest: '#1a1a1a',
				grayMedium: '#374151',
				grayMidLight: '#747474',
				grayLight: '#9c9c9c',
				grayLighter: '#c2c2c2',
				yellowLighter: '#fef08a',
				yellowStrong: '#facc15',
				yellowLogo: '#FBED24',
				hyperlink: '#0000EE',
			},
			backgroundImage: {
				'gradient-white': 'linear-gradient(to right, #FFFFFF, #e9e9e9)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				waveGradient: 'linear-gradient(45deg, #00aaff 25%, #29c2ff 50%, #c6ecff 75%)',
			},
			width: {
				'120': '30rem',
			},
			height: {
				main: 'calc(100dvh - 68px)',
				content: '10000px',
				header: '54px',
				'120': '30rem',
				'100': '25rem',
			},
			maxHeight: {
				main: 'calc(100dvh - 68px)',
				mainMinusClose: 'calc(100dvh - 110px)',
				content: '10000px',
			},
			margin: {
				header: '50px',
			},
			zIndex: {
				'45': '45',
				'44': '44',
			},
			fontSize: {
				xxxs: '0.6rem',
				xxs2: '0.8rem',
			},
			keyframes: {
				colorChange: {
					'0%': { backgroundColor: '#00aaff' },
					'25%': { backgroundColor: '#68cdff' },
					'50%': { backgroundColor: '#9fddfc' },
					'75%': { backgroundColor: '#68cdff' },
					'100%': { backgroundColor: '#00aaff' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideInTop: {
					'0%': { transform: 'translateY(-500%)' },
					'100%': { transform: 'translateY(0)' },
				},
				rotateHorizontal: {
					'0%': { transform: 'rotateY(-90deg)' },
					'100%': { transform: 'rotateY(90deg)' },
				},
				delaySvg: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				typewriter: {
					'0%': { width: '0ch' },
					'100%': { width: '7ch' },
				},
			},
			animation: {
				colorChange: 'colorChange 10s infinite',
				fadeIn: 'fadeIn 1s ease-in-out',
				fadeInLetter: 'fadeIn 0.5s ease-in-out',
				slideInTop: 'slideInTop 2s ease-in',
				rotateHorizontal: 'rotateHorizontal 7s linear infinite',
				delaySvg: 'ease-in-out 1s forwards',
				typewriter: 'typewriter 8s steps(7) 1s forwards',
			},
			fontFamily: {
				corsiva: ['Monotype Corsiva', 'cursive'],
			},
		},
	},
	plugins: [
		/* require('tailwindcss-animate') */
	],
};
export default config;
