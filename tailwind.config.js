/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-vt323)', 'monospace'],
      },
      animation: {
        typing: 'typing 2.5s steps(40, end), blink .75s step-end infinite',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '42ch' }
        },
        blink: {
          '50%': { 'border-color': 'transparent' }
        },
      },
    },
  },
  plugins: [],
};
