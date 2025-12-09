/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-warning-400',
    'bg-warning-500',
    'hover:bg-warning-500',
    'hover:bg-warning-600',
    'text-warning-400',
    'hover:border-warning-400',
    'focus:ring-warning-400',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal - Preto e Branco (60% e 30%)
        primary: {
          DEFAULT: '#000000', // Preto Absoluto - cor principal da marca
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#000000', // Preto Absoluto
        },
        secondary: {
          DEFAULT: '#FFFFFF', // Branco - cor de contraste para legibilidade
        },
        // Call-to-Action (10%)
        cta: {
          DEFAULT: '#CC0000', // Vermelho Sangue/Perigo
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#CC0000', // Vermelho Sangue/Perigo
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Estados de notificação
        success: {
          DEFAULT: '#28A745', // Verde Escuro Sóbrio
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#28A745', // Verde Escuro Sóbrio
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        error: {
          DEFAULT: '#DC3545', // Vermelho de Erro
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#DC3545', // Vermelho de Erro
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        warning: {
          DEFAULT: '#FFC107', // Amarelo Dourado
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#FFC107', // Amarelo Dourado
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        yellow: {
          DEFAULT: '#FFC107',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#FFC107',
          500: '#FFC107',
          600: '#f59e0b',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
        },
        info: {
          DEFAULT: '#17A2B8', // Azul Sóbrio
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#17A2B8', // Azul Sóbrio
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Arial', 'system-ui', 'sans-serif'],
        'capture-it': ['Capture it', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
