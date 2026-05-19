// components/brand/CampaignManager.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Calendar, TrendingUp, RefreshCw, Zap, Users, BarChart2, CheckCircle2, Clock, Star, Send, CheckCircle } from 'lucide-react';
import { Chart, registerables } from 'chart.js';
import { campaignDatabase, performanceDataStore, brandDashboardMetrics, useInventoryStore } from '@/lib/data';

Chart.register(...registerables);

const statusConfig: Record<string, { label: string; className: string; dot?: boolean }> = {
  Live:              { label: "Live",             className: "bg-black text-white",          dot: true },
  "Ops Queue":       { label: "Ops Queue",        className: "bg-blue-600 text-white",       dot: true },
  Completed:         { label: "Completed",        className: "bg-green-100 text-green-700"              },
  Draft:             { label: "Draft",            className: "bg-amber-100 text-amber-700"              },
  "Pending Approval":{ label: "Pending Approval", className: "bg-purple-100 text-purple-700"             },
};

function CampaignNPS({ campaignId }: { campaignId: string }) {
  const [score,     setScore]     = useState<number | null>(null);
  const [feedback,  setFeedback]  = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [expanded,  setExpanded]  = useState(false);

  return (
    <div className="border-t border-zinc-50 bg-zinc-50/60">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-6 py-3 hover:bg-zinc-100 transition-colors text-left"
      >
        <Star size={13} className="text-amber-500 shrink-0" />
        <span className="text-[10px] font-bold text-zinc-500">
          {submitted ? 'NPS submitted — thanks!' : 'Rate this campaign (NPS)'}
        </span>
        <span className="ml-auto text-[10px] text-zinc-400">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && !submitted && (
        <div className="px-6 pb-5 pt-1 animate-in fade-in">
          <p className="text-[11px] font-bold text-zinc-600 mb-3">
            How likely are you to run another Uber Ads campaign?
          </p>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {Array.from({ length: 11 }, (_, i) => i).map(n => (
              <button
                key={n}
                onClick={() => setScore(n)}
                className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all border ${
                  score === n ? 'bg-black text-white border-black' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-zinc-400 font-bold mb-3">
            <span>0 = Not likely</span><span>10 = Very likely</span>
          </div>
          {score !== null && (
            <>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Optional feedback..."
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-[11px] outline-none focus:border-black transition-all resize-none h-16 mb-2"
              />
              <button
                onClick={() => setSubmitted(true)}
                className="bg-black text-white px-4 py-2 rounded-xl font-bold text-[11px] flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <Send size={11} /> Submit
              </button>
            </>
          )}
        </div>
      )}

      {expanded && submitted && (
        <div className="px-6 pb-4 pt-1 flex items-center gap-2 text-green-600 text-[11px] font-bold animate-in fade-in">
          <CheckCircle size={13} /> Your feedback has been recorded.
        </div>
      )}
    </div>
  );
}

export default function CampaignManager({ setActivePage, setSelectedCampaign, setIsModalOpen, setIsHeatmapOpen }: any) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePreset,       setDatePreset]        = useState('today');
  const [startDate,        setStartDate]         = useState('2026-05-19');
  const [endDate,          setEndDate]           = useState('2026-05-19');

  const currentData  = performanceDataStore[datePreset] || performanceDataStore['custom'];
  const mainChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance= useRef<Chart | null>(null);

  // Live active fleet count from inventory store
  const getActiveFleetCount = useInventoryStore((s) => s.getActiveFleetCount);
  const liveFleetCount = getActiveFleetCount('camp_001');

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const handlePresetClick = (preset: string) => {
    setDatePreset(preset);
    switch (preset) {
      case 'today':      setStartDate('2026-05-19'); setEndDate('2026-05-19'); break;
      case 'this-week':  setStartDate('2026-05-13'); setEndDate('2026-05-19'); break;
      case 'last-week':  setStartDate('2026-05-06'); setEndDate('2026-05-12'); break;
      case 'this-month': setStartDate('2026-05-01'); setEndDate('2026-05-31'); break;
      case 'last-month': setStartDate('2026-04-01'); setEndDate('2026-04-30'); break;
    }
  };

  useEffect(() => {
    if (!mainChartRef.current) return;
    const ctx = mainChartRef.current.getContext('2d');
    if (chartInstance.current) chartInstance.current.destroy();
    if (!ctx) return;
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: currentData.chart.labels,
        datasets: [
          { label: 'Impressions',  data: currentData.chart.views, borderColor: '#000', backgroundColor: 'rgba(0,0,0,0.04)', borderWidth: 2, tension: 0.4, fill: true, pointRadius: 0 },
          { label: 'Active Fleet', data: currentData.chart.fleet, borderColor: '#D4D4D8', borderWidth: 1, borderDash: [4, 4], tension: 0.4, yAxisID: 'y1', pointRadius: 0 },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y:  { border: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 } } },
          y1: { display: false },
          x:  { grid: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 } } },
        },
      },
    });
    return () => { chartInstance.current?.destroy(); };
  }, [currentData]);

  const kpiIcons: Record<string, React.ReactNode> = {
    totalImpressions: <Zap size={16} className="text-zinc-400" />,
    activeCampaigns:  <BarChart2 size={16} className="text-zinc-400" />,
    effectiveCPM:     <TrendingUp size={16} className="text-zinc-400" />,
    renewalRate:      <RefreshCw size={16} className="text-zinc-400" />,
    totalSpend:       <CheckCircle2 size={16} className="text-zinc-400" />,
    fleetUtilization: <Users size={16} className="text-zinc-400" />,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Coca-Cola India · Bengaluru Pilot</p>
          <h1 className="text-4xl font-bold tracking-tighter">Campaign Dashboard</h1>
        </div>
        <button
          onClick={() => setActivePage('create-campaign')}
          className="bg-black text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} /> NEW CAMPAIGN
        </button>
      </div>

      {/* Live Active Fleet indicator */}
      {liveFleetCount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 flex items-center gap-3 text-sm font-bold text-green-700 animate-in fade-in">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          <span>
            Active Fleet (Live): <span className="text-green-900">{500 + liveFleetCount} vehicles</span> enrolled across active campaigns
          </span>
          <span className="ml-auto text-[10px] text-green-500 font-black">REAL-TIME</span>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(brandDashboardMetrics).map(([key, m]) => (
          <div key={key} className="bg-white border border-zinc-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{m.label}</p>
              {kpiIcons[key]}
            </div>
            <p className="text-2xl font-bold text-zinc-900 tracking-tight mb-1">{m.value}</p>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 ${m.deltaPositive ? 'text-green-700 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {m.deltaPositive ? '↑' : '↓'} {m.delta}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium mt-1.5">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white border border-zinc-100 rounded-2xl overflow-visible">
        <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fleet Performance Velocity</p>
            <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-zinc-400">
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-black rounded" /> Impressions</span>
              <span className="flex items-center gap-1.5"><span className="inline-block w-3 border-t border-dashed border-zinc-300" /> Active Fleet</span>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-lg text-xs font-bold hover:border-black transition-all"
            >
              <Calendar size={13} /> {formatDate(startDate)} – {formatDate(endDate)}
            </button>
            {isDatePickerOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-zinc-100 z-50 py-2 animate-in fade-in slide-in-from-top-2">
                {['today','this-week','last-week','this-month','last-month'].map(p => (
                  <button
                    key={p}
                    onClick={() => { handlePresetClick(p); setIsDatePickerOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold capitalize transition-colors ${datePreset === p ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:bg-zinc-50'}`}
                  >
                    {p.replace('-', ' ')}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setIsHeatmapOpen(true)}
              className="text-xs font-bold text-zinc-500 hover:text-black underline underline-offset-4 transition-colors"
            >
              Route Intelligence
            </button>
          </div>
        </div>
        <div className="p-6 h-72"><canvas ref={mainChartRef} /></div>
      </div>

      {/* Campaign History Table */}
      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Campaign History</p>
          <span className="text-[10px] font-bold text-zinc-400">{campaignDatabase.length} campaigns</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
              <th className="px-6 py-3.5">Campaign</th>
              <th className="px-6 py-3.5">Brand</th>
              <th className="px-6 py-3.5">Duration</th>
              <th className="px-6 py-3.5">Impressions</th>
              <th className="px-6 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {campaignDatabase.map((camp) => {
              const sc         = statusConfig[camp.status] || statusConfig['Draft'];
              const isCompleted = camp.status === 'Completed';
              return (
                <React.Fragment key={camp.id}>
                  <tr
                    onClick={() => { setSelectedCampaign(camp); setIsModalOpen(true); }}
                    className="hover:bg-zinc-50 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold text-zinc-900 group-hover:underline underline-offset-2">{camp.title}</td>
                    <td className="px-6 py-4 text-zinc-500 text-xs font-medium">{camp.brand}</td>
                    <td className="px-6 py-4 text-zinc-500 text-xs font-medium">{camp.duration}</td>
                    <td className="px-6 py-4 font-bold text-zinc-900">{camp.views !== '0' ? camp.views : '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full uppercase ${sc.className}`}>
                        {sc.dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 animate-pulse" />}
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                  {/* NPS widget — only for Completed campaigns */}
                  {isCompleted && (
                    <tr key={`${camp.id}-nps`}>
                      <td colSpan={5} className="p-0">
                        <CampaignNPS campaignId={camp.id} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
