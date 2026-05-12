// components/DriverPortal.tsx
"use client";
import React, { useState } from 'react';
import { Camera, FileText, IndianRupee, Info, X, ChevronRight } from 'lucide-react';
import { VEHICLE_TYPES } from '@/lib/data';

export default function DriverPortal() {
  const [viewMode, setViewMode] = useState<'not-onboarded' | 'onboarded'>('not-onboarded');
  const [campaignState, setCampaignState] = useState<'pending' | 'active'>('pending');
  const [showDetails, setShowDetails] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-64px)] pb-24 font-sans">
      
      {/* Platform Toggle */}
      <div className="bg-white border-b border-zinc-100 p-4 sticky top-0 z-40 flex justify-center">
        <div className="bg-zinc-100 p-1 rounded-full flex w-full max-sm max-w-sm">
            <button 
                onClick={() => { setViewMode('not-onboarded'); setCampaignState('pending'); }}
                className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${viewMode === 'not-onboarded' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
            >
                Onboarding
            </button>
            <button 
                onClick={() => setViewMode('onboarded')}
                className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${viewMode === 'onboarded' ? 'bg-white text-black shadow-sm' : 'text-zinc-500'}`}
            >
                Active Ads
            </button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        
        {/* STATE 1: ONBOARDING */}
        {viewMode === 'not-onboarded' && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold mb-2 tracking-tight">Earn with Uber Ads</h2>
                <p className="text-zinc-500 mb-8 text-sm">Monetize your vehicle while you drive. Simple, compliant, and passive income.</p>
                
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Vehicle Category</label>
                        <select defaultValue="" className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none">
                            <option value="" disabled>Select vehicle...</option>
                            {VEHICLE_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Driving Location / Range</label>
                        <select defaultValue="" className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none">
                            <option value="" disabled>Select primary routing...</option>
                            <option value="city">Strictly Within City Limits</option>
                            <option value="intercity">Across Cities (Inter-city Corridors)</option>
                            <option value="interstate">Across States (Long Haul)</option>
                        </select>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Documentation</label>
                        <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center hover:bg-zinc-50 cursor-pointer transition-colors">
                            <FileText size={20} className="mx-auto mb-2 text-zinc-400" />
                            <p className="text-sm font-bold">Scan Permit & RC</p>
                        </div>
                    </div>

                    <button onClick={() => setViewMode('onboarded')} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg">
                        Submit for Approval
                    </button>
                </div>
            </div>
        )}

        {/* STATE 2: ONBOARDED SECTION */}
        {viewMode === 'onboarded' && (
            <div className="animate-in fade-in duration-500">
                {campaignState === 'pending' ? (
                    /* NEW CAMPAIGN POP-UP */
                    <div className="bg-white rounded-[32px] p-6 shadow-xl border border-zinc-100 overflow-hidden">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                <IndianRupee size={28} />
                            </div>
                            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">New Ad Campaign</h3>
                            <h2 className="text-3xl font-bold italic">Coca-Cola Summer</h2>
                        </div>

                        <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600" className="w-full h-40 object-cover rounded-2xl mb-6 shadow-sm" alt="Banner Preview" />

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 font-medium">Estimated Payout</span>
                                <span className="font-bold text-lg">₹12,500</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-500 font-medium">Duration</span>
                                <span className="font-bold">45 Days</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500"><X size={24} /></button>
                            <button onClick={() => setCampaignState('active')} className="flex-1 bg-black text-white rounded-xl font-bold text-lg py-4 active:scale-95 transition-all">Accept Offer</button>
                        </div>
                    </div>
                ) : (
                    /* RESTORED: ACTIVE CAMPAIGN UI */
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                        {/* Header: Earnings & Condition Score */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border-b-4 border-green-500 border border-zinc-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">This Month's Bonus</p>
                                    <h2 className="text-4xl font-bold tracking-tighter italic text-zinc-900">₹3,420</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest mb-1">Condition Score</p>
                                    <h2 className="text-2xl font-bold text-green-600">9.8<span className="text-sm font-medium">/10</span></h2>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-[11px] text-green-700 bg-green-50 p-3 rounded-xl font-bold">
                                <span className="text-lg">★</span> 
                                You earned a 2% Commission Discount for "Excellent Banner Care"
                            </div>
                        </div>

                        {/* Live Verification Action (Blue Mix) */}
                        <div className="bg-blue-600 text-white p-6 rounded-[2rem] shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Live Ad-Check Required</span>
                                </div>
                                <p className="text-sm opacity-90 mb-6 font-medium leading-tight max-w-[200px]">
                                    Verification expires in 2 hours. Ensure Number Plate is visible.
                                </p>
                                <button 
                                    type="button"
                                    onClick={() => setIsCameraOpen(true)} 
                                    className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    OPEN LIVE CAMERA
                                </button>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
                        </div>

                        {/* Active Campaign Detail Card */}
                        <div className="uber-card bg-white border border-zinc-200">
                            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-[8px] uppercase tracking-tighter">Uber</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-zinc-900">Official Brand Partner</p>
                                        <p className="text-[10px] text-zinc-400 font-medium uppercase">Paint-Safe Adhesive Guaranteed</p>
                                    </div>
                                </div>
                                <span className="bg-zinc-100 text-zinc-500 text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest">Removable</span>
                            </div>
                            
                            <div className="h-40 relative group">
                                <img 
                                    src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600" 
                                    className="w-full h-full object-cover" 
                                    alt="Active Campaign" 
                                />
                                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest">Uber</div>
                            </div>

                            <div className="p-5 bg-zinc-50 flex justify-between items-center text-[11px] font-bold">
                                <span className="text-zinc-400 italic">"Campaign ends in 12 days"</span>
                                <button className="text-blue-600 hover:underline underline-offset-4">Request Removal Help</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Camera Fullscreen Overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-6 animate-in fade-in">
            <div className="w-full max-w-sm aspect-[3/4] border-2 border-dashed border-white/30 rounded-[3rem] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
                <p className="text-white text-xs font-bold uppercase tracking-[0.2em] text-center z-10 px-10">Scan Vinyl QR Code on Rear Window</p>
            </div>
            <button onClick={() => setIsCameraOpen(false)} className="mt-12 w-20 h-20 rounded-full border-4 border-white/20 p-1"><div className="w-full h-full bg-white rounded-full"></div></button>
            <button onClick={() => setIsCameraOpen(false)} className="absolute top-8 right-8 text-white font-bold text-sm">Cancel</button>
        </div>
      )}
    </div>
  );
}