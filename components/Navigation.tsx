// component/Navigation.tsx
"use client";
import React from 'react';
import { Car, Building2 } from 'lucide-react';

interface NavigationProps {
  activeApp: string;
  setActiveApp: (app: string) => void;
  setActivePage: (page: string) => void; // <-- NEW: Added this prop
}

export default function Navigation({ activeApp, setActiveApp, setActivePage }: NavigationProps) {
  return (
    <div className="bg-black text-white h-16 px-6 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* LOGO AREA */}
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => { setActiveApp('brand'); setActivePage('brand-portal'); }}
      >
        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-black text-xl italic">U</div>
        <span className="font-black text-xl tracking-tight">Uber <span className="font-medium text-gray-400">Ad-Drive</span></span>
      </div>
      
      {/* TOGGLE SWITCH */}
      <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
        <button 
          onClick={() => { 
              setActiveApp('brand'); 
              setActivePage('brand-portal'); // <-- NEW: Resets the page when clicking the tab
          }}
          className={`flex items-center gap-2 px-5 py-1.5 rounded-md text-sm font-bold transition-all ${activeApp === 'brand' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
        >
          <Building2 size={16} /> Brand Portal
        </button>
        <button 
          onClick={() => setActiveApp('driver')}
          className={`flex items-center gap-2 px-5 py-1.5 rounded-md text-sm font-bold transition-all ${activeApp === 'driver' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
        >
          <Car size={16} /> Driver App
        </button>
      </div>
      
      {/* EMPTY DIV TO BALANCE FLEXBOX */}
      <div className="w-[150px]"></div>
    </div>
  );
}