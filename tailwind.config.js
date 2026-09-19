/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0b104a',
          dark: '#080c38',
          light: '#181f6e'
        },
        accent: {
          DEFAULT: '#ff553e',
          hover: '#f65026',
          light: '#fff2f0'
        },
        body: '#4a5355',
        surface: '#f7f7f9'
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        heading: ['"Jost"', 'sans-serif']
      },
      boxShadow: {
        card: '0px 10px 40px 0px rgba(11, 16, 74, 0.06)',
        hover: '0px 20px 50px 0px rgba(11, 16, 74, 0.12)',
      }
    },
  },
  plugins: [],
}
