/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#025CA1',
				secondary: '#ECECEC',
				terciary: '#32BEB1',
			},
			borderRadius: {
				none: '0',
				sm: '0.125rem',
				DEFAULT: '0.25rem',
				DEFAULT: '4px',
				md: '0.375rem',
				lg: '0.5rem',
				full: '9999px',
				large: '12px',
			},
		},
	},
	plugins: [
		// ...
		require('tailwind-scrollbar'),
	],
};
