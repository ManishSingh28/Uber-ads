// components/Navigation.tsx
"use client";
import React from 'react';
import { Car, Building2 } from 'lucide-react';

export default function Navigation({ activeApp, setActiveApp, setActivePage }: any) {
  return (
    <nav className="bg-white border-b border-zinc-100 h-16 px-8 flex items-center justify-between sticky top-0 z-50">
      {/* RESTORED: Click handler to reset portal */}
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => { setActiveApp('brand'); setActivePage('brand-portal'); }}
      >
        <span className="font-bold text-2xl tracking-tighter">Uber</span>
        <span className="text-sm font-medium text-zinc-400 mt-1">Ad-Drive</span>
      </div>
      
      {/* App Toggle Switches */}
      <div className="flex bg-zinc-100 p-1 rounded-full">
        <button 
          onClick={() => { setActiveApp('brand'); setActivePage('brand-portal'); }}
          className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeApp === 'brand' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-black'}`}
        >
          Brand Portal
        </button>
        <button 
          onClick={() => setActiveApp('driver')}
          className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeApp === 'driver' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-black'}`}
        >
          Driver App
        </button>
      </div>
      
      <div className="w-[150px] flex justify-end">
          <button className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-zinc-800">Account</button>
      </div>
    </nav>
  );
}