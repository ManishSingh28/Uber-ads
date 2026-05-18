"use client";
import React, { useState } from 'react';
import { H3_ZONES } from '@/lib/data';
import { ShieldAlert, Star, X } from 'lucide-react';

const CITIES = Object.keys(H3_ZONES);

export default function HeatmapModal({ setIsHeatmapOpen }: any) {
  const [activeCity, setActiveCity] = useState(CITIES[0]);

  const zones = H3_ZONES[activeCity] || [];
  const maxImpressions = Math.max(...zones.map(z => z.verifiedImpressions));

  const fmt = (n: number) => n >= 100000 ? `${(n/100000).toFixed(1)}L` : `${(n/1000).toFixed(0)}K`;

  // Heat color based on impression density
  const heatColor = (impressions: number, tier: string) => {
    const ratio = impressions / maxImpressions;
    if (tier === 'premium') {
      if (ratio > 0.85) return 'bg-red-500';
      if (ratio > 0.65) return 'bg-orange-400';
      return 'bg-amber-400';
    }
    if (ratio > 0.65) return 'bg-blue-500';
    return 'bg-blue-300';
  };

  const totalVerified = zones.reduce((s, z) => s + z.verifiedImpressions, 0);
  const totalFleet = zones.reduce((s, z) => s + z.activeFleet, 0);
  const blockedZones = zones.filter(z => z.activeBrand).length;

  return (
    <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 w-full max-w-6xl h-[85vh] rounded-[32px] flex flex-col overflow-hidden border border-slate-700 shadow-2xl">

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center text-white">
          <div>
            <h3 className="font-black italic uppercase tracking-wider text-xl">Route Intelligence</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">H3 Hexagonal Zone Density — GPS Verified</p>
          </div>
          <button onClick={() => setIsHeatmapOpen(false)} className="text-3xl font-bold text-gray-500 hover:text-white transition-colors">×</button>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* City tabs */}
          <div className="w-48 border-r border-slate-800 flex flex-col py-4 gap-1 px-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">Cities</p>
            {CITIES.map(city => {
              const shortName = city.split(',')[0];
              return (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeCity === city ? 'bg-white text-black' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {shortName}
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-px bg-slate-800 border-b border-slate-800">
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

            {/* Zone heatmap grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {zones.map(zone => {
                  const barWidth = Math.round((zone.verifiedImpressions / maxImpressions) * 100);
                  const isBlocked = !!zone.activeBrand;

                  return (
                    <div
                      key={zone.id}
                      className={`rounded-2xl p-5 border transition-all ${
                        isBlocked ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-white text-sm">{zone.label}</span>
                          {zone.tier === 'premium' && (
                            <span className="flex items-center gap-1 text-[9px] font-black bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase">
                              <Star size={8} fill="currentColor" /> Premium
                            </span>
                          )}
                        </div>
                        {isBlocked && (
                          <div className="flex items-center gap-1 text-[9px] font-black text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                            <ShieldAlert size={10} /> {zone.activeBrand}
                          </div>
                        )}
                      </div>

                      {/* Heat bar */}
                      <div className="h-2 bg-slate-700 rounded-full mb-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${heatColor(zone.verifiedImpressions, zone.tier)}`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">👁 {fmt(zone.verifiedImpressions)} verified impr/mo</span>
                        <span className="text-slate-400">🚗 {zone.activeFleet} vehicles</span>
                      </div>

                      {isBlocked && (
                        <div className="mt-2 text-[10px] text-red-400/80 font-bold">
                          Zone locked — exclusively booked by {zone.activeBrand}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /> Premium High-Density</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400" /> Premium Mid-Density</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /> Standard High-Density</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-300" /> Standard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
