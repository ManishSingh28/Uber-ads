// component/wizard/Step3Review.tsx
"use client";
import React, { useState } from 'react';

export default function Step3Review({ formData }: any) {
  const [paymentMethod, setPaymentMethod] = useState('corp');

  return (
    <div className="flex gap-10 animate-in fade-in duration-500">
      <div className="flex-1 uber-card p-10 bg-zinc-50 border border-zinc-100">
        <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-8">Campaign Summary</h3>
        <h2 className="text-4xl font-bold tracking-tighter mb-8 italic">{formData.name || "Untitled Campaign"}</h2>
        
        <div className="space-y-6 text-sm">
            {[
                { label: 'Brand Partner', val: formData.brand || "Not Selected" },
                { label: 'Duration', val: `${formData.startDate || "TBD"} to ${formData.endDate || "TBD"}` },
                { 
                  label: 'Selected Zones', 
                  val: formData.cities?.length > 0 
                        ? formData.cities.map((c: any) => `${c.zoneLabel || c.name} (${c.count} vehicles)`).join(', ') 
                        : "None" 
                },
                {
                  label: 'Est. GPS-Verified Impressions',
                  val: formData.cities?.length > 0
                    ? (() => {
                        const total = formData.cities.reduce((sum: number, c: any) => sum + (c.verifiedImpressions || 0), 0);
                        return total > 0 ? `${(total / 100000).toFixed(1)}L / month` : 'N/A';
                      })()
                    : 'N/A'
                },
                { label: 'Artwork Status', val: 'Awaiting Upload', accent: true }
            ].map((item, i) => (
                <div key={i} className="flex justify-between border-b border-zinc-200 pb-4">
                    <span className="font-bold text-zinc-400 uppercase text-[10px]">{item.label}</span>
                    <span className={`font-bold ${item.accent ? 'text-zinc-900 underline' : 'text-zinc-900'}`}>{item.val}</span>
                </div>
            ))}
        </div>
      </div>

      <div className="w-[380px] space-y-4">
        <div className="uber-card p-8 border border-zinc-100">
            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-6">Financial Breakdown</h3>
            <div className="space-y-4 text-[13px] mb-8">
                <div className="flex justify-between text-zinc-500"><span>Fleet Allocation</span><span className="font-bold">₹650,000</span></div>
                <div className="flex justify-between text-zinc-500"><span>Production Ops</span><span className="font-bold">₹142,000</span></div>
                <div className="flex justify-between font-black text-black text-lg pt-4 border-t border-zinc-100">
                    <span>Total Budget</span><span>₹957,924</span>
                </div>
            </div>

            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Payment Selection</p>
            <div className="space-y-3">
                {[
                    { id: 'corp', label: 'Corporate Wallet', meta: 'Balance: ₹1.2M', tag: 'CORP' },
                    { id: 'upi', label: 'UPI / Credit Card', tag: 'CARD' }
                ].map((pm) => (
                    <div 
                        key={pm.id} onClick={() => setPaymentMethod(pm.id)}
                        className={`rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all border-2 ${
                            paymentMethod === pm.id ? 'border-black bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300'
                        }`}
                    >
                        <div className="w-10 h-6 bg-zinc-900 text-white rounded flex items-center justify-center text-[8px] font-black">{pm.tag}</div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-black">{pm.label}</p>
                            {pm.meta && <p className="text-[10px] text-zinc-400 font-bold">{pm.meta}</p>}
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === pm.id ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-200'}`}></div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}