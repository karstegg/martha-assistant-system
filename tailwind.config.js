/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Martha brand colors
        'martha-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        // Field-specific colors for better visibility
        'field-warning': '#f59e0b',
        'field-danger': '#ef4444',
        'field-success': '#10b981',
        'field-info': '#3b82f6'
      },
      fontFamily: {
        'field': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif']
      },
      fontSize: {
        // Larger sizes for field readability
        'field-xs': ['14px', { lineHeight: '20px' }],
        'field-sm': ['16px', { lineHeight: '24px' }],
        'field-base': ['18px', { lineHeight: '28px' }],
        'field-lg': ['20px', { lineHeight: '32px' }]
      },
      spacing: {
        // Touch-friendly spacing
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem'
      },
      minHeight: {
        // Minimum touch targets
        'touch': '44px',
        'touch-lg': '56px'
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '56px'
      },
      maxWidth: {
        // Mobile-first constraints
        'mobile': '375px',
        'tablet': '768px',
        'field-form': '480px'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-recording': 'pulse-recording 1.5s ease-in-out infinite'
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        // Enhanced shadows for better depth perception
        'field': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'field-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'field-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      screens: {
        // Field-specific breakpoints
        'xs': '320px',
        'field-sm': '480px',
        'field-md': '768px',
        'field-lg': '1024px',
        'field-xl': '1280px',
        // Device-specific breakpoints
        'iphone': '375px',
        'ipad': '768px',
        'tablet-landscape': '1024px'
      },
      zIndex: {
        // Specific z-index values for layering
        'modal': '50',
        'toast': '60',
        'tooltip': '70',
        'fab': '40'
      }
    },
  },
  plugins: [
    // Add useful plugins for forms and typography
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('@tailwindcss/typography'),
    
    // Custom plugin for field-specific utilities
    function({ addUtilities, addComponents, theme }) {
      const fieldUtilities = {
        '.touch-manipulation': {
          'touch-action': 'manipulation'
        },
        '.user-select-none': {
          'user-select': 'none'
        },
        '.tap-highlight-transparent': {
          '-webkit-tap-highlight-color': 'transparent'
        },
        '.overflow-touch': {
          '-webkit-overflow-scrolling': 'touch'
        },
        '.safe-area-inset': {
          'padding-top': 'env(safe-area-inset-top)',
          'padding-right': 'env(safe-area-inset-right)',
          'padding-bottom': 'env(safe-area-inset-bottom)',
          'padding-left': 'env(safe-area-inset-left)'
        }
      };
      
      const fieldComponents = {
        '.btn-field': {
          '@apply px-6 py-3 font-medium rounded-lg transition-colors duration-200 min-h-touch focus:outline-none focus:ring-2 focus:ring-offset-2 touch-manipulation': {},
        },
        '.card-field': {
          '@apply bg-white rounded-lg shadow-field border border-gray-200 p-4': {},
        },
        '.input-field-base': {
          '@apply w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent min-h-touch text-field-base': {},
        }
      };
      
      addUtilities(fieldUtilities);
      addComponents(fieldComponents);
    }
  ],
  // Enable dark mode support (future enhancement)
  darkMode: 'media',
  
  // Ensure compatibility with older browsers
  corePlugins: {
    // Disable if you need IE11 support
    // backdropOpacity: false,
    // backdropBlur: false,
  }
};