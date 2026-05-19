// components/brand/HeatmapModal.tsx
"use client";
import React, { useState } from 'react';
import { H3_ZONES } from '@/lib/data';
import { ShieldAlert, Star, X, Info } from 'lucide-react';

const CITIES = Object.keys(H3_ZONES);

// Approximate pixel positions for Bangalore hex grid (relative 700x400 SVG viewport)
// We render hexagons in a pseudo-map layout using the lat/lng to derive positions
function latLngToSvgPos(lat: number, lng: number, city: string) {
  const bounds: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
    "Bengaluru, KA": { minLat: 12.82, maxLat: 13.06, minLng: 77.55, maxLng: 77.78 },
    "Mumbai, MH":    { minLat: 18.97, maxLat: 19.15, minLng: 72.80, maxLng: 72.94 },
    "Delhi NCR":     { minLat: 28.42, maxLat: 28.72, minLng: 77.00, maxLng: 77.42 },
    "Hyderabad, TS": { minLat: 17.38, maxLat: 17.50, minLng: 78.32, maxLng: 78.45 },
    "Chennai, TN":   { minLat: 12.87, maxLat: 13.10, minLng: 80.18, maxLng: 80.28 },
    "Pune, MH":      { minLat: 18.51, maxLat: 18.61, minLng: 73.70, maxLng: 73.92 },
  };
  const b = bounds[city] || bounds["Bengaluru, KA"];
  const SVG_W = 560, SVG_H = 280, PAD = 40;
  const x = PAD + ((lng - b.minLng) / (b.maxLng - b.minLng)) * (SVG_W - PAD * 2);
  const y = (SVG_H - PAD) - ((lat - b.minLat) / (b.maxLat - b.minLat)) * (SVG_H - PAD * 2);
  return { x, y };
}

// Draw a hexagon path centered at cx, cy with radius r
function hexPath(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  });
  return `M ${pts.join(' L ')} Z`;
}

// Color based on trip density
function densityColor(density: number, tier: string): string {
  if (tier === 'premium') {
    if (density >= 90) return '#EF4444'; // red-500
    if (density >= 80) return '#F97316'; // orange-500
    if (density >= 70) return '#F59E0B'; // amber-500
    return '#FBBF24'; // amber-400
  }
  if (density >= 70) return '#3B82F6'; // blue-500
  if (density >= 60) return '#60A5FA'; // blue-400
  return '#93C5FD'; // blue-300
}

