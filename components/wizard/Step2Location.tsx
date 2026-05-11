// component/wizard/Step2Location.tsx
import React from 'react';
import { Library, X, AlertTriangle } from 'lucide-react';
import { OOH_CITIES } from '@/lib/data';

export default function Step2Location({ formData, updateForm }: any) {
  
  // Edge Case Logic: Inventory constraint based on cities selected
  const availableInventory = (formData.cities?.length || 0) * 1200; // Fake math: 1200 cabs per city
  const isInventoryShort = formData.targetFleet > availableInventory && formData.cities?.length > 0;

  const handleAddCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    const currentCities = formData.cities || [];
    if (city && !currentCities.includes(city)) {
      updateForm({ cities: [...currentCities, city] });
    }
    e.target.value = ""; 
  };

  const removeCity = (cityToRemove: string) => {
    updateForm({ cities: formData.cities.filter((c: string) => c !== cityToRemove) });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="font-black uppercase text-sm tracking-wider mb-4">Target Hubs & Corridors</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Add Cities</label>
                <select defaultValue="" onChange={handleAddCity} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white">
                    <option value="" disabled>Select cities...</option>
                    {OOH_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
            
            {/* NEW: FLEET TARGET INPUT WITH EDGE CASE */}
            <div className="relative">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Target Fleet Size (Vehicles)</label>
                <input 
                    type="number" placeholder="e.g. 500" 
                    value={formData.targetFleet || ''} onChange={(e) => updateForm({ targetFleet: Number(e.target.value) })}
                    className={`w-full p-4 border rounded-xl font-bold outline-none transition-all ${isInventoryShort ? 'border-amber-500 focus:border-amber-500 bg-amber-50/30' : 'border-gray-300 focus:border-black'}`} 
                />
            </div>
        </div>

        {/* EDGE CASE WARNING: High Demand / Low Inventory */}
        {isInventoryShort && (
            <div className="bg-amber-100/50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 mb-4 animate-in fade-in">
                <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-xs font-black text-amber-800 uppercase tracking-wider mb-1">Inventory Shortage Detected</p>
                    <p className="text-xs text-amber-700 font-medium">You requested {formData.targetFleet} vehicles, but only ~{availableInventory} are available in your selected regions. Expanding to more cities will increase routing speed.</p>
                </div>
            </div>
        )}

        {formData.cities?.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-white border border-gray-200 rounded-xl">
                {formData.cities.map((city: string) => (
                    <div key={city} className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                        {city}
                        <button onClick={() => removeCity(city)} className="hover:text-red-400"><X size={14}/></button>
                    </div>
                ))}
            </div>
        )}
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-black uppercase text-sm tracking-wider">Creative Assets</h3>
            <a href="#" className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">Guidelines ↗</a>
        </div>
        <div className="border-2 border-dashed border-gray-300 bg-white rounded-2xl p-10 text-center hover:bg-gray-50 cursor-pointer transition-colors group">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors"><Library size={24}/></div>
          <p className="text-gray-900 font-bold">Upload New Artwork</p>
        </div>
      </div>

    </div>
  );
}