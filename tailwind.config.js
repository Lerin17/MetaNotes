module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      hammer: 'Hammersmith One',
      bai: 'Bai Jamjuree',
      stick: 'Stick No Bills',
      header1: 'Righteous',
      header2: 'Bree Serif',
      header3: 'Syncopate',
      header4: 'Days One',
      header5: 'Didact Gothic'
    },
  
    extend: {
      animation: {
        "fade": "fadeOut .2s ease-in-out",
        "slide": "slideUp .2s ease-in-out",
        "fadeVertical": 'slideUp .3s ease-in-out',
        "fadeVerticalDown": 'slideDown .4s ease-in-out',
      },

      // that is actual animation
      keyframes: (theme) => ({
        'fadeOut': {
          "0%": { transform: "translateX(-100%)"},
          "100%": {   transform: "translateX(0)" },
        },
        'slideUp': {
          "0%": { transform: "translate(0%, -100%)",
          backgroundColor: theme("colors.red.400")},
          "100%": {   transform: "transform: translate(0%, 0)" ,
                    backgroundColor: theme("colors.blue.600") },
        },
        'slideUp': {
          "0%": { transform: "translateY(100%)",
                opacity: '0%'},
          "100%": {   transform: "translateY(0)" ,
                opacity: '100%'},
        }
        ,
        'slideDown': {
          "0%": { transform: "translateY(-100%)",
                opacity: '0%'},
          "100%": {   transform: "translateY(0)" ,
                opacity: '100%'},
        }
      }),
    },
  },
  plugins: [],
}
