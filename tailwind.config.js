/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'root-green': '#10b981',
                ink: {
                    50: '#f5f7fa',
                    900: '#0b1220',
                    950: '#060a14',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'glow': '0 0 40px rgba(16,185,129,0.25)',
                'glow-lg': '0 0 80px rgba(16,185,129,0.3)',
                'lift': '0 24px 80px rgba(15,23,42,0.16)',
            },
            animation: {
                'scan': 'scan 2s linear infinite',
                'marquee': 'marquee 32s linear infinite',
                'float': 'float 7s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 3.2s ease-in-out infinite',
            },
            keyframes: {
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.55' },
                },
            },
        },
    },
    plugins: [],
}
