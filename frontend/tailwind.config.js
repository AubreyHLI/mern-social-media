/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      NotoSansSC: ["Noto Sans SC", "sans-serif"],
    },
    extend: {
      screens: {
        "1350px": "1350px",
        "1200px": "1200px",
        "900px": "900px",
        "600px": "600px",
        "480px": "480px",
        "400px": "400px",
      },
      transitionProperty: {
        'underline': 'underline',
        'visibility': 'visibility',
        'display': 'display'
      },
      boxShadow: {
        'double': 'rgb(101,119,134,0.2) 0px 0px 15px, rgb(101,119,134,0.15) 0px 0px 3px 1px',
        'small': 'rgb(101,119,134,0.1) -2px 2px 2px 0',
      },
      colors: {
        mernBlue: '#1d9bf0',
        mernBorder: '#eff3f4',
        mernFont: '#0f1419',
        mernLightGray: '#a8a8a8',
        mernDarkGray: '#808080',
        mernModalBg: '#121212a6',
        mernBgLight: '#94989c1a',      
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('hover-span', '&:hover > span');
      addVariant('hover-div', '&:hover > div');
      addVariant('hover-div-span', '&:hover > div span');
      addVariant('focus-next-limit', '&:focus + #limit');
      addVariant('focus-next-svg', '&:focus + svg');
    }
  ],
}

