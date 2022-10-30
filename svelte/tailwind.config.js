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
    darkTheme: "dark",
    themes:[
      {
        mytheme: {
          mytheme: {
            "primary": "#02b2e2",
            "secondary": "#ffadcb",
            "accent": "#ffdd96",
            "neutral": "#282730",
            "base-100": "#373249",
            "info": "#80CCDB",
            "success": "#159E4C",
            "warning": "#EEC42B",
            "error": "#E31C29",
          },
        }
      }
    ]
  }
};
