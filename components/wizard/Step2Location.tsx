// components/wizard/Step2Location.tsx
import React from 'react';
import { Library, X, Plus } from 'lucide-react';
import { OOH_CITIES } from '@/lib/data';

// Standard Uber vehicle classifications
const VEHICLE_TYPES = ["Auto Rickshaw", "Mini Truck (6 tyres)", "Large Truck (10/12 tyres)"];

export default function Step2Location({ formData, updateForm }: any) {
  
  const handleAddCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    const currentCities = formData.cities || [];
    
    // Check if city is already in the list to prevent duplicates
    if (cityName && !currentCities.find((c: any) => c.name === cityName)) {
      const newCityConfig = {
        name: cityName,
        vehicleType: "Auto Rickshaw", // Default selection
        count: 25 // Default count
      };
      updateForm({ cities: [...currentCities, newCityConfig] });
    }
    e.target.value = ""; 
  };

  const updateCityConfig = (index: number, field: string, value: any) => {
    const newCities = [...formData.cities];
    newCities[index] = { ...newCities[index], [field]: value };
    updateForm({ cities: newCities });
  };

  const removeCity = (index: number) => {
    const newCities = formData.cities.filter((_: any, i: number) => i !== index);
    updateForm({ cities: newCities });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* CITY SELECTION & GRANULAR CONFIGURATION */}
      <div className="uber-card p-8 border border-zinc-100">
        <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400 mb-6 italic">Regional Logistics</h3>
        
        <div className="mb-8">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Add Target City</label>
            <div className="relative max-w-md">
                <select 
                    defaultValue="" 
                    onChange={handleAddCity} 
                    className="w-full p-4 bg-zinc-50 rounded-xl font-bold border border-transparent focus:bg-white focus:border-black outline-none appearance-none transition-all"
                >
                    <option value="" disabled>Select a city to add...</option>
                    {OOH_CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Plus size={18} className="text-zinc-400" />
                </div>
            </div>
        </div>

        {/* COLLECTED CITIES CONFIGURATION LIST */}
        <div className="space-y-4">
            {formData.cities?.length > 0 ? (
                formData.cities.map((city: any, index: number) => (
                    <div key={city.name} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 animate-in slide-in-from-left-2">
                        {/* City Name Display */}
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">City</p>
                            <p className="font-bold text-zinc-900">{city.name}</p>
                        </div>

                        {/* Vehicle Type Selection */}
                        <div className="w-full md:w-56">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Vehicle Type</p>
                            <select 
                                value={city.vehicleType} 
                                onChange={(e) => updateCityConfig(index, 'vehicleType', e.target.value)}
                                className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:border-black"
                            >
                                {VEHICLE_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Fleet Size Input */}
                        <div className="w-full md:w-32">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Fleet Count</p>
                            <input 
                                type="number" 
                                value={city.count} 
                                onChange={(e) => updateCityConfig(index, 'count', Number(e.target.value))}
                                className="w-full bg-white border border-zinc-200 rounded-lg p-2.5 text-sm font-bold outline-none focus:border-black"
                            />
                        </div>

                        {/* Remove Row Action */}
                        <div className="pt-4 md:pt-4">
                            <button 
                                onClick={() => removeCity(index)}
                                className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-400 hover:text-black transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-zinc-100 rounded-[2rem]">
                    <p className="text-zinc-400 text-sm font-medium">No cities selected. Use the dropdown above to add regions.</p>
                </div>
            )}
        </div>
      </div>

      {/* CREATIVE ASSETS SECTION (Preserved as is) */}
      <div className="uber-card p-8 border border-zinc-100">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold uppercase text-xs tracking-widest text-zinc-400 italic">Creative Asset Management</h3>
            <span className="text-[10px] font-bold text-zinc-400 uppercase">Guidelines ↗</span>
        </div>
        <div className="border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-[2rem] p-12 text-center hover:border-black cursor-pointer transition-all">
          <Library size={32} className="mx-auto mb-4 text-zinc-300"/>
          <p className="text-zinc-900 font-bold">Upload Print-Ready Artwork</p>
          <p className="text-[10px] text-zinc-400 font-bold uppercase mt-2">Vector or UHD Image Formats</p>
        </div>
      </div>

    </div>
  );
}