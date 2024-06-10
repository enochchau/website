/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['selector'],
	theme: {
		extend: {},
		colors: {
			white: '#f0f0f0',
			black: '#1a1b1d',
			purple: {
				500: '#a86be7',
				600: '#6f1cc5'
			},
			gray: {
				200: "#dddddd",
				300: '#a2a3a8',
				400: '#8f96a1',
				500: '#666666',
				600: '#444444'
			},
			transparent: 'transparent'
		}
	},
	plugins: [],
}
