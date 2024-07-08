import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,mjs,jsx,mdx,tsx,ts}',
    './components/*.{js,mjs,jsx,mdx,tsx,ts}',
    './components/ui/**/*.{js,mjs,jsx,mdx,tsx,ts}',
    './components/ui/*.{js,mjs,jsx,mdx,tsx,ts}',
    './pages/**/*.{js,mjs,jsx,mdx,tsx,ts}',
    './pages/*.{js,mjs,jsx,mdx,tsx,ts}',
    './wp-templates/**/*.{js,mjs,jsx,mdx,tsx,ts}',
    './wp-templates/*.{js,mjs,jsx,mdx,tsx,ts}',
  ],
  darkMode: [ 'class', '[data-theme="dark"]'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
        display: ['Lora', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'wp-primary': 'var(--wp--preset--color--primary)',
        'wp-secondary': 'var(--wp--preset--color--secondary)',
        'wp-base': 'var(--wp--preset--color--base)',
        'wp-contrast': 'var(--wp--preset--color--contrast)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        teal: {
          DEFAULT: '#0ECAD4',
          light: '#5EDCE2',
          lightest: '#E7FAFB',
          dark: '#0CA8B1',
        },
        blue: {
          DEFAULT: '#006BD6',
          dark: '#00366B',
          light: '#D5E6F8',
        },
        navy: {
          DEFAULT: '#002447',
        },
        purple: {
          DEFAULT: '#7A45E5',
          light: '#E9E0FB',
        },
        green: {
          DEFAULT: '#039B5C',
          light: '#D3F3E2',
        },
        yellow: {
          DEFAULT: '#FFC34E',
          light: '#FFF9ED',
        },
        orange: {
          DEFAULT: '#FF6119',
          light: '#FFE5D9',
        },
        red: {
          DEFAULT: '#DD1243',
        },
        lightGray: {
          DEFAULT: '#F4F5F6',
        },
        mediumGray: {
          DEFAULT: '#5B6C74',
        },
        darkGray: {
          DEFAULT: '#1F2426',
        },
        gradients: {
          center: ['#5EDCE2', '#0CA8B1'],
          power: ['#0ECAD4', '#006BD6'],
          build: ['#0ECAD4', '#7A45E5'],
          grow: ['#0ECAD4', '#039B5C'],
          elevate: ['#0ECAD4', '#00366B'],
          spark: ['#FFC34E', '#FF6119'],
          centerLight: ['#E7FAFB', '#D7F6F8'],
          powerLight: ['#E7FAFB', '#D5E6F8'],
          buildLight: ['#E7FAFB', '#E9E0FB'],
          growLight: ['#E7FAFB', '#D3F3E2'],
          elevateLight: ['#E7FAFB', '#F5F6F7'],
          sparkLight: ['#FFF9ED', '#FFE5D9'],
        },
      },
      backgroundImage: theme => ({
        'gradient-center': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.center[0]')}, ${theme('colors.gradients.center[1]')})`,
        'gradient-power': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.power[0]')}, ${theme('colors.gradients.power[1]')})`,
        'gradient-build': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.build[0]')}, ${theme('colors.gradients.build[1]')})`,
        'gradient-grow': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.grow[0]')}, ${theme('colors.gradients.grow[1]')})`,
        'gradient-elevate': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.elevate[0]')}, ${theme('colors.gradients.elevate[1]')})`,
        'gradient-spark': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.spark[0]')}, ${theme('colors.gradients.spark[1]')})`,
        'gradient-center-light': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.centerLight[0]')}, ${theme('colors.gradients.centerLight[1]')})`,
        'gradient-power-light': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.powerLight[0]')}, ${theme('colors.gradients.powerLight[1]')})`,
        'gradient-build-light': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.buildLight[0]')}, ${theme('colors.gradients.buildLight[1]')})`,
        'gradient-grow-light': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.growLight[0]')}, ${theme('colors.gradients.growLight[1]')})`,
        'gradient-elevate-light': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.elevateLight[0]')}, ${theme('colors.gradients.elevateLight[1]')})`,
        'gradient-spark-light': `radial-gradient(circle at -100% -200%, ${theme('colors.gradients.sparkLight[0]')}, ${theme('colors.gradients.sparkLight[1]')})`,
      }),
      fontSize: {
        'wp-small': 'var(--wp--preset--font-size--small)',
        'wp-medium': 'var(--wp--preset--font-size--medium)',
        'wp-large': 'var(--wp--preset--font-size--large)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s linear forwards',
        marquee: 'marquee var(--marquee-duration) linear infinite',
        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
