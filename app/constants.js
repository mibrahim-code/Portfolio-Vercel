// app/constants.js
export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  white: '#ffffff',
  black: '#000000',
};

export const TYPOGRAPHY = {
  h1: 'text-3xl md:text-4xl lg:text-5xl font-light tracking-tight',
  h2: 'text-2xl md:text-3xl lg:text-4xl font-normal',
  h3: 'text-xl sm:text-2xl font-semibold',
  body: {
    base: 'text-base md:text-lg leading-relaxed font-light',
    small: 'text-sm md:text-base leading-relaxed',
  },
  caption: 'text-xs md:text-sm tracking-wider',
};

export const SPACING = {
  section: {
    py: 'py-20 sm:py-32',
    mb: 'mb-16 sm:mb-24',
  },
  element: {
    p: 'p-4 sm:p-6',
    m: 'm-4 sm:m-6',
  },
};

export const BORDERS = {
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
  },
  width: {
    thin: 'border',
    medium: 'border-2',
  },
};

export const SHADOWS = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

export const ANIMATIONS = {
  hover: {
    lift: 'hover:-translate-y-0.5 transition-transform duration-300',
    scale: 'hover:scale-105 transition-transform duration-300',
  },
  transitions: {
    default: 'transition-all duration-300',
    long: 'transition-all duration-500',
  },
};

export const GRADIENTS = {
  blue: 'bg-gradient-to-r from-gray-900 to-blue-900',
  subtle: 'bg-gradient-to-r from-gray-100 to-blue-50',
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};