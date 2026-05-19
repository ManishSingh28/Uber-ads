// components/wizard/Step2Location.tsx
import React, { useState, useRef } from 'react';
import { Library, X, Plus, ShieldAlert, CheckCircle, Star, Upload, AlertCircle, FileImage } from 'lucide-react';
import { OOH_CITIES, VEHICLE_TYPES, H3_ZONES } from '@/lib/data';

const CURRENT_BRAND = "Sprite";

const ACCEPTED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
const ACCEPTED_EXT   = '.svg, .png, .jpg, .jpeg, .webp';
const MIN_DIMENSION  = 2000; // px — for raster
const MAX_SIZE_MB     = 50;

export default function Step2Location({ formData, updateForm }: any) {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [artworkError, setArtworkError] = useState<string | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(formData.artworkPreview || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArtworkError(null);

    // Type check
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setArtworkError('Invalid file type. Upload SVG, PNG, JPG, or WebP only.');
      return;
    }

    // Size check
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setArtworkError(`File too large. Maximum size is ${MAX_SIZE_MB} MB.`);
      return;
    }

    // Dimension check for rasters
    if (file.type !== 'image/svg+xml') {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < MIN_DIMENSION || img.height < MIN_DIMENSION) {
          setArtworkError(`Resolution too low (${img.width}×${img.height}px). Minimum ${MIN_DIMENSION}×${MIN_DIMENSION}px required for print quality.`);
          URL.revokeObjectURL(url);
          updateForm({ artwork: null, artworkPreview: null, artworkName: null });
          setArtworkPreview(null);
        } else {
          setArtworkPreview(url);
          updateForm({ artwork: file.name, artworkPreview: url, artworkName: file.name });
        }
      };
      img.src = url;
    } else {
      // SVG — skip dimension check
      const url = URL.createObjectURL(file);
      setArtworkPreview(url);
      updateForm({ artwork: file.name, artworkPreview: url, artworkName: file.name });
    }
  };

  const removeArtwork = () => {
    setArtworkPreview(null);
    setArtworkError(null);
    updateForm({ artwork: null, artworkPreview: null, artworkName: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const availableZones = selectedCity ? H3_ZONES[selectedCity] || [] : [];
  const addedZoneIds   = (formData.cities || []).map((c: any) => c.zoneId);
  const fmt = (n: number) => n >= 100000 ? `${(n/100000).toFixed(1)}L` : n >= 1000 ? `${(n/1000).toFixed(0)}K` : `${n}`;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">

      {/* ── H3 Zone Targeting ── */}
      <div className="uber-card p-8 border border-zinc-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400 italic">H3 Zone Targeting</h3>
          <span className="text-[10px] font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">GPS-Verified Impressions</span>
        </div>

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

        {selectedCity && availableZones.length > 0 && (
          <div className="mb-8">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">
              Available Zones — {selectedCity}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableZones.map(zone => {
                const isAdded   = addedZoneIds.includes(zone.id);
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
                      {isAdded   && <CheckCircle size={16} className="text-black shrink-0" />}
                      {isBlocked && <ShieldAlert  size={16} className="text-red-400 shrink-0" />}
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
                <button onClick={() => removeZone(index)} className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-400 hover:text-black transition-colors mt-4 md:mt-0">
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Creative Asset Upload ── */}
      <div className="uber-card p-8 border border-zinc-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400 italic">Creative Asset</h3>
          <span className="text-[10px] font-bold text-zinc-400 uppercase">Required for Approval</span>
        </div>

        {/* Guidelines strip */}
        <div className="bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 mb-6 flex flex-wrap gap-x-6 gap-y-1">
          {[
            ['Format', 'SVG (preferred) · PNG · JPG · WebP'],
            ['Min Resolution', '2000 × 2000 px for raster'],
            ['Max File Size', '50 MB'],
            ['Colour Mode', 'RGB · Print-ready'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="text-[9px] font-black text-zinc-400 uppercase">{k}:</span>
              <span className="text-[9px] font-bold text-zinc-600">{v}</span>
            </div>
          ))}
        </div>

        {/* Upload zone */}
        {!artworkPreview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-[2rem] p-12 text-center cursor-pointer transition-all ${
              artworkError ? 'border-red-300 bg-red-50/30' : 'border-zinc-200 bg-zinc-50 hover:border-black'
            }`}
          >
            <Upload size={28} className="mx-auto mb-4 text-zinc-300" />
            <p className="text-zinc-900 font-bold mb-1">Upload Print-Ready Artwork</p>
            <p className="text-[10px] text-zinc-400 font-bold uppercase">Vector or UHD · Drag & drop or click to browse</p>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_EXT}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="border border-zinc-200 rounded-2xl overflow-hidden">
            <img src={artworkPreview} alt="Artwork preview" className="w-full h-52 object-cover" />
            <div className="flex items-center justify-between p-4 bg-zinc-50">
              <div className="flex items-center gap-2">
                <FileImage size={16} className="text-green-600" />
                <span className="text-xs font-bold text-zinc-700">{formData.artworkName}</span>
                <span className="text-[9px] font-black text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase">Verified ✓</span>
              </div>
              <button onClick={removeArtwork} className="text-xs font-bold text-red-500 hover:underline">Remove</button>
            </div>
          </div>
        )}

        {artworkError && (
          <div className="flex items-start gap-2 mt-3 text-red-600 text-xs font-bold">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            {artworkError}
          </div>
        )}

        {!artworkPreview && !artworkError && (
          <p className="text-[10px] text-amber-600 font-bold mt-3 flex items-center gap-1.5">
            <AlertCircle size={11} />
            Without artwork the campaign will be saved as Draft and cannot be submitted for approval.
          </p>
        )}
      </div>
    </div>
  );
}