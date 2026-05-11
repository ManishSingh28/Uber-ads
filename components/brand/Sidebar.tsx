// components/brand/Sidebar.tsx
"use client";
import React from 'react';
import { Home, LayoutGrid, Library, Truck, FileText, UserCircle, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar({ activeBrandSection, setActiveBrandSection }: any) {
  const menuItems = [
    { name: 'Overview', icon: Home },
    { name: 'Campaign Manager', icon: LayoutGrid },
    { name: 'Creative Library', icon: Library },
    { name: 'Logistics & Hubs', icon: Truck },
    { name: 'Reports', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-zinc-100 flex flex-col sticky top-16 h-[calc(100vh-64px)] z-10">
      <nav className="flex-1 px-4 py-8 space-y-1">
        {menuItems.map((item) => (
          <button 
            key={item.name}
            onClick={() => setActiveBrandSection(item.name)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition-all ${
                activeBrandSection === item.name 
                ? 'bg-black text-white font-bold shadow-sm' 
                : 'text-zinc-500 font-medium hover:bg-zinc-50 hover:text-black'
            }`}
          >
            <item.icon size={18} /> {item.name}
          </button>
        ))}
      </nav>
      
      {/* RESTORED: Bottom Utility Section */}
      <div className="p-4 border-t border-zinc-100 text-zinc-400 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold hover:bg-zinc-50 hover:text-black transition-colors">
            <UserCircle size={16} /> Account Details
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold hover:bg-zinc-50 hover:text-black transition-colors">
            <Settings size={16} /> Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold hover:bg-zinc-50 hover:text-black transition-colors">
            <HelpCircle size={16} /> Help & Support
          </button>
      </div>
    </aside>
  );
}