/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1977F2",
          secondary: "#FF823F",
          accent: "#FBBC1D",
          "base-100": "#FFFFFF",
          "base-200": "#EAF7FB"
        }
      },
      {
        dark: {
          primary: "#1977F2",
          secondary: "#FF823F",
          accent: "#FBBC1D",
          "base-100": "#060606",
          "base-200": "#000000"
        }
      },
    ]
  }
}

