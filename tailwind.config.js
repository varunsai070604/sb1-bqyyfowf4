/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'text-red-500',
    'text-yellow-500',
    'text-green-500',
    'bg-red-200',
    'bg-yellow-200',
    'bg-green-200',
    'text-red-600',
    'text-yellow-600',
    'text-green-600',
  ],
};