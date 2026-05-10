"use client";
import React from 'react';
import { Home, LayoutGrid, FileText, UserCircle, Library, Truck, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar({ activeBrandSection, setActiveBrandSection }: any) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-[64px] h-[calc(100vh-64px)] z-10">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {[
          { name: 'Overview', icon: <Home size={18}/> },
          { name: 'Campaign Manager', icon: <LayoutGrid size={18}/> },
          { name: 'Creative Library', icon: <Library size={18}/> },
          { name: 'Logistics & Hubs', icon: <Truck size={18}/> },
          { name: 'Reports', icon: <FileText size={18}/> },
        ].map((item) => (
          <button 
            key={item.name}
            onClick={() => setActiveBrandSection(item.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeBrandSection === item.name ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100 text-gray-400 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors"><UserCircle size={16} /> Account Details</button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors"><Settings size={16} /> Settings</button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors"><HelpCircle size={16} /> Help & Support</button>
      </div>
    </aside>
  );
}