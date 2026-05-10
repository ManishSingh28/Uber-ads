"use client";
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function CampaignModal({ selectedCampaign, setIsModalOpen, setActivePage }: any) {
  const modalChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart | null = null;
    if (selectedCampaign?.status !== 'Draft' && modalChartRef.current) {
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
  }, [selectedCampaign]);

  const DraftField = ({ label, value }: { label: string, value: any }) => {
      const isEmpty = !value || value === "0" || value === "Pending Approval" || value.length === 0;
      return (
          <div className="border-b border-gray-100 pb-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
              {isEmpty ? (
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block text-[10px] uppercase border border-amber-100">Empty / Required</span>
              ) : (
                  <p className="font-bold text-gray-900">{value}</p>
              )}
          </div>
      );
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-[32px] w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-white p-6 flex justify-between items-center border-b">
              <div className="flex items-center gap-3">
                  <h3 className="font-black text-2xl italic uppercase">{selectedCampaign.title}</h3>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${selectedCampaign.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{selectedCampaign.status}</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors font-bold text-3xl">×</button>
          </div>
          
          {selectedCampaign.status === 'Draft' ? (
              <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
                  <div className="flex-1 p-8 overflow-y-auto">
                      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl border border-gray-200 shadow-sm">
                          <h4 className="font-black text-gray-400 uppercase tracking-widest mb-8 border-b pb-4">Draft Configuration Status</h4>
                          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                              <DraftField label="Campaign Name" value={selectedCampaign.title} />
                              <DraftField label="Brand / Category" value={selectedCampaign.brand} />
                              <DraftField label="Cost Model" value={selectedCampaign.costModel} />
                              <DraftField label="Start & End Date" value={selectedCampaign.duration} />
                              <DraftField label="Target Hubs & Corridors" value={selectedCampaign.cities} />
                              <DraftField label="Fleet Commitment" value={selectedCampaign.fleetSize} />
                              <div className="col-span-2 mt-4">
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Creative Asset Preview</p>
                                  <img src={selectedCampaign.imageUrl} className="h-40 object-cover rounded-xl border border-gray-200 shadow-sm opacity-70" alt="Draft Creative" />
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="bg-white border-t border-gray-200 p-6 flex justify-between items-center">
                      <button onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:text-black transition-all uppercase text-sm tracking-wide shadow-sm">← Back</button>
                      <div className="flex gap-4">
                          <button onClick={() => { alert('Draft Discarded!'); setIsModalOpen(false); }} className="bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all uppercase text-sm tracking-wide shadow-sm">Discard Campaign</button>
                          <button onClick={() => { setActivePage('create-campaign'); setIsModalOpen(false); }} className="bg-blue-600 border border-blue-600 text-white px-10 py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 uppercase text-sm tracking-wide active:scale-95">Review & Submit →</button>
                      </div>
                  </div>
              </div>
          ) : (
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
          )}
      </div>
    </div>
  );
}