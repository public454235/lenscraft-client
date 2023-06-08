/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      inter: ["Inter", "sans-serif"]
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#059dff ",
          secondary: "#fb5343",
          accent: "#6549d5",
          neutral: "#000000",
          "base-100": "#FFFFFF",
          "base-200": "#EAF7FB",
          "base-300": "#F5F8FA"
        }
      },
      {
        dark: {
          primary: "#059dff ",
          secondary: "#fb5343",
          accent: "#6549d5",
          neutral: "#FFFFFF",
          "base-100": "#060606",
          "base-200": "#0F0F11",
          "base-300": "#000000"
        }
      },
    ]
  }
}

