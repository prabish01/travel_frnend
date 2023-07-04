/** @type {import('tailwindcss').Config} */
module.exports = { 
	content: [ "./src/**/*.{js,ts,jsx,tsx}" ], 
	theme: { 
		extend: {
			animation: {
				'pulse': 'pulse 7s linear infinite',
				'spin' : 'spin 15s linear infinite',
			},
		}, 
	}, 
	plugins: [], 
}