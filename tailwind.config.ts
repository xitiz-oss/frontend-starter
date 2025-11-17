/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

export default {
  // darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // fontFamily: {
      //   barlow: ['Barlow'],
      // },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },

        border: 'hsl(var(--border))',
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        h1: [
          '32px',
          {
            lineHeight: '24px',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
        h2: [
          '28px',
          {
            lineHeight: '20px',
            fontWeight: '600',
            letterSpacing: '0%',
          },
        ],
        h3: [
          '24px',
          {
            lineHeight: '20px',
            fontWeight: '600',
            letterSpacing: '0%',
          },
        ],
        h4: [
          '20px',
          {
            lineHeight: '16px',
            fontWeight: '600',
            letterSpacing: '2%',
          },
        ],
        h5: [
          '18px',
          {
            lineHeight: '100%',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
        h6: [
          '16px',
          {
            lineHeight: '100%',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
        h7: [
          '14px',
          {
            lineHeight: '100%',
            fontWeight: '400',
            letterSpacing: '0%',
          },
        ],
        h8: [
          '8px',
          {
            lineHeight: '12px',
            fontWeight: '400',
            letterSpacing: '0%',
          },
        ],
        default: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '500',
            letterSpacing: '0%',
          },
        ],
        para: [
          '16px',
          {
            lineHeight: '28px',
            letterSpacing: '2%',
          },
        ],
        h10: [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '2%',
          },
        ],

        /* Standard Tailwind sizes (kept for compatibility) */
        xs: [
          '0.75rem',
          {
            lineHeight: '1rem',
          },
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.25rem',
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        lg: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        xl: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '2rem',
          },
        ],
        '3xl': [
          '1.875rem',
          {
            lineHeight: '2.25rem',
          },
        ],
        '4xl': [
          '2.25rem',
          {
            lineHeight: '2.5rem',
          },
        ],
        '5xl': [
          '3rem',
          {
            lineHeight: '1',
          },
        ],
      },

      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
