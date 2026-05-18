"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { MapPin, Zap, Star, TrendingUp, RefreshCw } from 'lucide-react';

Chart.register(...registerables);

const fmt = (n: number) =>
  n >= 10000000 ? `${(n / 10000000).toFixed(1)}Cr`
  : n >= 100000 ? `${(n / 100000).toFixed(1)}L`
  : n >= 1000 ? `${(n / 1000).toFixed(1)}K`
  : `${n}`;

const fmtCurrency = (n: number) =>
  n >= 10000000 ? `₹${(n / 10000000).toFixed(2)}Cr`
  : n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
  : `₹${n.toLocaleString('en-IN')}`;

export default function CampaignModal({ selectedCampaign, setIsModalOpen, setActivePage }: any) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [activeChart, setActiveChart] = useState<'impressions' | 'adKms'>('impressions');

  const m = selectedCampaign?.metrics;
  const wc = selectedCampaign?.weeklyChart;
  const zb = selectedCampaign?.zoneBreakdown;

  useEffect(() => {
    if (!wc || !chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const isImpressions = activeChart === 'impressions';
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: wc.labels,
        datasets: [{
          label: isImpressions ? 'GPS-Verified Impressions' : 'Ad-KMs',
          data: isImpressions ? wc.impressions : wc.adKms,
          backgroundColor: isImpressions ? '#000000' : '#2563eb',
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => isImpressions
                ? ` ${fmt(ctx.raw as number)} impressions`
                : ` ${(ctx.raw as number).toLocaleString('en-IN')} km`
            }
          }
        },
        scales: {
          y: { border: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 }, callback: (v) => isImpressions ? fmt(v as number) : `${(v as number / 1000).toFixed(0)}K` } },
          x: { grid: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 } } }
        }
      }
    });
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [wc, activeChart]);

  // Status color
  const statusStyle = selectedCampaign.status === 'Live'
    ? 'bg-black text-white'
    : selectedCampaign.status === 'Completed'
    ? 'bg-green-100 text-green-700'
    : 'bg-amber-100 text-amber-700';

  const DraftField = ({ label, value }: { label: string; value: any }) => {
    const isEmpty = !value || value === '0' || value === 'Pending Approval' || (Array.isArray(value) && value.length === 0);
    return (
      <div className="border-b border-gray-100 pb-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        {isEmpty
          ? <span className="font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block text-[10px] uppercase border border-amber-100">Empty / Required</span>
          : <p className="font-bold text-gray-900">{Array.isArray(value) ? value.join(', ') || '—' : value}</p>
        }
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-[32px] w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-white px-8 py-5 flex justify-between items-center border-b border-zinc-100 shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-black text-xl italic uppercase tracking-tight">{selectedCampaign.title}</h3>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${statusStyle}`}>
              {selectedCampaign.status === 'Live' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse align-middle" />}
              {selectedCampaign.status}
            </span>
            {selectedCampaign.brand && (
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{selectedCampaign.brand} · {selectedCampaign.city || 'Multi-city'}</span>
            )}
          </div>
          <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors font-bold text-3xl leading-none">×</button>
        </div>

        {/* DRAFT VIEW */}
        {selectedCampaign.status === 'Draft' ? (
          <div className="flex flex-col flex-1 overflow-hidden bg-zinc-50">
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl border border-zinc-200 shadow-sm">
                <h4 className="font-black text-zinc-400 uppercase tracking-widest mb-8 border-b border-zinc-100 pb-4">Draft Configuration Status</h4>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  <DraftField label="Campaign Name" value={selectedCampaign.title} />
                  <DraftField label="Brand / Category" value={selectedCampaign.brand} />
                  <DraftField label="Cost Model" value={selectedCampaign.costModel} />
                  <DraftField label="Start & End Date" value={selectedCampaign.duration} />
                  <DraftField label="Target Zones" value={selectedCampaign.zones} />
                  <DraftField label="Fleet Commitment" value={selectedCampaign.fleetSize} />
                  <div className="col-span-2 mt-4">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Creative Asset Preview</p>
                    <img src={selectedCampaign.imageUrl} className="h-40 object-cover rounded-xl border border-zinc-200 shadow-sm opacity-70" alt="Draft Creative" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border-t border-zinc-200 p-6 flex justify-between items-center shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="bg-white border border-zinc-200 text-zinc-700 px-8 py-4 rounded-xl font-bold hover:bg-zinc-50 transition-all uppercase text-sm tracking-wide">← Back</button>
              <div className="flex gap-4">
                <button onClick={() => { alert('Draft Discarded!'); setIsModalOpen(false); }} className="bg-white border border-zinc-200 text-zinc-700 px-6 py-4 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all uppercase text-sm tracking-wide">Discard</button>
                <button onClick={() => { setActivePage('create-campaign'); setIsModalOpen(false); }} className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg uppercase text-sm tracking-wide active:scale-95">Review & Submit →</button>
              </div>
            </div>
          </div>

        ) : (
          /* LIVE / COMPLETED VIEW */
          <div className="flex flex-1 overflow-hidden">

            {/* LEFT SIDEBAR */}
            <div className="w-72 bg-zinc-50 border-r border-zinc-100 flex flex-col shrink-0 overflow-y-auto">

              {/* Creative */}
              <div className="relative">
                <img src={selectedCampaign.imageUrl} className="w-full h-44 object-cover" alt="Campaign Visual" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white font-black text-xs uppercase tracking-widest">{selectedCampaign.brand}</p>
                  <p className="text-white/70 text-[10px] font-bold">{selectedCampaign.duration}</p>
                </div>
              </div>

              {/* Campaign info */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Campaign Info</p>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Cost Model', val: selectedCampaign.costModel },
                      { label: 'Fleet Deployed', val: selectedCampaign.fleetSize },
                      { label: 'Category', val: selectedCampaign.category },
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between text-xs">
                        <span className="text-zinc-400 font-bold">{r.label}</span>
                        <span className="font-bold text-zinc-900">{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zone breakdown */}
                {zb && (
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Zone Breakdown</p>
                    <div className="space-y-2">
                      {zb.map((z: any) => {
                        const maxImpr = Math.max(...zb.map((x: any) => x.impressions));
                        const pct = Math.round((z.impressions / maxImpr) * 100);
                        return (
                          <div key={z.zone}>
                            <div className="flex justify-between items-center mb-0.5">
                              <div className="flex items-center gap-1.5">
                                <MapPin size={10} className="text-zinc-400" />
                                <span className="text-[11px] font-bold text-zinc-700">{z.zone}</span>
                                {z.tier === 'premium' && <Star size={9} className="text-amber-500" fill="currentColor" />}
                              </div>
                              <span className="text-[10px] font-black text-zinc-500">{fmt(z.impressions)}</span>
                            </div>
                            <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                              <div className="h-full bg-zinc-900 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Renewal intent */}
                {m && (
                  <div className={`rounded-xl p-3 flex items-center gap-2 ${m.renewalIntent ? 'bg-green-50 border border-green-100' : 'bg-zinc-100 border border-zinc-200'}`}>
                    <RefreshCw size={14} className={m.renewalIntent ? 'text-green-600' : 'text-zinc-400'} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Renewal Intent</p>
                      <p className={`text-xs font-black ${m.renewalIntent ? 'text-green-700' : 'text-zinc-500'}`}>
                        {m.renewalIntent ? 'High — Brand marked for Campaign 2' : 'No renewal planned'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT MAIN */}
            <div className="flex-1 overflow-y-auto bg-white">

              {m && (
                <>
                  {/* Top KPI strip */}
                  <div className="grid grid-cols-4 divide-x divide-zinc-100 border-b border-zinc-100">
                    {[
                      { label: 'GPS-Verified Impressions', value: fmt(m.totalVerifiedImpressions), sub: 'H3 hexagonal index · not estimated', icon: <Zap size={14} className="text-black" />, accent: true },
                      { label: 'Verified Ad-KMs', value: `${(m.adKmsRaw / 1000).toFixed(1)}K`, sub: `${m.fleetUtilization}% fleet utilization`, icon: null, accent: false },
                      { label: 'Effective CPM', value: `₹${m.effectiveCPM}`, sub: 'vs ₹80–120 static OOH benchmark', icon: <TrendingUp size={14} className="text-green-600" />, accent: false },
                      { label: 'Total Spend', value: fmtCurrency(m.totalSpend), sub: `${m.uniqueZoneReach} zones · Peak: ${m.peakHour}`, icon: null, accent: false },
                    ].map((k, i) => (
                      <div key={i} className={`p-5 ${k.accent ? 'bg-zinc-950' : 'bg-white'}`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          {k.icon}
                          <p className={`text-[9px] font-black uppercase tracking-widest ${k.accent ? 'text-zinc-400' : 'text-zinc-400'}`}>{k.label}</p>
                        </div>
                        <p className={`text-2xl font-black tracking-tighter ${k.accent ? 'text-white' : 'text-zinc-900'}`}>{k.value}</p>
                        <p className={`text-[9px] font-bold mt-1 ${k.accent ? 'text-zinc-500' : 'text-zinc-400'}`}>{k.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Secondary metrics row */}
                  <div className="grid grid-cols-3 divide-x divide-zinc-100 border-b border-zinc-100">
                    {[
                      { label: 'Hardware Integrity', value: `${m.hardwareIntegrity}%`, good: m.hardwareIntegrity >= 97 },
                      { label: 'Fleet Utilization', value: `${m.fleetUtilization}%`, good: m.fleetUtilization >= 85 },
                      { label: 'Peak Impression Hour', value: m.peakHour, good: true },
                    ].map((s, i) => (
                      <div key={i} className="p-4 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${s.good ? 'bg-green-500' : 'bg-amber-400'}`} />
                        <div>
                          <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{s.label}</p>
                          <p className="text-sm font-black text-zinc-900">{s.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Weekly Performance</p>
                      <div className="flex bg-zinc-100 p-1 rounded-lg">
                        {(['impressions', 'adKms'] as const).map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveChart(tab)}
                            className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeChart === tab ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-black'}`}
                          >
                            {tab === 'impressions' ? 'Impressions' : 'Ad-KMs'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-52 bg-zinc-50 rounded-2xl p-4">
                      <canvas ref={chartRef} />
                    </div>
                  </div>

                  {/* CPM comparison callout */}
                  <div className="mx-6 mb-6 bg-zinc-950 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Uber-Ads vs Static OOH</p>
                      <p className="text-white font-black text-sm">
                        You paid <span className="text-green-400">₹{m.effectiveCPM} CPM</span> vs ₹80–120 industry benchmark — saving ~{Math.round((1 - m.effectiveCPM / 100) * 100)}% per thousand impressions with full GPS verification.
                      </p>
                    </div>
                    {m.renewalIntent && (
                      <button
                        onClick={() => { setActivePage('create-campaign'); setIsModalOpen(false); }}
                        className="shrink-0 ml-6 bg-white text-black px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wide hover:bg-zinc-100 active:scale-95 transition-all"
                      >
                        Renew →
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
