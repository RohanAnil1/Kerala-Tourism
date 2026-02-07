import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kerala-green/5 to-kerala-water/5 dark:from-gray-950 dark:to-gray-900">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🌴</div>
        <h1 className="font-display text-6xl font-bold text-kerala-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Looks like you&apos;ve wandered off the beaten path. Let us guide you back to Kerala&apos;s beautiful destinations.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="bg-kerala-green text-white px-8 py-3 rounded-full font-medium hover:bg-kerala-green/90 transition-colors">
            Back to Home
          </Link>
          <Link href="/destinations" className="bg-white dark:bg-gray-800 text-kerala-green border-2 border-kerala-green px-8 py-3 rounded-full font-medium hover:bg-kerala-green/5 dark:hover:bg-gray-700 transition-colors">
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
