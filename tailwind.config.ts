const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'blue-neon': '#2563EB',
        'purple-neon': '#7C3AED',
        'cyan-neon': '#06B6D4',
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'left center',
          },
          '50%': {
            backgroundSize: '200% 200%',
            backgroundPosition: 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.3', filter: 'blur(10px)' },
          '100%': { opacity: '0.6', filter: 'blur(20px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
