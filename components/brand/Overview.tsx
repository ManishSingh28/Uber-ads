"use client";
import React from 'react';
import { Home } from 'lucide-react';

export default function Overview({ setActiveBrandSection }: any) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
       <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-white border border-gray-200 rounded-3xl p-10">
          <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Home size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-wider text-gray-800">Brand Overview</h2>
          <p className="text-gray-500 max-w-md mt-4 text-sm leading-relaxed">
            Welcome to your command center. Select <strong className="text-gray-900">Campaign Manager</strong> from the sidebar to view live fleet performance, historical data, or to deploy new vinyl creatives to the road.
          </p>
          <button 
              onClick={() => setActiveBrandSection('Campaign Manager')}
              className="mt-8 bg-black text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-gray-800 transition-colors"
          >
              Go to Campaign Manager
          </button>
       </div>
    </div>
  );
}