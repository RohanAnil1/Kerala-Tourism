import { Cormorant_Garamond, Inter } from 'next/font/google';

export const displayFont = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'],
  variable: '--font-display', display: 'swap', preload: true,
});
export const bodyFont = Inter({
  subsets: ['latin'], variable: '--font-body', display: 'swap', preload: true,
});
