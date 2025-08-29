module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mm: { purple:'#B400FF', blue: { 500:'#1E90FF', 600:'#1276FF' } }
      },
      backgroundImage: { 'mm-hero': 'linear-gradient(90deg,#1E90FF 0%,#B400FF 100%)' },
      borderRadius: { 'mm-lg':'16px','mm-md':'12px','mm-sm':'10px' },
      boxShadow: { 'mm-dark':'0 10px 32px rgba(0,0,0,.45)','mm-light':'0 8px 24px rgba(20,30,60,.08)' }
    }
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: []
}
