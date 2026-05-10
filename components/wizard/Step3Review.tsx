// component/wizard/Step3Review.tsx
"use client";
import React, { useState } from 'react';

export default function Step3Review({ formData }: any) {
  // NEW: State to track selected payment method
  const [paymentMethod, setPaymentMethod] = useState('corp');

  return (
    <div className="flex gap-8 animate-in fade-in duration-500 min-h-[400px]">
      
      {/* LEFT COLUMN: CAMPAIGN SUMMARY */}
      <div className="flex-1 bg-gray-50 p-8 rounded-3xl border border-gray-200">
        <h3 className="font-black uppercase text-sm tracking-wider mb-6 text-gray-400">Campaign Summary</h3>
        <h2 className="text-2xl font-black mb-6">{formData.name || "Untitled Campaign"}</h2>
        
        <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-bold text-gray-500">Brand</span>
                <span className="font-black">{formData.brand || "Not Selected"}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-bold text-gray-500">Duration</span>
                <span className="font-black uppercase">{formData.startDate || "TBD"} to {formData.endDate || "TBD"}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-bold text-gray-500">Target Cities ({formData.cities?.length || 0})</span>
                <span className="font-black text-right max-w-[50%]">{formData.cities?.join(', ') || "None selected"}</span>
            </div>
            <div className="flex justify-between pb-3">
                <span className="font-bold text-gray-500">Creative Asset</span>
                <span className="font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">Pending Upload</span>
            </div>
        </div>
      </div>

      {/* RIGHT COLUMN: PAYMENT BREAKDOWN */}
      <div className="w-[340px] bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
        
        <div>
            <h3 className="font-black uppercase text-sm tracking-wider mb-6 text-gray-400">Financial Breakdown</h3>
            <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-500"><span>Base Fleet Allocation</span><span>₹650,000</span></div>
                <div className="flex justify-between text-gray-500"><span>Vinyl Print & Hub Ops</span><span>₹142,000</span></div>
                <div className="flex justify-between text-gray-500"><span>Platform Fee (2.5%)</span><span>₹19,800</span></div>
                <div className="flex justify-between text-gray-400 text-xs pt-2 border-t"><span>Estimated GST (18%)</span><span>₹146,124</span></div>
            </div>
        </div>
        
        <div className="space-y-6">
            {/* Total Budget */}
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">Total Estimated Budget</p>
                <h4 className="text-3xl font-black text-green-800">₹957,924</h4>
            </div>

            {/* Payment Method Selection */}
            <div className="border-t border-gray-100 pt-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Payment Method</p>
                
                {/* Corporate Wallet Option */}
                <div 
                    onClick={() => setPaymentMethod('corp')}
                    className={`rounded-xl p-3 flex items-center gap-3 cursor-pointer mb-2 transition-all ${
                        paymentMethod === 'corp' ? 'border-2 border-blue-600 bg-blue-50/30 shadow-sm' : 'border border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className={`w-10 h-6 rounded flex items-center justify-center text-[8px] font-black tracking-widest ${paymentMethod === 'corp' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500'}`}>CORP</div>
                    <div className="flex-1">
                        <p className={`text-xs font-bold ${paymentMethod === 'corp' ? 'text-gray-900' : 'text-gray-600'}`}>Corporate Wallet</p>
                        <p className="text-[10px] text-gray-500 font-medium">Balance: ₹1.2M</p>
                    </div>
                    {/* The dynamic radio circle */}
                    <div className={`w-4 h-4 rounded-full bg-white transition-all ${paymentMethod === 'corp' ? 'border-4 border-blue-600' : 'border-2 border-gray-300'}`}></div>
                </div>

                {/* UPI / Card Option */}
                <div 
                    onClick={() => setPaymentMethod('upi')}
                    className={`rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${
                        paymentMethod === 'upi' ? 'border-2 border-blue-600 bg-blue-50/30 shadow-sm' : 'border border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className={`w-10 h-6 rounded flex items-center justify-center text-[10px] font-black ${paymentMethod === 'upi' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500'}`}>UPI</div>
                    <div className="flex-1">
                        <p className={`text-xs font-bold ${paymentMethod === 'upi' ? 'text-gray-900' : 'text-gray-600'}`}>Pay via UPI / Card</p>
                    </div>
                    {/* The dynamic radio circle */}
                    <div className={`w-4 h-4 rounded-full bg-white transition-all ${paymentMethod === 'upi' ? 'border-4 border-blue-600' : 'border-2 border-gray-300'}`}></div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}