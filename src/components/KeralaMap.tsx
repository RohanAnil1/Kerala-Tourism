'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { districts, getFeaturedDestinations } from '@/data/destinations';

const DISTRICT_POSITIONS: Record<string, { top: string; left: string }> = {
  'kasaragod': { top: '5%', left: '35%' },
  'kannur': { top: '12%', left: '45%' },
  'wayanad': { top: '14%', left: '65%' },
  'kozhikode': { top: '22%', left: '40%' },
  'malappuram': { top: '30%', left: '50%' },
  'palakkad': { top: '35%', left: '65%' },
  'thrissur': { top: '42%', left: '45%' },
  'ernakulam': { top: '52%', left: '40%' },
  'idukki': { top: '55%', left: '65%' },
  'kottayam': { top: '62%', left: '50%' },
  'alappuzha': { top: '65%', left: '30%' },
  'pathanamthitta': { top: '70%', left: '55%' },
  'kollam': { top: '78%', left: '40%' },
  'thiruvananthapuram': { top: '88%', left: '35%' },
};

export default function KeralaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const featured = getFeaturedDestinations();

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1/2' }}>
      {/* Kerala Shape Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-kerala-green/10 to-kerala-water/10 rounded-[40%_60%_50%_50%/10%_10%_90%_90%] border-2 border-kerala-green/20" />

      {/* District Dots */}
      {districts.map(district => {
        const pos = DISTRICT_POSITIONS[district.id];
        if (!pos) return null;
        const isHovered = hovered === district.id;

        return (
          <div
            key={district.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ top: pos.top, left: pos.left }}
            onMouseEnter={() => setHovered(district.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Pulse Ring */}
            <div className={`absolute -inset-3 rounded-full transition-all duration-300 ${isHovered ? 'bg-kerala-green/20 scale-100' : 'bg-transparent scale-0'}`} />

            {/* Dot */}
            <div className={`relative w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${isHovered ? 'bg-kerala-green scale-150 shadow-lg' : 'bg-kerala-green/60 hover:bg-kerala-green'}`}>
              <div className={`absolute -inset-1 rounded-full bg-kerala-green/30 animate-ping ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Tooltip */}
            {isHovered && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white rounded-xl shadow-xl p-3 w-48 z-20 pointer-events-none">
                <div className="text-sm font-bold text-gray-900">{district.name}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{district.description}</div>
                <div className="flex items-center gap-1 text-xs text-kerala-green mt-2">
                  <MapPin size={12} /> Explore destinations
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45" />
              </div>
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-kerala-green" />
          <span className="text-gray-600">District</span>
        </div>
        <div className="text-gray-400">{districts.length} districts</div>
      </div>
    </div>
  );
}
