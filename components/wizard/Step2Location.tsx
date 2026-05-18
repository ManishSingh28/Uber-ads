import React, { useState } from 'react';
import { Library, X, Plus, ShieldAlert, CheckCircle, Star } from 'lucide-react';
import { OOH_CITIES, VEHICLE_TYPES, H3_ZONES } from '@/lib/data';

// Simulated current brand — in a real app this comes from auth context
const CURRENT_BRAND = "Sprite";

export default function Step2Location({ formData, updateForm }: any) {
  const [selectedCity, setSelectedCity] = useState<string>('');

  const handleAddZone = (zoneId: string, cityName: string) => {
    const currentZones = formData.cities || [];
    if (currentZones.find((c: any) => c.zoneId === zoneId)) return;

    const zoneData = H3_ZONES[cityName]?.find(z => z.id === zoneId);
    if (!zoneData) return;
    if (zoneData.activeBrand && zoneData.activeBrand !== CURRENT_BRAND) return;

    updateForm({
      cities: [...currentZones, {
        zoneId,
        name: `${cityName} · ${zoneData.label}`,
        cityName,
        zoneLabel: zoneData.label,
        tier: zoneData.tier,
        vehicleType: VEHICLE_TYPES[0],
        count: 25,
        verifiedImpressions: zoneData.verifiedImpressions,
        activeFleet: zoneData.activeFleet,
      }]
    });
  };

  const updateZoneConfig = (index: number, field: string, value: any) => {
    const newZones = [...formData.cities];
    newZones[index] = { ...newZones[index], [field]: value };
    updateForm({ cities: newZones });
  };

  const removeZone = (index: number) => {
    updateForm({ cities: formData.cities.filter((_: any, i: number) => i !== index) });
  };

  const availableZones = selectedCity ? H3_ZONES[selectedCity] || [] : [];
  const addedZoneIds = (formData.cities || []).map((c: any) => c.zoneId);

  const fmt = (n: number) => n >= 100000 ? `${(n/100000).toFixed(1)}L` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : `${n}`;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">

      <div className="uber-card p-8 border border-zinc-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400 italic">H3 Zone Targeting</h3>
          <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">GPS-Verified Impressions</span>
        </div>

        {/* City selector */}
        <div className="mb-6">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Select City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full max-w-md p-4 bg-zinc-50 rounded-xl font-bold border border-transparent focus:bg-white focus:border-black outline-none appearance-none transition-all"
          >
            <option value="" disabled>Choose a city...</option>
            {OOH_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        {/* Zone grid */}
        {selectedCity && availableZones.length > 0 && (
          <div className="mb-8">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">
              Available Zones — {selectedCity}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableZones.map(zone => {
                const isAdded = addedZoneIds.includes(zone.id);
                const isBlocked = !!(zone.activeBrand && zone.activeBrand !== CURRENT_BRAND);
                const isOwnedByMe = zone.activeBrand === CURRENT_BRAND;

                return (
                  <div
                    key={zone.id}
                    onClick={() => !isBlocked && !isAdded && handleAddZone(zone.id, selectedCity)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      isBlocked ? 'border-red-100 bg-red-50/30 opacity-80 cursor-not-allowed'
                      : isAdded ? 'border-black bg-zinc-50 cursor-default'
                      : 'border-zinc-100 hover:border-zinc-400 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-zinc-900">{zone.label}</span>
                        {zone.tier === 'premium' && (
                          <span className="flex items-center gap-1 text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">
                            <Star size={8} fill="currentColor" /> Premium · 2× CPM
                          </span>
                        )}
                      </div>
                      {isAdded && <CheckCircle size={16} className="text-black shrink-0" />}
                      {isBlocked && <ShieldAlert size={16} className="text-red-400 shrink-0" />}
                      {!isAdded && !isBlocked && <Plus size={16} className="text-zinc-400 shrink-0" />}
                    </div>

                    <div className="flex gap-4 text-[11px] font-bold text-zinc-500 mb-2">
                      <span>🚗 {zone.activeFleet} vehicles</span>
                      <span>👁 {fmt(zone.verifiedImpressions)} GPS-verified/mo</span>
                    </div>

                    {isBlocked && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1.5 rounded-lg">
                        <ShieldAlert size={10} />
                        Exclusive to {zone.activeBrand} — unavailable until their campaign ends.
                      </div>
                    )}
                    {isOwnedByMe && !isAdded && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1.5 rounded-lg">
                        <CheckCircle size={10} />
                        Your brand is active here — you can extend coverage.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!selectedCity && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-100 rounded-[2rem]">
            <p className="text-zinc-400 text-sm font-medium">Select a city above to explore available H3 zones.</p>
          </div>
        )}

        {/* Selected zones list */}
        {formData.cities?.length > 0 && (
          <div className="space-y-4 mt-4 pt-6 border-t border-zinc-100">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block">Configured Zones</label>
            {formData.cities.map((zone: any, index: number) => (
              <div key={zone.zoneId} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 animate-in slide-in-from-left-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-zinc-900 text-sm">{zone.zoneLabel}</p>
                    {zone.tier === 'premium' && (
                      <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">2× CPM</span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase">{zone.cityName}</p>
                  <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{fmt(zone.verifiedImpressions)} GPS-verified impr/mo · {zone.activeFleet} vehicles available</p>
                </div>

                <div className="w-full md:w-52">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Vehicle Type</p>
                  <select
                    value={zone.vehicleType}
                    onChange={(e) => updateZoneConfig(index, 'vehicleType', e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:border-black"
                  >
                    {VEHICLE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>

                <div className="w-full md:w-32">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Fleet Count</p>
                  <input
                    type="number" min={1} max={zone.activeFleet}
                    value={zone.count}
                    onChange={(e) => updateZoneConfig(index, 'count', Number(e.target.value))}
                    className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:border-black"
                  />
                  <p className="text-[9px] text-zinc-400 font-bold mt-1">Max {zone.activeFleet}</p>
                </div>

                <button
                  onClick={() => removeZone(index)}
                  className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-400 hover:text-black transition-colors mt-4 md:mt-0"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Creative Assets */}
      <div className="uber-card p-8 border border-zinc-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400 italic">Creative Asset Management</h3>
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Guidelines ↗</span>
        </div>
        <div className="border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-[2rem] p-12 text-center hover:border-black cursor-pointer transition-all">
          <Library size={32} className="mx-auto mb-4 text-zinc-300" />
          <p className="text-zinc-900 font-bold">Upload Print-Ready Artwork</p>
          <p className="text-[10px] text-zinc-400 font-bold uppercase mt-2">Vector or UHD Image Formats</p>
        </div>
      </div>
    </div>
  );
}
