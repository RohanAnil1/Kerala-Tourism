import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kerala Events Calendar | Festivals, Arts & Seasonal Highlights',
  description:
    'Explore Kerala\'s live month-by-month festival calendar with district filters, event highlights, and seasonal planning guidance.',
  openGraph: {
    title: 'Kerala Events Calendar',
    description:
      'Plan your Kerala trip around festivals and cultural events with district-wise discovery and seasonal insights.',
    type: 'website',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Thrissur_Pooram_Festival_2.jpg/1280px-Thrissur_Pooram_Festival_2.jpg',
        width: 1280,
        height: 853,
        alt: 'Thrissur Pooram festival in Kerala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala Events Calendar',
    description: 'Find festivals and events by month and district across Kerala.',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Thrissur_Pooram_Festival_2.jpg/1280px-Thrissur_Pooram_Festival_2.jpg'],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
