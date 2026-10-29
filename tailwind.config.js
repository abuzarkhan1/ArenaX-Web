/** @type {import('tailwindcss').Config} */

// Opacity-aware color helpers keep the CSS-variable theme intact while making
// utility modifiers such as `bg-accent/10` and `border-line/60` behave as expected.
const withAlpha = (variable, rgb) => ({ opacityValue }) =>
  opacityValue === undefined ? `var(${variable})` : `rgba(${rgb}, ${opacityValue})`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: withAlpha('--bg-0', '11, 13, 14'),
          1: withAlpha('--bg-1', '16, 18, 20'),
          2: withAlpha('--bg-2', '21, 24, 27'),
          3: withAlpha('--bg-3', '27, 31, 34'),
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
          accent: 'var(--line-accent)',
        },
        text: {
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        accent: {
          DEFAULT: withAlpha('--accent', '0, 200, 120'),
          hover: withAlpha('--accent-hover', '0, 219, 134'),
          dim: 'var(--accent-dim)',
        },
        danger: withAlpha('--danger', '239, 68, 68'),
        whatsapp: withAlpha('--whatsapp', '37, 211, 102'),
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        control: '12px',
      },
      boxShadow: {
        broadcast: '0 24px 60px -24px rgba(0, 0, 0, 0.70)',
        lift: '0 12px 24px -10px rgba(0, 255, 163, 0.15)',
        'lift-strong': '0 18px 40px -14px rgba(0, 255, 163, 0.24)',
        glow: '0 0 0 1px rgba(16, 185, 129, 0.14), 0 12px 36px -12px rgba(16, 185, 129, 0.35)',
        'inner-line': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'hud-grid':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-emerald':
          'radial-gradient(ellipse at center, rgba(0, 200, 120, 0.14) 0%, transparent 70%)',
        'card-sheen':
          'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 42%)',
      },
      backgroundSize: {
        'hud-grid': '52px 52px',
      },
      keyframes: {
        hudFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        sheenSweep: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '60%, 100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
      },
      animation: {
        'float-slow': 'hudFloat 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'sheen-sweep': 'sheenSweep 4.5s ease-in-out infinite',
      },
      transitionTimingFunction: {
        hud: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
