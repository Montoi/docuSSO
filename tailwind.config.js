/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'body': 'oklch(0.98 0.001 264)',
                'primary': 'oklch(0.12 0.02 264 / 0.9)',
                'link': 'oklch(0.45 0.2 264)',
                'code': '#ffffff',
            },
            fontFamily: {
                'sans': ['"Unica 77"', 'Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                'sidebar': '250px',
                'main': '768px',
            }
        },
    },
    plugins: [],
}