export default function HeatmapModal({ setIsHeatmapOpen, brandCategory }: any) {
  const [activeCity,   setActiveCity]   = useState(CITIES[0]);
  const [hoveredZone,  setHoveredZone]  = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const zones       = H3_ZONES[activeCity] || [];
  const fmt         = (n: number) => n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${(n / 1000).toFixed(0)}K`;
  const totalVerified = zones.reduce((s, z) => s + z.verifiedImpressions, 0);
  const totalFleet    = zones.reduce((s, z) => s + z.activeFleet, 0);
  const blockedZones  = zones.filter(z => z.activeBrand).length;

  const activeZoneData = zones.find(z => z.id === (hoveredZone || selectedZone));

  return (
    <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 w-full max-w-6xl h-[90vh] rounded-[32px] flex flex-col overflow-hidden border border-slate-700 shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center text-white shrink-0">
          <div>
            <h3 className="font-black italic uppercase tracking-wider text-xl">Route Intelligence</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">H3 Hexagonal Zone Density — GPS Verified · Bangalore Real Zones</p>
          </div>
          <button onClick={() => setIsHeatmapOpen(false)} className="text-3xl font-bold text-gray-500 hover:text-white transition-colors leading-none">×</button>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* City tabs */}
          <div className="w-44 border-r border-slate-800 flex flex-col py-4 gap-1 px-3 shrink-0">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">Cities</p>
            {CITIES.map(city => {
              const shortName = city.split(',')[0];
              return (
                <button
                  key={city}
                  onClick={() => { setActiveCity(city); setHoveredZone(null); setSelectedZone(null); }}
                  className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeCity === city ? 'bg-white text-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {shortName}
                </button>
              );
            })}

            {/* Legend */}
            <div className="mt-auto px-2 pt-4">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Trip Density</p>
              {[
                { color: '#EF4444', label: 'Extreme (90+)' },
                { color: '#F97316', label: 'Very High (80+)' },
                { color: '#F59E0B', label: 'High (70+)' },
                { color: '#3B82F6', label: 'Standard (60+)' },
                { color: '#93C5FD', label: 'Moderate (<60)' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2 mb-1.5">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: l.color }} />
                  <span className="text-[9px] text-slate-400 font-medium">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-px bg-slate-800 border-b border-slate-800 shrink-0">
              {[
                { label: 'Total GPS-Verified Impressions/mo', value: fmt(totalVerified) },
                { label: 'Active Fleet Vehicles', value: `${totalFleet}` },
                { label: 'Zones with Exclusivity Lock', value: `${blockedZones} / ${zones.length}` },
              ].map((s, i) => (
                <div key={i} className="bg-slate-900 px-6 py-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-2xl font-black text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* SVG Hex Map */}
            <div className="flex-1 relative overflow-hidden bg-slate-950 p-4">
              <svg viewBox="0 0 560 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Grid background dots */}
                {Array.from({ length: 12 }, (_, row) =>
                  Array.from({ length: 20 }, (_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={col * 30} cy={row * 25}
                      r="0.8" fill="#1e293b"
                    />
                  ))
                )}

                {zones.map((zone) => {
                  const { x, y } = latLngToSvgPos(zone.lat, zone.lng, activeCity);
                  const r = 28 + (zone.tripDensity / 100) * 10; // size by density
                  const fill = densityColor(zone.tripDensity, zone.tier);
                  const isHovered  = hoveredZone  === zone.id;
                  const isSelected = selectedZone === zone.id;
                  const isBlocked  = !!zone.activeBrand;
                  const isRecommended = brandCategory && zone.recommendedFor.includes(brandCategory);

                  return (
                    <g
                      key={zone.id}
                      onMouseEnter={() => setHoveredZone(zone.id)}
                      onMouseLeave={() => setHoveredZone(null)}
                      onClick={() => setSelectedZone(zone.id === selectedZone ? null : zone.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Hex */}
                      <path
                        d={hexPath(x, y, r)}
                        fill={fill}
                        fillOpacity={isHovered || isSelected ? 0.95 : 0.65}
                        stroke={isSelected ? '#fff' : isRecommended ? '#fbbf24' : 'transparent'}
                        strokeWidth={isSelected ? 2 : isRecommended ? 1.5 : 0}
                      />
                      {/* Exclusivity lock */}
                      {isBlocked && (
                        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="white" opacity="0.9">🔒</text>
                      )}
                      {/* Recommended star */}
                      {isRecommended && !isBlocked && (
                        <text x={x + r * 0.55} y={y - r * 0.55} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#fbbf24">★</text>
                      )}
                      {/* Zone label */}
                      {(isHovered || isSelected || r > 32) && (
                        <text
                          x={x} y={y + r + 9}
                          textAnchor="middle"
                          fontSize="7.5"
                          fill="#94a3b8"
                          fontWeight="700"
                        >
                          {zone.label.length > 14 ? zone.label.slice(0, 13) + '…' : zone.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Zone tooltip on hover/select */}
              {activeZoneData && (
                <div className="absolute bottom-4 right-4 bg-slate-800 border border-slate-700 rounded-2xl p-4 w-56 shadow-xl animate-in fade-in">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white font-black text-sm">{activeZoneData.label}</p>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${activeZoneData.tier === 'premium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {activeZoneData.tier}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[10px] font-medium text-slate-400">
                    <div className="flex justify-between">
                      <span>Trip Density</span>
                      <span className="text-white font-bold">{activeZoneData.tripDensity}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impressions/mo</span>
                      <span className="text-white font-bold">{fmt(activeZoneData.verifiedImpressions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Fleet</span>
                      <span className="text-white font-bold">{activeZoneData.activeFleet} vehicles</span>
                    </div>
                    {activeZoneData.activeBrand && (
                      <div className="flex items-center gap-1 mt-2 text-amber-400 font-bold">
                        <ShieldAlert size={10} /> Locked by {activeZoneData.activeBrand}
                      </div>
                    )}
                    {brandCategory && activeZoneData.recommendedFor.includes(brandCategory) && (
                      <div className="flex items-center gap-1 mt-2 text-amber-300 font-bold">
                        <Star size={10} /> Recommended for {brandCategory}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Legend hint */}
              <div className="absolute top-4 left-4 flex items-center gap-3 text-[9px] text-slate-500 font-bold">
                <span className="flex items-center gap-1"><span className="text-amber-400">★</span> Recommended for your category</span>
                <span className="flex items-center gap-1"><span>🔒</span> Exclusivity locked</span>
              </div>
            </div>

            {/* Zone list table */}
            <div className="shrink-0 border-t border-slate-800 overflow-y-auto" style={{ maxHeight: '200px' }}>
              <table className="w-full text-left">
                <thead className="bg-slate-800 sticky top-0">
                  <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-4 py-2.5">Zone</th>
                    <th className="px-4 py-2.5">Tier</th>
                    <th className="px-4 py-2.5">Trip Density</th>
                    <th className="px-4 py-2.5">Impressions/mo</th>
                    <th className="px-4 py-2.5">Fleet</th>
                    <th className="px-4 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {zones.map((zone) => {
                    const isRecommended = brandCategory && zone.recommendedFor.includes(brandCategory);
                    return (
                      <tr
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.id === selectedZone ? null : zone.id)}
                        className={`cursor-pointer transition-colors text-xs ${selectedZone === zone.id ? 'bg-slate-800' : 'hover:bg-slate-800/50'}`}
                      >
                        <td className="px-4 py-2.5 font-bold text-white flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: densityColor(zone.tripDensity, zone.tier) }} />
                          {zone.label}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${zone.tier === 'premium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {zone.tier}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-300 font-medium">{zone.tripDensity}/100</td>
                        <td className="px-4 py-2.5 text-slate-300 font-medium">{fmt(zone.verifiedImpressions)}</td>
                        <td className="px-4 py-2.5 text-slate-300 font-medium">{zone.activeFleet}</td>
                        <td className="px-4 py-2.5">
                          {zone.activeBrand ? (
                            <span className="text-[9px] font-black text-amber-400 flex items-center gap-1">
                              <ShieldAlert size={9} /> {zone.activeBrand}
                            </span>
                          ) : isRecommended ? (
                            <span className="text-[9px] font-black text-amber-300 flex items-center gap-1">
                              <Star size={9} /> Recommended
                            </span>
                          ) : (
                            <span className="text-[9px] font-black text-green-400">Available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
