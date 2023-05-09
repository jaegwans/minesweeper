import { DefaultTheme } from 'styled-components';

const color = {
    white: '#FFFFFF',
    black: '#000000',
    backpurple: '#2C2C54',
    deeppurple: '#474787',
    gray: '#CACACA',
    deepgray: '#A5A5A5',
    whitegray: '#F7F7F7',
};

const borderRadius = {
    small: '4px',
    medium: '8px',
    large: '16px',
};

export type ColorsTypes = typeof color;
export type BorderRadiusTypes = typeof borderRadius;

const theme: DefaultTheme = {
    color,
    borderRadius,
};

export default theme;
