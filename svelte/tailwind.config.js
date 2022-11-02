module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  plugins: [require('daisyui')],
  daisyui:{
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    themes:[
      {
        mytheme: {
          "primary": "#5C7F67",
          "secondary": "#ECF4E7",
          "accent": "#FAE5E5",
          "neutral": "#5D5656",
          "base-100": "#E9E7E7",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        }
      }
    ]
  }
};
