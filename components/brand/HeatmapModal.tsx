"use client";
import React from 'react';

export default function HeatmapModal({ setIsHeatmapOpen }: any) {
  return (
    <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in">
        <div className="bg-slate-900 w-full max-w-6xl h-[80vh] rounded-[32px] flex flex-col overflow-hidden border border-slate-700 shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center text-white">
                <h3 className="font-black italic uppercase tracking-wider text-xl">Live Route Intelligence</h3>
                <button onClick={() => setIsHeatmapOpen(false)} className="text-3xl font-bold text-gray-500 hover:text-white transition-colors">×</button>
            </div>
            <div className="flex-1 relative bg-slate-950 overflow-hidden flex items-center justify-center">
                <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen opacity-20 blur-[100px] animate-pulse"></div>
                <div className="absolute w-[300px] h-[300px] bg-red-500 rounded-full mix-blend-screen opacity-30 blur-[80px] translate-x-20 -translate-y-20"></div>
                <div className="absolute inset-0 border-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="z-10 text-center">
                    <p className="text-white font-black text-sm uppercase tracking-[0.3em] opacity-50 mb-2">Dynamic Heatmap Overlay</p>
                    <p className="text-blue-400 font-bold text-xs uppercase tracking-widest">Active Zone: Bengaluru</p>
                </div>
            </div>
        </div>
    </div>
  );
}