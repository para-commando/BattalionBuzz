/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        armyBackgroundColor: "url('/src/assets/combatHelicopter.jpg')",
      },
    },
  },
  plugins: [],
};
