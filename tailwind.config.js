/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neural': {
          'primary': '#6366f1',    // Indigo for neural networks
          'secondary': '#8b5cf6',  // Purple for symbolic reasoning
          'accent': '#06b6d4',     // Cyan for AI highlights
          'dark': '#1e1b4b',       // Deep indigo for backgrounds
          'light': '#e0e7ff',      // Light indigo for accents
        },
        'symbolic': {
          'primary': '#10b981',    // Emerald for symbolic systems
          'secondary': '#059669',  // Darker emerald
          'accent': '#34d399',     // Light emerald
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neural-pattern': "url('/images/neural-pattern.svg')",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
} 