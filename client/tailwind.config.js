/** @type {import('tailwindcss').Config} */
export default {
     content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}',
          'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
     ],
     theme: {
          extend: {
               keyframes: {
                    slide: {
                         '0%': {
                              transform: 'translateX(10px)',
                              opacity: '0.5',
                         },

                         '100%': {
                              transform: 'translateX(0px)',
                              opacity: '1',
                         },
                    },
               },

               fontFamily: {
                    fontFamily: ['Roboto'],
               },

               gridTemplateColumns: {
                    //  12 COLUMN GRID
                    12: 'repeat(12, minmax(0, 1fr))',
               },
          },
     },
     plugins: [require('@tailwindcss/forms')],
};
