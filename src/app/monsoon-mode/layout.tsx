import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monsoon Travel Mode | Kerala Rain-Ready Guide',
  description:
    'Discover monsoon-friendly Kerala destinations, rainy-day alternatives, and downloadable travel checklist for safer seasonal planning.',
  openGraph: {
    title: 'Monsoon Travel Mode - Kerala',
    description:
      'Rain-ready route planning, safety tips, and best monsoon-suited places across Kerala.',
    type: 'website',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Monsoon_clouds_over_Alappuzha.jpg/1280px-Monsoon_clouds_over_Alappuzha.jpg',
        width: 1280,
        height: 853,
        alt: 'Monsoon clouds over Kerala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala Monsoon Travel Mode',
    description: 'Travel safer during Kerala monsoon with smart route and destination insights.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Monsoon_clouds_over_Alappuzha.jpg/1280px-Monsoon_clouds_over_Alappuzha.jpg'],
  },
};

export default function MonsoonModeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
