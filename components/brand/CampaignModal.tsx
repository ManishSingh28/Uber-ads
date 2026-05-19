"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { MapPin, Zap, Star, TrendingUp, RefreshCw, X, CheckCircle, Clock, Settings } from 'lucide-react';

Chart.register(...registerables);

const fmt = (n: number) =>
  n >= 10000000 ? `${(n / 10000000).toFixed(1)}Cr`
  : n >= 100000 ? `${(n / 100000).toFixed(1)}L`
  : n >= 1000   ? `${(n / 1000).toFixed(1)}K`
  : `${n}`;

const fmtCurrency = (n: number) =>
  n >= 10000000 ? `₹${(n / 10000000).toFixed(2)}Cr`
  : n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
  : `₹${n.toLocaleString('en-IN')}`;

export default function CampaignModal({ selectedCampaign, setIsModalOpen, setActivePage }: any) {
  const chartRef      = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [activeChart, setActiveChart] = useState<'impressions' | 'adKms'>('impressions');
  const [renewalSubmitted, setRenewalSubmitted] = useState(false);

  const m  = selectedCampaign?.metrics;
  const wc = selectedCampaign?.weeklyChart;
  const zb = selectedCampaign?.zoneBreakdown;

  useEffect(() => {
    if (!wc || !chartRef.current) return;
    chartInstance.current?.destroy();
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    const isImpressions = activeChart === 'impressions';
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: wc.labels,
        datasets: [{
          label: isImpressions ? 'GPS-Verified Impressions' : 'Ad-KMs',
          data:  isImpressions ? wc.impressions : wc.adKms,
          backgroundColor: isImpressions ? '#000000' : '#2563eb',
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
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
          y: { border: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 }, callback: (v) => isImpressions ? fmt(v as number) : `${((v as number)/1000).toFixed(0)}K` } },
          x: { grid: { display: false }, ticks: { color: '#A1A1AA', font: { size: 10 } } }
        }
      }
    });
    return () => { chartInstance.current?.destroy(); };
  }, [wc, activeChart]);

  const statusStyle =
    selectedCampaign.status === 'Live'       ? 'bg-black text-white'          :
    selectedCampaign.status === 'Ops Queue'  ? 'bg-blue-600 text-white'       :
    selectedCampaign.status === 'Completed'  ? 'bg-green-100 text-green-700'  :
    selectedCampaign.status === 'Pending Approval' ? 'bg-purple-100 text-purple-700' :
    'bg-amber-100 text-amber-700';

  // ── Draft / missing fields view ──
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

  // ── Ops Queue view ──
  const OpsQueueView = () => (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      <div className="flex items-start gap-6">
        <img
          src={selectedCampaign.imageUrl}
          className="w-28 h-28 object-cover rounded-2xl border border-zinc-100 shrink-0"
          alt={selectedCampaign.title}
        />
        <div>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{selectedCampaign.brand} · {selectedCampaign.city}</p>
          <p className="text-sm font-medium text-zinc-500 mb-1">{selectedCampaign.duration}</p>
          <p className="text-sm text-zinc-500">{selectedCampaign.fleetSize} · {selectedCampaign.zones?.join(', ')}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">What does Ops Queue mean?</p>
        <p className="text-sm text-blue-800 font-medium leading-relaxed">
          Your campaign has been approved and handed off to the Uber-Ads operations team. The fleet is being assigned and vinyl wrap installation is underway. 
          You'll receive a push notification when the campaign goes live.
        </p>
      </div>

      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Operations Progress</p>
        <div className="space-y-3">
          {selectedCampaign.opsStages?.map((stage: any, i: number) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              stage.done    ? 'bg-green-50 border-green-100'    :
              stage.current ? 'bg-blue-50 border-blue-200 shadow-sm' :
              'bg-zinc-50 border-zinc-100 opacity-60'
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black ${
                stage.done    ? 'bg-green-600 text-white'     :
                stage.current ? 'bg-blue-600 text-white'      :
                'bg-zinc-200 text-zinc-500'
              }`}>
                {stage.done ? '✓' : i + 1}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-bold ${stage.done ? 'text-green-800' : stage.current ? 'text-blue-900' : 'text-zinc-500'}`}>
                  {stage.label}
                </p>
                {stage.current && stage.eta && (
                  <p className="text-[10px] font-bold text-blue-600 mt-0.5">ETA: {stage.eta}</p>
                )}
              </div>
              {stage.current && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Renewal CTA for retaining brands with completed campaigns ──
  const RenewalCTA = () => (
    <div className="mx-8 mb-8 bg-zinc-900 text-white rounded-2xl p-6">
      {renewalSubmitted ? (
        <div className="text-center">
          <CheckCircle size={28} className="text-green-400 mx-auto mb-2" />
          <p className="font-bold text-sm">Renewal Request Sent!</p>
          <p className="text-zinc-400 text-xs mt-1">Our team will contact you within 2 business days.</p>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Campaign Complete</p>
              <p className="font-bold text-base">Ready to renew?</p>
            </div>
            <RefreshCw size={20} className="text-zinc-400 shrink-0 mt-1" />
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed mb-4">
            Brands that renewed saw a <span className="text-white font-bold">+23% impression uplift</span> in Campaign 2 due to zone learning. 
            Lock in your zones before another brand takes them.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setIsModalOpen(false); setActivePage('create-campaign'); }}
              className="flex-1 bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-all active:scale-95"
            >
              Start New Campaign
            </button>
            <button
              onClick={() => setRenewalSubmitted(true)}
              className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-all border border-zinc-700"
            >
              Request Callback
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-[32px] w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">

        {/* ── Header ── */}
        <div className="bg-white px-8 py-5 flex justify-between items-center border-b border-zinc-100 shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-black text-xl italic uppercase tracking-tight">{selectedCampaign.title}</h3>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1.5 ${statusStyle}`}>
              {(selectedCampaign.status === 'Live' || selectedCampaign.status === 'Ops Queue') &&
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              {selectedCampaign.status}
            </span>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* ── Body ── */}

        {/* Ops Queue */}
        {selectedCampaign.status === 'Ops Queue' && <OpsQueueView />}

        {/* Draft */}
        {selectedCampaign.status === 'Draft' && (
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1">Draft — Missing Information</p>
              <p className="text-sm text-amber-800 font-medium">This campaign was saved as draft because one or more required fields are missing. Complete and resubmit for approval.</p>
            </div>
            <div className="space-y-4">
              <DraftField label="Campaign Name"   value={selectedCampaign.title} />
              <DraftField label="Brand"           value={selectedCampaign.brand} />
              <DraftField label="Duration"        value={selectedCampaign.duration} />
              <DraftField label="Target Zones"    value={selectedCampaign.zones} />
              <DraftField label="Creative Artwork" value={null} />
            </div>
            <button
              onClick={() => { setIsModalOpen(false); setActivePage('create-campaign'); }}
              className="w-full bg-black text-white py-4 rounded-xl font-bold"
            >
              Complete Campaign Setup
            </button>
          </div>
        )}

        {/* Pending Approval */}
        {selectedCampaign.status === 'Pending Approval' && (
          <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock size={28} className="text-purple-600" />
            </div>
            <h4 className="text-xl font-bold">Under Review</h4>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Your campaign has been submitted and is being reviewed by the Uber-Ads team. 
              Approval typically takes 1–2 business days. You'll be notified once it moves to Ops Queue.
            </p>
            <div className="bg-zinc-50 rounded-2xl p-5 text-left w-full max-w-sm">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Review Checklist</p>
              {['Brand safety review', 'Artwork resolution & format check', 'Zone exclusivity verification', 'Budget & billing confirmation'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rounded-full bg-zinc-200 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
                  </div>
                  <p className="text-xs font-medium text-zinc-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live / Completed — full detail view */}
        {(selectedCampaign.status === 'Live' || selectedCampaign.status === 'Completed') && m && (
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

                  {/* Renewal CTA — completed campaigns only */}
                  {selectedCampaign.status === 'Completed' && <RenewalCTA />}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}