// components/wizard/Step3Review.tsx
"use client";
import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, FileImage } from 'lucide-react';

interface ValidationItem {
  field: string;
  step: number;
  missing: boolean;
}

export default function Step3Review({ formData, onSubmit, onSaveDraft }: any) {
  const [paymentMethod, setPaymentMethod] = useState('corp');

  const today = new Date().toISOString().split('T')[0];

  const validations: ValidationItem[] = [
    { field: 'Campaign Name',    step: 1, missing: !formData.name?.trim() },
    { field: 'Brand',            step: 1, missing: !formData.brand },
    { field: 'Category',         step: 1, missing: !formData.category },
    { field: 'Cost Model',       step: 1, missing: !formData.costModel },
    { field: 'Daily Budget',     step: 1, missing: !formData.budget || formData.budget < 15000 },
    { field: 'Start Date',       step: 1, missing: !formData.startDate || formData.startDate < today },
    { field: 'End Date',         step: 1, missing: !formData.endDate || formData.endDate <= formData.startDate },
    { field: 'Target Zones',     step: 2, missing: !formData.cities?.length },
    { field: 'Creative Artwork', step: 2, missing: !formData.artwork },
  ];

  const errors   = validations.filter(v => v.missing);
  const isValid  = errors.length === 0;
  const isDraft  = !formData.artwork; // artwork missing = draft only

  const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n?.toLocaleString('en-IN') || '0'}`;

  const totalImpressions = (formData.cities || []).reduce((s: number, c: any) => s + (c.verifiedImpressions || 0), 0);

  return (
    <div className="flex gap-10 animate-in fade-in duration-500">

      {/* ── Left: Summary ── */}
      <div className="flex-1 space-y-6">

        {/* Validation Panel */}
        {errors.length > 0 && (
          <div className="border border-red-200 bg-red-50/50 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-red-600 shrink-0" />
              <p className="text-sm font-bold text-red-700">
                {errors.length} field{errors.length > 1 ? 's' : ''} need attention before submitting
              </p>
            </div>
            <div className="space-y-2">
              {errors.map((e, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-[9px] font-black flex items-center justify-center shrink-0">
                    S{e.step}
                  </span>
                  <span className="text-xs font-bold text-red-700">{e.field}</span>
                  <span className="text-[9px] font-bold text-red-400 uppercase ml-auto">Step {e.step}</span>
                </div>
              ))}
            </div>
            {isDraft && (
              <p className="text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3">
                Missing artwork — campaign can only be saved as Draft, not submitted for approval.
              </p>
            )}
          </div>
        )}

        {isValid && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <CheckCircle2 size={16} className="shrink-0" />
            <p className="text-sm font-bold">All fields complete — ready to submit for approval.</p>
          </div>
        )}

        {/* Campaign Summary Card */}
        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
          <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-5">Campaign Summary</h3>
          <h2 className="text-3xl font-bold tracking-tighter italic mb-6">{formData.name || 'Untitled Campaign'}</h2>

          <div className="space-y-4 text-sm">
            {[
              { label: 'Brand',         val: formData.brand || null },
              { label: 'Category',      val: formData.category || null },
              { label: 'Cost Model',    val: formData.costModel === 'fixed' ? 'Fixed Fleet Rate' : formData.costModel === 'performance' ? 'Cost Per Ad-KM' : null },
              { label: 'Duration',      val: (formData.startDate && formData.endDate) ? `${formData.startDate} → ${formData.endDate}` : null },
              { label: 'Daily Budget',  val: formData.budget >= 15000 ? fmt(formData.budget) : null },
              {
                label: 'Target Zones',
                val: formData.cities?.length > 0
                  ? formData.cities.map((c: any) => `${c.zoneLabel} (${c.count} vehicles)`).join(', ')
                  : null
              },
              {
                label: 'Est. GPS-Impressions',
                val: totalImpressions > 0 ? `${(totalImpressions / 100000).toFixed(1)}L / month` : null
              },
              {
                label: 'Creative Artwork',
                val: formData.artworkName || null,
                icon: formData.artworkName ? <FileImage size={12} className="text-green-600 inline mr-1" /> : null,
              },
            ].map((item, i) => (
              <div key={i} className="flex justify-between border-b border-zinc-200 pb-3">
                <span className="font-bold text-zinc-400 uppercase text-[10px]">{item.label}</span>
                {item.val
                  ? <span className="font-bold text-zinc-900 text-right max-w-[55%] text-xs">{item.icon}{item.val}</span>
                  : <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded uppercase border border-red-100">Missing</span>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Payment ── */}
      <div className="w-[360px] space-y-4 shrink-0">
        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6">
          <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-5">Financial Breakdown</h3>
          <div className="space-y-3 text-[13px] mb-6">
            <div className="flex justify-between text-zinc-500"><span>Fleet Allocation</span><span className="font-bold">₹6,50,000</span></div>
            <div className="flex justify-between text-zinc-500"><span>Production & Ops</span><span className="font-bold">₹1,42,000</span></div>
            <div className="flex justify-between text-zinc-500"><span>Platform Fee (2%)</span><span className="font-bold">₹15,924</span></div>
            <div className="flex justify-between font-black text-black text-base pt-3 border-t border-zinc-200">
              <span>Total Budget</span><span>₹8,07,924</span>
            </div>
          </div>

          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Payment Method</p>
          <div className="space-y-3 mb-5">
            {[
              { id: 'corp', label: 'Corporate Wallet', meta: 'Balance: ₹12.4L', tag: 'CORP' },
              { id: 'upi',  label: 'UPI / Credit Card', tag: 'CARD' },
            ].map(pm => (
              <div
                key={pm.id}
                onClick={() => setPaymentMethod(pm.id)}
                className={`rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all border-2 ${
                  paymentMethod === pm.id ? 'border-black bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300'
                }`}
              >
                <div className="w-10 h-6 bg-zinc-900 text-white rounded flex items-center justify-center text-[8px] font-black">{pm.tag}</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-black">{pm.label}</p>
                  {pm.meta && <p className="text-[10px] text-zinc-400 font-bold">{pm.meta}</p>}
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === pm.id ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-200'}`} />
              </div>
            ))}
          </div>

          {/* Submit notice */}
          <div className="bg-zinc-100 rounded-xl p-3 text-[10px] font-bold text-zinc-500">
            {isValid
              ? 'Submitting will lock budget and move campaign to Pending Approval. Our team will review within 1–2 business days.'
              : 'Fix all missing fields to enable Submit. You can still save as Draft now.'
            }
          </div>
        </div>
      </div>

    </div>
  );
}