// component/brand/CampaignManager.tsx
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
  
  // Track current active data based on selection from lib/data.ts
  const currentData = performanceDataStore[datePreset] || performanceDataStore['custom'];

  const mainChartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance = useRef<Chart | null>(null);

  const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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
      
      if (chartInstance.current) {
          chartInstance.current.destroy();
      }

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: currentData.chart.labels,
            datasets: [
              { label: 'Verified Impressions', data: currentData.chart.views, borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderWidth: 3, tension: 0.4, fill: true },
              { label: 'Active Vehicles', data: currentData.chart.fleet, borderColor: '#16a34a', borderWidth: 2, borderDash: [5, 5], tension: 0.4, yAxisID: 'y1' }
            ]
          },
          options: { 
              responsive: true, 
              maintainAspectRatio: false, 
              scales: { 
                  y: { position: 'left', ticks: { callback: (value) => { return (Number(value) / 1000000 >= 1) ? (Number(value) / 1000000).toFixed(1) + 'M' : value; } } }, 
                  y1: { position: 'right', grid: { drawOnChartArea: false } } 
              } 
          }
        });
      }
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [currentData]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-500 font-bold">Coca-Cola India • Managed Fleet: 1,240 Vehicles</p>
        </div>
        <button onClick={() => setActivePage('create-campaign')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:shadow-blue-200 transition-all active:scale-95">
          <Plus size={20} /> NEW CAMPAIGN
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm overflow-visible">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50 rounded-t-[32px]">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-gray-600">Real-Time Fleet Performance</h3>
            </div>
            
            <div className="flex items-center gap-4 relative">
                <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:border-black transition-colors shadow-sm">
                    <Filter size={14} className="text-gray-400"/>
                    Filters
                </button>

                <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:border-black transition-colors shadow-sm">
                    <Calendar size={14} className="text-gray-400"/>
                    {formatDate(startDate)} - {formatDate(endDate)}
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`}/>
                </button>

                {isDatePickerOpen && (
                    <div className="absolute top-full right-[180px] mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="w-36 bg-gray-50 p-2 flex flex-col gap-1 border-r border-gray-100">
                            {[
                                { id: 'today', label: 'Today' }, { id: 'this-week', label: 'This Week' },
                                { id: 'last-week', label: 'Last Week' }, { id: 'this-month', label: 'This Month' },
                                { id: 'last-month', label: 'Last Month' }, { id: 'custom', label: 'Custom Range' }
                            ].map(preset => (
                                <button key={preset.id} onClick={() => handlePresetClick(preset.id)} className={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${datePreset === preset.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Start Date</label>
                                    <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value); setDatePreset('custom');}} className="w-full p-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 outline-none focus:border-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">End Date</label>
                                    <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value); setDatePreset('custom');}} className="w-full p-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                                <button onClick={() => setIsDatePickerOpen(false)} className="bg-black text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors">Apply Range</button>
                            </div>
                        </div>
                    </div>
                )}
                <button onClick={() => setIsHeatmapOpen(true)} className="text-[10px] font-black text-blue-600 hover:underline tracking-tighter uppercase border border-blue-100 px-3 py-2 rounded-xl bg-white shadow-sm flex items-center gap-1">📍 Intelligence Heatmap</button>
            </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x border-b border-gray-100 transition-all">
            <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Avg. Active Fleet</p><p className="text-3xl font-black">{currentData.metrics.active} <span className="text-xs font-medium text-gray-400">/ 1.2k</span></p></div>
            <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Verified Ad-KMs</p><p className="text-3xl font-black">{currentData.metrics.adKms}</p></div>
            <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Est. Impressions</p><p className="text-3xl font-black text-blue-600">{currentData.metrics.impressions}</p></div>
            <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Fraud Integrity</p><p className="text-3xl font-black text-green-600">{currentData.metrics.fraud}</p></div>
        </div>
        
        <div className="p-8 h-80 bg-white"><canvas ref={mainChartRef}></canvas></div>
      </div>

      <div className="space-y-4 relative z-0">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Campaign History</h3>
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-10">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-gray-400 uppercase text-[10px] font-black tracking-widest">
                        <th className="p-6">Campaign</th><th className="p-6">Duration</th><th className="p-6">Fleet</th><th className="p-6">Performance</th><th className="p-6">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {campaignDatabase.map((camp) => (
                        <tr key={camp.id} onClick={() => {setSelectedCampaign(camp); setIsModalOpen(true)}} className="hover:bg-blue-50/50 cursor-pointer transition-colors group">
                            <td className="p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm border border-gray-200">
                                  <img src={camp.imageUrl} className="w-full h-full object-cover transition-all" alt="Campaign Visual" />
                                </div>
                                <span className="font-bold group-hover:text-blue-600">{camp.title}</span>
                            </td>
                            <td className="p-6 text-gray-500 font-medium">{camp.duration}</td>
                            <td className="p-6 font-bold">{camp.fleetSize}</td>
                            <td className="p-6">
                              <div className="flex flex-col">
                                <span className="font-black text-gray-800">{camp.views} Views</span>
                                <span className="text-[10px] text-gray-400 uppercase">{camp.adKms} {camp.status === 'Draft' ? 'Pending' : 'KM Verified'}</span>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase ${camp.status === 'Live' ? 'bg-green-100 text-green-700' : camp.status === 'Draft' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-500'}`}>
                                  {camp.status}
                              </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}