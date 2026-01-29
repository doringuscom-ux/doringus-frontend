/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
                display: ['"Outfit"', 'sans-serif'],
            },
            colors: {
                primary: '#D5B60A',
                secondary: '#8B5CF6',
                accent: '#FFB800',
                surface: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#F8FAFC',
                },
                text: {
                    main: '#0F172A',
                    secondary: '#64748B',
                }
            },
            animation: {
                'scroll-up': 'scroll-up 30s linear infinite',
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                'scroll-up': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },


        },
    },

    plugins: [],
}
