import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const darkMode = 'class';
export const theme = {
    extend: {
        fontFamily: {
            header: ['VeneerSoft', 'sans-serif'],
            sans: ['Roboto', ..._fontFamily.sans],
            serif: ['Roboto Slab', ..._fontFamily.serif],
        },
        colors: {
            vca: {
                base: {
                    DEFAULT: '#008FC3',
                    50: '#93E2FF',
                    100: '#7CDCFF',
                    200: '#4ED0FF',
                    300: '#20C3FF',
                    400: '#00B1F1',
                    500: '#008FC3',
                    600: '#006D95',
                    700: '#004C67',
                    800: '#002A39',
                    900: '#00080B',
                },
                dark: {
                    DEFAULT: '#002E6D',
                    50: '#0068F7',
                    100: '#0062E7',
                    200: '#0055C9',
                    300: '#0048AA',
                    400: '#003B8C',
                    500: '#002E6D',
                    600: '#00214E',
                    700: '#001430',
                    800: '#000711',
                    900: '#000000',
                },
            },
            green: {
                100: '#eaf7f6',
                200: '#c9ebe6',
                300: '#a8ded7',
                400: '#86d1c8',
                500: '#45b7a9',
                600: '#38968a',
                700: '#2c746b',
                800: '#1f534d',
                900: '#13322e',
            },
            orange: {
                100: '#ffded4',
                200: '#ffc3b1',
                300: '#ffa78d',
                400: '#ff8c69',
                500: '#ff5522',
                600: '#fd3a00',
                700: '#da3200',
                800: '#b62a00',
                900: '#922200',
            },
        },
        boxShadow: {
            bottom: '0px 10px 10px -5px rgba(0, 0, 0, 0.25);',
            right: '10px 0px 10px -5px rgba(0, 0, 0, 0.15)',
        },
        zIndex: { 100: '100', 200: '200' },
    },
};
