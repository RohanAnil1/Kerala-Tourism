export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-kerala-green/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-kerala-green rounded-full animate-spin" />
        </div>
        <p className="text-gray-500 text-sm animate-pulse">Loading Kerala&apos;s beauty...</p>
      </div>
    </div>
  );
}
