// Design System - Single Source of Truth for Colors, Typography, and Spacing

export const colors = {
  // Primary Background
  primary: '#F4F3EF',
  
  // Brand Colors
  brand: {
    purple: '#1A0185',
    purpleDark: '#132442',
  },
  
  // Accent Colors
  accent: {
    blue: '#88BBD8',
    blueLight: '#9CC6DE',
  },
  
  // Text Colors
  text: {
    body: '#061512',
    secondary: '#2D3E48',
    light: '#666666',
  },
  
  // Background Variations
  background: {
    primary: '#F4F3EF',
    secondary: '#EBE8D7',
    tertiary: '#EEEBD9',
    dark: '#132441',
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#F9F9F9',
    gray200: '#E5E5E5',
    gray300: '#D1D1D1',
    gray400: '#9E9E9E',
    gray500: '#6B6B6B',
  },
};

export const typography = {
  fontFamily: {
    sans: '"Inter", sans-serif',
  },
  
  fontSize: {
    // Headings
    h1: '58px',
    h2: '32px',
    h3: '24px',
    h4: '20px',
    
    // Body
    body1: '24px',
    body2: '20px',
    base: '16px',
    sm: '14px',
    xs: '12px',
    
    // Labels
    label1: '32px',
    label2: '28px',
  },
  
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
  '5xl': '96px',
};

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const transitions = {
  fast: '150ms',
  base: '300ms',
  slow: '500ms',
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  breakpoints,
  shadows,
  transitions,
};
