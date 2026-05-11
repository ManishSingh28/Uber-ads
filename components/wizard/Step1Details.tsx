// component/wizard/Step1Details.tsx
import React from 'react';
import { BRANDS, CATEGORIES, COST_MODELS } from '@/lib/data';
import { AlertCircle } from 'lucide-react';

export default function Step1Details({ formData, updateForm }: any) {
  // Edge Case Logic: Budget validation
  const minBudget = 15000;
  const isBudgetTooLow = formData.budget > 0 && formData.budget < minBudget;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Campaign Name</label>
        <input 
          type="text" placeholder="e.g. Q3 Summer Refresh" 
          value={formData.name || ''} onChange={(e) => updateForm({ name: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-black transition-all font-bold" 
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Brand Selection</label>
          <select value={formData.brand || ''} onChange={(e) => updateForm({ brand: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white">
            <option value="" disabled>Select Brand...</option>
            {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Category</label>
          <select value={formData.category || ''} onChange={(e) => updateForm({ category: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white">
            <option value="" disabled>Select Category...</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Billing & Cost Model</label>
          <select value={formData.costModel || ''} onChange={(e) => updateForm({ costModel: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold bg-white">
            <option value="" disabled>Select Cost Model...</option>
            {COST_MODELS.map(model => <option key={model.id} value={model.id}>{model.label}</option>)}
          </select>
        </div>
        
        {/* NEW: BUDGET INPUT WITH EDGE CASE VALIDATION */}
        <div className="relative">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Daily Budget (₹)</label>
          <input 
            type="number" placeholder="Enter amount..." 
            value={formData.budget || ''} onChange={(e) => updateForm({ budget: Number(e.target.value) })}
            className={`w-full p-4 border rounded-xl font-bold outline-none transition-all ${isBudgetTooLow ? 'border-red-500 focus:border-red-500 bg-red-50/50' : 'border-gray-300 focus:border-black'}`} 
          />
          {isBudgetTooLow && (
              <div className="absolute top-full mt-2 left-0 flex items-center gap-1.5 text-red-600 text-[10px] font-black uppercase tracking-wider">
                  <AlertCircle size={12} /> Minimum daily budget is ₹15,000 for enterprise campaigns.
              </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-4">
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Start Date</label>
          <input type="date" value={formData.startDate || ''} onChange={(e) => updateForm({ startDate: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold uppercase text-sm" />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">End Date</label>
          <input type="date" value={formData.endDate || ''} onChange={(e) => updateForm({ endDate: e.target.value })} className="w-full p-4 border border-gray-300 rounded-xl font-bold uppercase text-sm" />
        </div>
      </div>
    </div>
  );
}