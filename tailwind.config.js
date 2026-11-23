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
        // Carbon surface scale (canonical dark architecture)
        bg: {
          0: withAlpha('--bg-0', '14, 15, 14'),
          1: withAlpha('--bg-1', '18, 18, 18'),
          2: withAlpha('--bg-2', '23, 23, 23'),
          3: withAlpha('--bg-3', '30, 32, 31'),
          alt: withAlpha('--bg-alt', '22, 22, 22'),
          header: withAlpha('--bg-header', '11, 14, 13'),
        },
        surface: {
          canvas: withAlpha('--bg-1', '18, 18, 18'),
          card: withAlpha('--bg-2', '23, 23, 23'),
          elevated: withAlpha('--bg-3', '30, 32, 31'),
          alternative: withAlpha('--bg-alt', '22, 22, 22'),
          header: withAlpha('--bg-header', '11, 14, 13'),
          deep: withAlpha('--bg-0', '14, 15, 14'),
          75: withAlpha('--bg-2', '23, 23, 23'),
          100: '#181A19',
          200: withAlpha('--bg-3', '30, 32, 31'),
          300: withAlpha('--bg-3', '30, 32, 31'),
        },
        line: {
          DEFAULT: withAlpha('--line', '255, 255, 255'),
          strong: withAlpha('--line-strong', '255, 255, 255'),
          accent: withAlpha('--line-accent', '62, 207, 142'),
        },
        border: {
          DEFAULT: withAlpha('--border', '255, 255, 255'),
          strong: withAlpha('--border-strong', '255, 255, 255'),
          control: withAlpha('--border-control', '255, 255, 255'),
          hover: withAlpha('--border-hover', '255, 255, 255'),
          brand: withAlpha('--border-brand', '62, 207, 142'),
        },
        text: {
          1: 'var(--text-1)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        foreground: {
          DEFAULT: 'var(--text-1)',
          light: 'var(--text-2)',
          lighter: '#8A8A8A',
          muted: 'var(--text-3)',
          primary: '#3ECF8E',
        },
        // Signature emerald brand accent
        accent: {
          DEFAULT: withAlpha('--accent', '62, 207, 142'),
          hover: withAlpha('--accent-hover', '52, 178, 123'),
          dim: 'var(--accent-dim)',
        },
        brand: {
          DEFAULT: withAlpha('--brand-default', '62, 207, 142'),
          hover: withAlpha('--brand-hover', '52, 178, 123'),
          600: '#85E0BA',
          500: '#3ECF8E',
          400: '#249361',
          300: '#002918',
          200: '#000A07',
          100: '#041B10',
          deep: '#041B10',
        },
        emerald: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d2',
          300: '#86efb1',
          400: '#4CD99B',
          500: '#3ECF8E',
          600: '#34B27B',
          700: '#249361',
          800: '#1a6f49',
          900: '#155a3c',
          950: '#073321',
        },
        danger: withAlpha('--danger', '239, 68, 68'),
        whatsapp: withAlpha('--whatsapp', '37, 211, 102'),
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['"Source Code Pro"', '"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-hero': ['clamp(2.75rem, 6.6vw, 5.1rem)', { lineHeight: '1.02', letterSpacing: '-0.045em' }],
        'display-page': ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.038em' }],
        'display-section': ['clamp(2rem, 4.2vw, 3.4rem)', { lineHeight: '1.06', letterSpacing: '-0.04em' }],
        'display-panel': ['clamp(1.15rem, 1.6vw, 1.4rem)', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
      },
      fontWeight: {
        normal: '450',
        450: '450',
      },
      borderRadius: {
        card: '1.25rem',
        control: '0.75rem',
        panel: '1.5rem',
        pill: '9999px',
      },
      boxShadow: {
        broadcast: '0 24px 60px -24px rgba(0, 0, 0, 0.75)',
        lift: '0 12px 24px -10px rgba(62, 207, 142, 0.18)',
        'lift-strong': '0 18px 40px -14px rgba(62, 207, 142, 0.28)',
        glow: '0 0 0 1px rgba(62, 207, 142, 0.15), 0 12px 36px -12px rgba(62, 207, 142, 0.35)',
        'glow-lg': '0 0 0 1px rgba(62, 207, 142, 0.2), 0 20px 60px -16px rgba(62, 207, 142, 0.45)',
        card: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 56px -28px rgba(0,0,0,0.85)',
        'inner-line': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        'button-raised': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'hud-grid':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-emerald':
          'radial-gradient(ellipse at center, rgba(62, 207, 142, 0.14) 0%, transparent 70%)',
        'card-sheen':
          'linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 42%)',
        'brand-gradient':
          'linear-gradient(180deg, #249361 0%, #3ECF8E 100%)',
        'brand-gradient-horizontal':
          'linear-gradient(90deg, #249361 0%, #3ECF8E 100%)',
        'brand-gradient-diagonal':
          'linear-gradient(135deg, #249361 0%, #3ECF8E 52%, #85E0BA 100%)',
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
        scanSweep: {
          '0%': { top: '4%', opacity: '0' },
          '8%': { opacity: '1' },
          '92%': { opacity: '1' },
          '100%': { top: '96%', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(14px, -18px, 0)' },
        },
      },
      animation: {
        'float-slow': 'hudFloat 6s ease-in-out infinite',
        'float-slower': 'hudFloat 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'sheen-sweep': 'sheenSweep 4.5s ease-in-out infinite',
        'scan-sweep': 'scanSweep 3.2s ease-in-out infinite',
        'drift': 'drift 14s ease-in-out infinite',
      },
      transitionTimingFunction: {
        hud: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};