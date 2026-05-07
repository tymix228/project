import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tła dark mode
        'dark-bg':      '#080B14',
        'dark-surface': '#0D1117',
        'dark-card':    '#111827',
        'dark-border':  '#1C2333',
        // Neony
        'neon-cyan':    '#00F5FF',
        'neon-purple':  '#B400FF',
        'neon-green':   '#00FF88',
        'neon-orange':  '#FF6B00',
        'neon-red':     '#FF0044',
        'neon-gold':    '#FFD700',
        // Light mode
        'light-bg':     '#F0F4FF',
        'light-surface':'#FFFFFF',
        'light-border': '#E2E8F0',
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      boxShadow: {
        'neon-cyan':   '0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.1)',
        'neon-purple': '0 0 20px rgba(180, 0, 255, 0.4), 0 0 40px rgba(180, 0, 255, 0.1)',
        'neon-green':  '0 0 20px rgba(0, 255, 136, 0.4)',
        'neon-red':    '0 0 20px rgba(255, 0, 68, 0.4)',
        'card-dark':   '0 4px 24px rgba(0, 0, 0, 0.6)',
        'card-hover':  '0 8px 32px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-gaming':  'linear-gradient(135deg, #00F5FF, #B400FF)',
        'gradient-gaming-r':'linear-gradient(135deg, #B400FF, #00F5FF)',
        'gradient-dark':    'linear-gradient(180deg, #080B14 0%, #0D1117 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(180,0,255,0.05))',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)' },
          '50%':       { boxShadow: '0 0 40px rgba(0, 245, 255, 0.8), 0 0 60px rgba(0, 245, 255, 0.3)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scan-line':  'scan-line 4s linear infinite',
        float:        'float 3s ease-in-out infinite',
        shimmer:      'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
