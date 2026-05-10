// components/BrandPortal.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Home, LayoutGrid, FileText, UserCircle, Library, Truck, Settings, HelpCircle, Plus } from 'lucide-react';
import { Chart, registerables } from 'chart.js';
import { campaignDatabase } from '../lib/data';

Chart.register(...registerables);

interface BrandPortalProps {
  setActivePage: (page: string) => void;
}

export default function BrandPortal({ setActivePage }: BrandPortalProps) {
  const [activeBrandSection, setActiveBrandSection] = useState('Overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  
  const mainChartRef = useRef<HTMLCanvasElement>(null);
  const modalChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart | null = null;
    if (activeBrandSection === 'Campaign Manager' && mainChartRef.current) {
      const ctx = mainChartRef.current.getContext('2d');
      if (ctx) {
        chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
            datasets: [
              { label: 'Verified Impressions', data: [12000, 45000, 38000, 41000, 58000, 32000, 8000], borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderWidth: 3, tension: 0.4, fill: true },
              { label: 'Active Vehicles', data: [150, 480, 420, 440, 500, 380, 120], borderColor: '#16a34a', borderWidth: 2, borderDash: [5, 5], tension: 0.4, yAxisID: 'y1' }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false, scales: { y: { position: 'left' }, y1: { position: 'right', grid: { drawOnChartArea: false } } } }
        });
      }
    }
    return () => { if (chartInstance) chartInstance.destroy(); };
  }, [activeBrandSection]);

  useEffect(() => {
    let chartInstance: Chart | null = null;
    if (isModalOpen && modalChartRef.current) {
      const ctx = modalChartRef.current.getContext('2d');
      if (ctx) {
        chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{ label: 'Ad-KMs', data: [3200, 3800, 4100, 3900, 4500, 5100, 4800], backgroundColor: '#2563eb', borderRadius: 4 }]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }
    }
    return () => { if (chartInstance) chartInstance.destroy(); };
  }, [isModalOpen]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-[64px] h-[calc(100vh-64px)]">
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

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            {activeBrandSection === 'Overview' && (
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
            )}

            {activeBrandSection === 'Campaign Manager' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-black uppercase italic text-gray-900">Campaign Manager</h2>
                    <p className="text-sm text-gray-500 font-bold mt-1">Coca-Cola India • Managed Fleet: 1,240 Vehicles</p>
                  </div>
                  <button 
                    onClick={() => setActivePage('create-campaign')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
                  >
                    <Plus size={20} /> NEW CAMPAIGN
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm overflow-hidden">
                  <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                      <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <h3 className="font-bold text-xs uppercase tracking-widest text-gray-600">Real-Time Fleet Performance</h3>
                      </div>
                      <button onClick={() => setIsHeatmapOpen(true)} className="text-[10px] font-black text-blue-600 hover:underline tracking-tighter uppercase border border-blue-100 px-3 py-1.5 rounded-full bg-white shadow-sm">📍 View Intelligence Heatmap</button>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 divide-x border-b border-gray-100">
                      <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Active Fleet</p><p className="text-3xl font-black">942 <span className="text-xs font-medium text-gray-400">/ 1.2k</span></p></div>
                      <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Verified Ad-KMs</p><p className="text-3xl font-black">142.5k</p></div>
                      <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Impressions</p><p className="text-3xl font-black text-blue-600">8.4M</p></div>
                      <div className="p-8"><p className="text-[10px] font-black text-gray-400 uppercase mb-2">Fraud Integrity Score</p><p className="text-3xl font-black text-green-600">98.2%</p></div>
                  </div>
                  <div className="p-8 h-80 bg-white"><canvas ref={mainChartRef}></canvas></div>
                </div>

                <div className="space-y-4">
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
                                      <td className="p-6">
                                        <div className="flex items-center gap-4">
                                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
                                            <img src={camp.imageUrl} className="w-full h-full object-cover transition-all" alt="Campaign Visual" />
                                          </div>
                                          <span className="font-bold group-hover:text-blue-600">{camp.title}</span>
                                        </div>
                                      </td>
                                      <td className="p-6 text-gray-500 font-medium">{camp.duration}</td>
                                      <td className="p-6 font-bold">{camp.fleetSize}</td>
                                      <td className="p-6">
                                        <div className="flex flex-col">
                                          <span className="font-black text-gray-800">{camp.views} Views</span>
                                          <span className="text-[10px] text-gray-400 uppercase">{camp.adKms} KM Verified</span>
                                        </div>
                                      </td>
                                      <td className="p-6">
                                          <span className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase ${camp.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
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
            )}
        </div>
      </main>

      {/* MODALS */}
      {isModalOpen && selectedCampaign && (
          <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-[32px] w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                <div className="bg-white p-6 flex justify-between items-center border-b">
                    <h3 className="font-black text-2xl italic uppercase">{selectedCampaign.title}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors font-bold text-3xl">×</button>
                </div>
                <div className="flex flex-1 overflow-hidden bg-gray-50">
                    <div className="w-1/3 bg-white p-6 border-r overflow-y-auto">
                        <img src={selectedCampaign.imageUrl} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-sm" alt="Campaign Visual" />
                        <ul className="space-y-4 text-sm font-bold">
                            <li className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-400 uppercase text-[10px] tracking-widest">Target Fleet</span><span>{selectedCampaign.fleetSize}</span></li>
                            <li className="flex justify-between border-b border-gray-100 pb-3"><span className="text-gray-400 uppercase text-[10px] tracking-widest">Verified Ad-KMs</span><span>{selectedCampaign.adKms}</span></li>
                            <li className="flex justify-between pb-3"><span className="text-gray-400 uppercase text-[10px] tracking-widest">Hardware Integrity</span><span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">97.4%</span></li>
                        </ul>
                    </div>
                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Verified Views</p><p className="text-5xl font-black text-blue-600 tracking-tighter">{selectedCampaign.views}</p></div>
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Effective CPM</p><p className="text-5xl font-black text-gray-900 tracking-tighter">₹42.50</p></div>
                        </div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Ad-KM Weekly Velocity</h4>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-64"><canvas ref={modalChartRef}></canvas></div>
                    </div>
                </div>
            </div>
          </div>
      )}

      {isHeatmapOpen && (
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
      )}
    </div>
  );
}