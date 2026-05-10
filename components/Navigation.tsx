// components/Navigation.tsx
"use client";
import React from 'react';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navigation({ activePage, setActivePage }: NavigationProps) {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-xl sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <div className="bg-white text-black px-2 py-0.5 font-black text-xl">Uber</div>
        <div className="text-blue-400 font-bold tracking-tight">AD-DRIVE</div>
      </div>
      <div className="flex space-x-4 text-[10px] font-bold uppercase tracking-widest">
        <button 
          onClick={() => setActivePage('brand-portal')} 
          className={activePage === 'brand-portal' || activePage === 'create-campaign' ? 'text-blue-400' : 'opacity-60 hover:opacity-100'}
        >
          Brand
        </button>
        <button 
          onClick={() => setActivePage('driver-portal')} 
          className={activePage === 'driver-portal' ? 'text-blue-400' : 'opacity-60 hover:opacity-100'}
        >
          Driver
        </button>
      </div>
    </nav>
  );
}