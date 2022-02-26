module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'tiny': '.75rem',
      },
      maxWidth: {
        '37': '37.333333%',
        '58': '58.333333%',
        '66': '66.666667%',
        '41': '41.666667%',
      },
      backgroundImage: {
        'image': 'url(../images/bg.png)',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      colors: {
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        green: {
          100: '#f0fff4',
          200: '#c6f6d5',
          300: '#9ae6b4',
          400: '#68d391',
          500: '#48bb78',
          600: '#38a169',
          700: '#2f855a',
          800: '#276749',
          900: '#22543d',
        },
        'myblue': '#0B1120',
        'authgreen': '#2cd399',
        'mygray': '#374151',
        'fontwhite': '#fcf8f8',
        'sky': '#2792c4',
        'lightblue': '#45bdf5',
        'secondgray': '#94A3B8',
        'first': '#0f2027',
        'second': '#203a43',
        'secgreen': '#31dea2',
        'red': '#D14343',
      },
      spacing: {
        88: '22rem',
      },
    },
  },
  plugins: [],
}