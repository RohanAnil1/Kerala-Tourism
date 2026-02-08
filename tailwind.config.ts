import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kerala: {
          green: '#0A6847',
          'green-light': '#16A34A',
          gold: '#D4A843',
          sand: '#F5E6CC',
          water: '#0EA5E9',
          'water-dark': '#0369A1',
          earth: '#8B4513',
          lotus: '#E91E8C',
          coconut: '#2D5016',
          lagoon: '#06B6D4',
          sunset: '#F97316',
          spice: '#DC2626',
        },
        dark: {
          bg: '#0a0f1a',
          card: '#111827',
          'card-hover': '#1a2332',
          border: '#1e293b',
          'border-hover': '#334155',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'reveal': 'reveal 1s cubic-bezier(0.23, 1, 0.32, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0A6847 0%, #06B6D4 100%)',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(10, 104, 71, 0.3), 0 0 60px rgba(10, 104, 71, 0.1)',
        'glow-gold': '0 0 20px rgba(212, 168, 67, 0.3), 0 0 60px rgba(212, 168, 67, 0.1)',
        'glow-lagoon': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.1)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.03)',
        'elevated-lg': '0 8px 12px -2px rgba(0, 0, 0, 0.05), 0 20px 30px -6px rgba(0, 0, 0, 0.08), 0 40px 50px -10px rgba(0, 0, 0, 0.03)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
