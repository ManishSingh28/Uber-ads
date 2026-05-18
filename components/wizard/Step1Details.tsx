// components/wizard/Step1Details.tsx
import React from 'react';
import { BRANDS, CATEGORIES, COST_MODELS } from '@/lib/data';
import { AlertCircle } from 'lucide-react';

export default function Step1Details({ formData, updateForm }: any) {
  const minBudget = 15000;
  const isBudgetTooLow = formData.budget > 0 && formData.budget < minBudget;

  const today = new Date().toISOString().split('T')[0];
  const isEndBeforeStart = formData.startDate && formData.endDate && formData.endDate < formData.startDate;
  const isStartInPast = formData.startDate && formData.startDate < today;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Campaign Name</label>
        <input 
          type="text" placeholder="e.g. Q3 Summer Refresh" 
          value={formData.name || ''} onChange={(e) => updateForm({ name: e.target.value })}
          className="w-full p-4 bg-zinc-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-black transition-all font-bold text-zinc-900" 
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Brand Selection</label>
          <select value={formData.brand || ''} onChange={(e) => updateForm({ brand: e.target.value })} className="w-full p-4 bg-zinc-50 border border-transparent rounded-xl font-bold text-zinc-900 outline-none focus:bg-white focus:border-black appearance-none">
            <option value="" disabled>Select Brand...</option>
            {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Category</label>
          <select value={formData.category || ''} onChange={(e) => updateForm({ category: e.target.value })} className="w-full p-4 bg-zinc-50 border border-transparent rounded-xl font-bold text-zinc-900 outline-none focus:bg-white focus:border-black appearance-none">
            <option value="" disabled>Select Category...</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Cost Model</label>
          <select value={formData.costModel || ''} onChange={(e) => updateForm({ costModel: e.target.value })} className="w-full p-4 bg-zinc-50 border border-transparent rounded-xl font-bold text-zinc-900 outline-none focus:bg-white focus:border-black appearance-none">
            <option value="" disabled>Select Cost Model...</option>
            {COST_MODELS.map(model => <option key={model.id} value={model.id}>{model.label}</option>)}
          </select>
        </div>
        
        <div className="relative">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Daily Budget (₹)</label>
          <input 
            type="number" placeholder="Enter amount..." 
            value={formData.budget || ''} onChange={(e) => updateForm({ budget: Number(e.target.value) })}
            className={`w-full p-4 border rounded-xl font-bold outline-none transition-all ${isBudgetTooLow ? 'border-red-500 bg-red-50/20' : 'bg-zinc-50 border-transparent focus:bg-white focus:border-black'}`} 
          />
          {isBudgetTooLow && (
              <div className="absolute top-full mt-2 left-0 flex items-center gap-1.5 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                  <AlertCircle size={12} /> Minimum budget is ₹15,000.
              </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 pt-4">
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Start Date</label>
          <input
            type="date"
            min={today}
            value={formData.startDate || ''}
            onChange={(e) => updateForm({ startDate: e.target.value })}
            className={`w-full p-4 border rounded-xl font-bold text-zinc-900 uppercase text-xs outline-none transition-all ${isStartInPast ? 'border-red-400 bg-red-50/20' : 'bg-zinc-50 border-transparent focus:bg-white focus:border-black'}`}
          />
          {isStartInPast && (
            <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-bold uppercase tracking-wider mt-2">
              <AlertCircle size={12} /> Start date cannot be in the past.
            </div>
          )}
        </div>
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">End Date</label>
          <input
            type="date"
            min={formData.startDate || today}
            value={formData.endDate || ''}
            onChange={(e) => updateForm({ endDate: e.target.value })}
            className={`w-full p-4 border rounded-xl font-bold text-zinc-900 uppercase text-xs outline-none transition-all ${isEndBeforeStart ? 'border-red-400 bg-red-50/20' : 'bg-zinc-50 border-transparent focus:bg-white focus:border-black'}`}
          />
          {isEndBeforeStart && (
            <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-bold uppercase tracking-wider mt-2">
              <AlertCircle size={12} /> End date must be after start date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}