// components/DriverPortal.tsx
"use client";
import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function DriverPortal() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 pb-20 mt-4">
      <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-green-500">
          <div className="flex justify-between items-start mb-4">
              <div>
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Bonus Earnings</p>
                  <h2 className="text-4xl font-black italic">₹3,420</h2>
              </div>
              <div className="text-right">
                  <p className="text-green-600 text-[10px] font-black uppercase">Condition</p>
                  <h2 className="text-2xl font-black text-green-600">9.8<span className="text-sm">/10</span></h2>
              </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
              <p className="text-[10px] font-bold text-blue-700 uppercase">Banner Verified: UBR-COKE-BLR-992</p>
          </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
              <h3 className="font-black uppercase text-xs tracking-widest text-gray-900 italic">Campaign Terms</h3>
              <span className="bg-black text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Active</span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-5">
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Brand Partner</p>
                  <p className="font-bold text-sm">Coca-Cola India</p>
              </div>
              <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Banner ID</p>
                  <p className="font-mono font-bold text-sm">COKE-BLR-992</p>
              </div>
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Fleet Duration</p>
                  <p className="font-bold text-sm text-gray-900">45 Days <span className="text-[10px] text-gray-500 font-medium">(Day 14)</span></p>
              </div>
              <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Expected Payout</p>
                  <p className="font-bold text-sm text-green-600">₹12,500 <span className="text-[10px] text-gray-500 font-medium">Est.</span></p>
              </div>
              <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Target Distance</p>
                  <p className="font-bold text-sm">1,200 KM</p>
              </div>
              <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Earnings Rate</p>
                  <p className="font-bold text-sm">₹3.50 / KM</p>
              </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Paint-Safe Vinyl Warranty Active</p>
              </div>
              <p className="text-[10px] font-black text-blue-600 uppercase cursor-pointer hover:underline">View Contract</p>
          </div>
      </div>

      <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-wider">Security Check Required</span>
              </div>
              <p className="text-sm opacity-90 mb-6 font-medium leading-tight">Verify ad condition to release your ₹850 weekly bonus.</p>
              <button 
                  onClick={() => setIsCameraOpen(true)} 
                  className="w-full bg-white text-blue-600 font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                  <Camera size={20} /> OPEN CAMERA
              </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
      </div>

      <div className="bg-black text-white p-6 rounded-3xl shadow-lg">
          <div className="flex justify-between items-start mb-6">
              <div>
                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Upcoming Hub Visit</h4>
                  <p className="text-xl font-bold">Indiranagar Hub</p>
                  <p className="text-xs text-gray-400 mt-1">12, 80 Feet Rd, HAL 2nd Stage</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-xl text-center min-w-[60px]">
                  <p className="text-[10px] font-black uppercase text-gray-500">June</p>
                  <p className="text-xl font-black">15</p>
              </div>
          </div>
          <div className="flex gap-3">
              <button className="flex-1 bg-white text-black py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-gray-100 transition-colors">Navigate</button>
              <button className="flex-1 border border-gray-700 hover:border-gray-500 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">Reschedule</button>
          </div>
      </div>

      {isCameraOpen && (
          <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center animate-in fade-in">
              <div className="w-72 aspect-[3/4] border-4 border-dashed border-white/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                  <p className="text-white/60 text-center px-6 text-sm font-bold uppercase italic z-10">Align Vinyl QR Code Inside Guide</p>
              </div>
              <button onClick={() => {setIsCameraOpen(false); alert('Verification Received & Analyzed by AI!')}} className="mt-12 bg-white w-20 h-20 rounded-full border-4 border-gray-300 shadow-[0_0_0_4px_rgba(255,255,255,0.2)] active:scale-90 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-black"></div>
              </button>
              <button onClick={() => setIsCameraOpen(false)} className="absolute top-6 right-6 text-white font-bold uppercase text-xs tracking-widest">Cancel</button>
          </div>
      )}
    </div>
  );
}