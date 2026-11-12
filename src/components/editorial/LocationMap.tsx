'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function LocationMap({ name, lat, lng }: { name: string; lat: number; lng: number }) {
  const [loaded, setLoaded] = useState(false);
  return <div className="location-map">{loaded ? <iframe title={`Map of ${name}`} loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - .04},${lat - .03},${lng + .04},${lat + .03}&layer=mapnik&marker=${lat},${lng}`}/> : <button onClick={() => setLoaded(true)} className="map-load"><MapPin size={28}/><span>Explore {name} on the map</span><small>Load interactive map · OpenStreetMap</small></button>}<a className="text-link" href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=13/${lat}/${lng}`} target="_blank" rel="noreferrer">Open map in a new tab ↗</a></div>;
}
