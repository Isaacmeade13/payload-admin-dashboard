import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.5rem', '0.75rem'],
      },
      fontFamily: {
        'geist-sans': 'var(--font-geist-sans)',
        courier: ['var(--font-courier)', 'monospace'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        mainGrey: {
          50: '#1B1B1B',
          100: '#354A53',
          200: '#324650',
          300: '#B4B6BD',
          400: '#F2F2F2',
          500: '#98a0a4',
          600: '#D5D5D5',
        },
        orange: '#D68063',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(360deg, #3B4E57 62.15%, #4C5D66 80%, #627079 100%)',
        'background-gradient':
          'linear-gradient(90deg, #324650 0%, #324650 65%, #5C767F 95%, #6E8B95 100%)',
      },
    },
  },
  plugins: [lineClamp],
  safelist: [
    'col-start-1',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-end-2',
    'col-end-3',
    'col-end-4',
    'col-end-5',
    'col-end-6',
    'row-start-1',
    'row-end-2',
    'row-end-3',
    'blur-sm',
    'flex-col',
    'gap-[6px]',
    'grid',
    'gap-1',
    'grid-cols-5',
    'grid-rows-2',
    'relative',
    'h-full',
    'object-cover',
  ],
};
export default config;
