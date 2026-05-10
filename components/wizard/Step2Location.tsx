import React from 'react';
import { Library, X } from 'lucide-react';
import { OOH_CITIES } from '@/lib/data';

export default function Step2Location({ formData, updateForm }: any) {
  
  const handleAddCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    if (city && !formData.cities.includes(city)) {
      updateForm({ cities: [...formData.cities, city] });
    }
    e.target.value = ""; // Reset dropdown
  };

  const removeCity = (cityToRemove: string) => {
    updateForm({ cities: formData.cities.filter((c: string) => c !== cityToRemove) });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* BLOCK A: CREATIVE */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-black uppercase text-sm tracking-wider">Creative Assets (Banner)</h3>
            <a href="#" className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">View Uber Vinyl Guidelines ↗</a>
        </div>
        <div className="border-2 border-dashed border-gray-300 bg-white rounded-2xl p-10 text-center hover:bg-gray-50 cursor-pointer transition-colors group">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors"><Library size={24}/></div>
          <p className="text-gray-900 font-bold">Upload New Artwork or Choose from Library</p>
          <p className="text-xs text-gray-400 mt-2 font-medium">Supports High-Res PDF, AI, PSD formats</p>
        </div>
      </div>

      {/* BLOCK B: LOCATION */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="font-black uppercase text-sm tracking-wider mb-4">Target Hubs & Corridors</h3>
        <label htmlFor="citySelect" className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Add OOH Supported Cities</label>
        <select id="citySelect" defaultValue="" onChange={handleAddCity} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white mb-4">
            <option value="" disabled>Select cities to add to roster...</option>
            {OOH_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
        </select>

        {/* Selected City Chips */}
        {formData.cities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 p-4 bg-white border border-gray-200 rounded-xl">
                {formData.cities.map((city: string) => (
                    <div key={city} className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                        {city}
                        <button onClick={() => removeCity(city)} className="hover:text-red-400"><X size={14}/></button>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}