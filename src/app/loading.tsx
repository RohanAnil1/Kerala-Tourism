export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-kerala-green/10 dark:border-emerald-500/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-kerala-green dark:border-t-emerald-500 animate-spin" />
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-kerala-green/10 to-kerala-lagoon/10 animate-pulse flex items-center justify-center">
            <span className="text-2xl">🌴</span>
          </div>
        </div>
        <p className="text-gray-400 dark:text-gray-500 text-sm font-medium tracking-wide">Loading Kerala&apos;s beauty...</p>
      </div>
    </div>
  );
}
