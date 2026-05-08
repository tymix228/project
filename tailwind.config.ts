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
        'dark-bg':      '#080B14',
        'dark-surface': '#0D1117',
        'dark-card':    '#111827',
        'dark-border':  '#1C2333',
        'neon-cyan':    '#00F5FF',
        'neon-purple':  '#B400FF',
        'neon-green':   '#00FF88',
        'neon-orange':  '#FF6B00',
        'neon-red':     '#FF0044',
        'neon-gold':    '#FFD700',
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
        'neon-cyan':    '0 0 20px rgba(0,245,255,0.5), 0 0 60px rgba(0,245,255,0.15)',
        'neon-cyan-sm': '0 0 10px rgba(0,245,255,0.4)',
        'neon-purple':  '0 0 20px rgba(180,0,255,0.5), 0 0 60px rgba(180,0,255,0.15)',
        'neon-green':   '0 0 20px rgba(0,255,136,0.5)',
        'neon-red':     '0 0 20px rgba(255,0,68,0.5)',
        'neon-orange':  '0 0 20px rgba(255,107,0,0.5)',
        'card-dark':    '0 4px 32px rgba(0,0,0,0.7)',
        'card-hover':   '0 12px 48px rgba(0,0,0,0.9), 0 0 0 1px rgba(0,245,255,0.1)',
        'inner-glow':   'inset 0 0 30px rgba(0,245,255,0.05)',
      },
      backgroundImage: {
        'gradient-gaming':   'linear-gradient(135deg, #00F5FF, #B400FF)',
        'gradient-gaming-r': 'linear-gradient(135deg, #B400FF, #00F5FF)',
        'gradient-gaming-v': 'linear-gradient(180deg, #00F5FF, #B400FF)',
        'gradient-dark':     'linear-gradient(180deg, #080B14 0%, #0D1117 100%)',
        'gradient-card':     'linear-gradient(135deg, rgba(0,245,255,0.05), rgba(180,0,255,0.05))',
        'gradient-hero':     'radial-gradient(ellipse at center, rgba(0,245,255,0.08) 0%, transparent 70%)',
        'gradient-glow-cyan':'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)',
        'noise':             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,245,255,0.4)' },
          '50%':       { boxShadow: '0 0 50px rgba(0,245,255,0.9), 0 0 80px rgba(0,245,255,0.3)' },
        },
        'glow-pulse-purple': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(180,0,255,0.4)' },
          '50%':       { boxShadow: '0 0 50px rgba(180,0,255,0.9), 0 0 80px rgba(180,0,255,0.3)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-12px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%':      { opacity: '1' },
          '93%':      { opacity: '0.4' },
          '94%':      { opacity: '1' },
          '96%':      { opacity: '0.6' },
          '97%':      { opacity: '1' },
        },
        'border-flow': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'zoom-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'rotate-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ping-slow': {
          '0%':   { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'glow-pulse':        'glow-pulse 2.5s ease-in-out infinite',
        'glow-pulse-purple': 'glow-pulse-purple 2.5s ease-in-out infinite',
        'scan-line':         'scan-line 5s linear infinite',
        float:               'float 4s ease-in-out infinite',
        'float-slow':        'float-slow 6s ease-in-out infinite',
        shimmer:             'shimmer 2s linear infinite',
        flicker:             'flicker 6s linear infinite',
        'border-flow':       'border-flow 3s ease infinite',
        'slide-up':          'slide-up 0.5s ease-out',
        'slide-in-left':     'slide-in-left 0.5s ease-out',
        'zoom-in':           'zoom-in 0.4s ease-out',
        'rotate-slow':       'rotate-slow 20s linear infinite',
        'ping-slow':         'ping-slow 2s cubic-bezier(0,0,0.2,1) infinite',
        gradient:            'gradient 4s ease infinite',
      },
    },
  },
  plugins: [],
}

export default config
