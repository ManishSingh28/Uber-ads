import React from 'react';
import { BRANDS, CATEGORIES, COST_MODELS } from '@/lib/data';

export default function Step1Details({ formData, updateForm }: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <label htmlFor="campaignName" className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Campaign Name</label>
        <input 
          id="campaignName" type="text" placeholder="e.g. Q3 Summer Refresh" 
          value={formData.name} onChange={(e) => updateForm({ name: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-bold" 
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="brand" className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Brand Selection</label>
          <select id="brand" value={formData.brand} onChange={(e) => updateForm({ brand: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white">
            <option value="" disabled>Select Brand...</option>
            {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Category</label>
          <select id="category" value={formData.category} onChange={(e) => updateForm({ category: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white">
            <option value="" disabled>Select Category...</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="costModel" className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Billing & Cost Model</label>
        <select id="costModel" value={formData.costModel} onChange={(e) => updateForm({ costModel: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white">
          <option value="" disabled>Select Cost Model...</option>
          {COST_MODELS.map(model => <option key={model.id} value={model.id}>{model.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Start Date</label>
          <input type="date" id="startDate" value={formData.startDate} onChange={(e) => updateForm({ startDate: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold uppercase text-sm" />
        </div>
        <div>
          <label htmlFor="endDate" className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">End Date</label>
          <input type="date" id="endDate" value={formData.endDate} onChange={(e) => updateForm({ endDate: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold uppercase text-sm" />
        </div>
      </div>
    </div>
  );
}