/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          900: '#101214',
          800: '#1B1F22',
          700: '#22272B',
          600: '#30363A',
        },
        brand: {
          emerald: '#00C878',
          hover: '#00A865',
          subtle: 'rgba(0, 200, 120, 0.12)',
        },
        tournament: {
          gold: '#F59E0B',
          amber: '#D97706',
        },
        cyan: {
          tactical: '#00D2FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'Chakra Petch', 'sans-serif'],
      },
      boxShadow: {
        'emerald-glow': '0 0 35px -5px rgba(0, 200, 120, 0.25)',
        'gold-glow': '0 0 35px -5px rgba(245, 158, 11, 0.25)',
      },
    },
  },
  plugins: [],
};
