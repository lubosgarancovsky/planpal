/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          100: 'hsl(var(--background-100) / <alpha-value>)'
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground) / <alpha-value>)',
          dimmed: 'hsl(var(--foreground-dimmed) / <alpha-value>)',
          highlight: 'hsl(var(--foreground-highlight) / <alpha-value>)'
        }
      }
    }
  },
  plugins: []
};
