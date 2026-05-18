// components/brand/CampaignManager.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Calendar, ChevronDown, Filter } from 'lucide-react';
import { Chart, registerables } from 'chart.js';
import { campaignDatabase, performanceDataStore } from '@/lib/data';

Chart.register(...registerables);

export default function CampaignManager({ setActivePage, setSelectedCampaign, setIsModalOpen, setIsHeatmapOpen }: any) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePreset, setDatePreset] = useState('today');
  const [startDate, setStartDate] = useState('2026-05-10');
  const [endDate, setEndDate] = useState('2026-05-10');
  
  const currentData = performanceDataStore[datePreset] || performanceDataStore['custom'];
  const mainChartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance = useRef<Chart | null>(null);

  const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // RESTORED: Full Date Preset Logic
  const handlePresetClick = (preset: string) => {
      setDatePreset(preset);
      switch(preset) {
          case 'today': setStartDate('2026-05-10'); setEndDate('2026-05-10'); break;
          case 'this-week': setStartDate('2026-05-04'); setEndDate('2026-05-10'); break;
          case 'last-week': setStartDate('2026-04-27'); setEndDate('2026-05-03'); break;
          case 'this-month': setStartDate('2026-05-01'); setEndDate('2026-05-31'); break;
          case 'last-month': setStartDate('2026-04-01'); setEndDate('2026-04-30'); break;
          case 'custom': break; 
      }
  };

  useEffect(() => {
    if (mainChartRef.current) {
      const ctx = mainChartRef.current.getContext('2d');
      if (chartInstance.current) chartInstance.current.destroy();
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: currentData.chart.labels,
            datasets: [
              { label: 'Impressions', data: currentData.chart.views, borderColor: '#000', backgroundColor: 'rgba(0,0,0,0.03)', borderWidth: 2, tension: 0.3, fill: true, pointRadius: 0 },
              { label: 'Active Fleet', data: currentData.chart.fleet, borderColor: '#D4D4D8', borderWidth: 1, borderDash: [4, 4], tension: 0.3, yAxisID: 'y1', pointRadius: 0 }
            ]
          },
          options: { 
              responsive: true, maintainAspectRatio: false, 
              plugins: { legend: { display: false } },
              scales: { 
                  y: { border: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 } } },
                  y1: { display: false },
                  x: { grid: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 } } }
              } 
          }
        });
      }
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [currentData]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-1">Campaigns</h1>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Coca-Cola India • 1,240 Vehicles</p>
        </div>
        
        <div className="flex gap-4">            
            <button 
                onClick={() => setActivePage('create-campaign')} 
                className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-xl hover:bg-zinc-800 transition-all active:scale-95 text-sm">
                <Plus size={20} /> NEW CAMPAIGN
            </button>
        </div>
    </div>

      {/* Metrics & Performance remain visually updated but fully functional */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="uber-card p-6"><p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Active Fleet</p><p className="text-3xl font-bold">{currentData.metrics.active}</p></div>
          <div className="uber-card p-6"><p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Verified Ad-KMs</p><p className="text-3xl font-bold">{currentData.metrics.adKms}</p></div>
          <div className="uber-card p-6">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase">H3-Verified Impressions</p>
              <span className="text-[8px] font-black bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase">GPS ✓</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900">{currentData.metrics.impressions}</p>
            <p className="text-[9px] text-zinc-400 font-bold mt-1">Hexagonal spatial index · Not estimated</p>
          </div>
          <div className="uber-card p-6"><p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Integrity</p><p className="text-3xl font-bold text-zinc-900">{currentData.metrics.fraud}</p></div>
      </div>

      <div className="uber-card relative overflow-visible">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/30">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fleet performance velocity</span>
            <div className="flex items-center gap-3 relative">
                <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-lg text-xs font-bold hover:border-black transition-all">
                    <Calendar size={14}/> {formatDate(startDate)} - {formatDate(endDate)}
                </button>
                
                {/* RESTORED: Date Picker Dropdown Logic */}
                {isDatePickerOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-zinc-100 z-50 py-2 animate-in fade-in slide-in-from-top-2">
                        {['today', 'this-week', 'last-week', 'this-month', 'last-month'].map(preset => (
                            <button key={preset} onClick={() => { handlePresetClick(preset); setIsDatePickerOpen(false); }} className={`w-full text-left px-4 py-2 text-xs font-bold capitalize ${datePreset === preset ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:bg-zinc-50'}`}>
                                {preset.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                )}
                <button onClick={() => setIsHeatmapOpen(true)} className="text-xs font-bold text-zinc-900 underline underline-offset-4 hover:text-zinc-500">Route Intelligence</button>
            </div>
        </div>
        <div className="p-8 h-80"><canvas ref={mainChartRef}></canvas></div>
    </div>

    <div className="uber-card overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
                  <tr className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                      <th className="p-5">Campaign</th><th className="p-5">Duration</th><th className="p-5">Performance</th><th className="p-5">Status</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                  {campaignDatabase.map((camp) => (
                      <tr key={camp.id} onClick={() => {setSelectedCampaign(camp); setIsModalOpen(true)}} className="hover:bg-zinc-50 cursor-pointer transition-colors group">
                          <td className="p-5 font-bold group-hover:underline">{camp.title}</td>
                          <td className="p-5 text-zinc-500 font-medium">{camp.duration}</td>
                          <td className="p-5 font-bold">{camp.views}</td>
                          <td className="p-5">
                              <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase border ${camp.status === 'Live' ? 'bg-black text-white border-black' : 'bg-zinc-100 text-zinc-500 border-zinc-200'}`}>
                                  {camp.status}
                              </span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
}