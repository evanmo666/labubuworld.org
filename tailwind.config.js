/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3', 
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        warm: {
          50: '#fef7ed',
          100: '#fdedd3',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        cute: {
          50: '#fef1f7',
          100: '#fee5f0',
          200: '#fecce3',
          300: '#fda4cd',
          400: '#fb7ab7',
          500: '#f550a1',
          600: '#e11d7b',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        }
      },
      fontFamily: {
        'cute': ['var(--font-comfortaa)', 'var(--font-quicksand)', 'var(--font-nunito)', 'Comic Neue', 'system-ui', 'sans-serif'],
        'round': ['var(--font-comfortaa)', 'var(--font-quicksand)', 'var(--font-nunito)', 'system-ui', 'sans-serif'],
        'comfortaa': ['var(--font-comfortaa)', 'system-ui', 'sans-serif'],
        'quicksand': ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
        'nunito': ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        'poppins': ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'cute': '1.25rem',
      },
      boxShadow: {
        'cute': '0 4px 20px -2px rgba(236, 72, 153, 0.15)',
        'warm': '0 4px 20px -2px rgba(249, 115, 22, 0.15)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
} 