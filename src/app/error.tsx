'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-950 dark:to-gray-900">
      <div className="text-center px-4">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="bg-kerala-green text-white px-8 py-3 rounded-full font-medium hover:bg-kerala-green/90">
            Try Again
          </button>
          <Link href="/" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border dark:border-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
