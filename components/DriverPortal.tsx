// component/DriverPortal.tsx
"use client";
import React, { useState } from 'react';
import { Camera, FileText, Truck, MapPin, Calendar, IndianRupee, Info, CheckCircle2, X } from 'lucide-react';

export default function DriverPortal() {
  // Prototype Flow States
  const [viewMode, setViewMode] = useState<'not-onboarded' | 'onboarded'>('not-onboarded');
  const [campaignState, setCampaignState] = useState<'pending' | 'active'>('pending');
  
  // UI Interaction States
  const [showDetails, setShowDetails] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)] pb-20">
      
      {/* 1. TOP DEMO TOGGLE (For Presentation Purposes) */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40 shadow-sm flex justify-center">
        <div className="bg-gray-100 p-1 rounded-xl flex gap-1 w-full max-w-md">
            <button 
                onClick={() => { setViewMode('not-onboarded'); setCampaignState('pending'); setShowDetails(false); }}
                className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${viewMode === 'not-onboarded' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
                Not Onboarded
            </button>
            <button 
                onClick={() => setViewMode('onboarded')}
                className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${viewMode === 'onboarded' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
                Onboarded
            </button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4 mt-4">
        
        {/* ==========================================
            STATE 1: NOT ONBOARDED (ONBOARDING FORM)
            ========================================== */}
        {viewMode === 'not-onboarded' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-4">Earn while you drive</h2>
                <p className="text-gray-600 mb-6 text-sm">Convert your commercial vehicle into a moving billboard. Legally compliant & passive income.</p>
                
                <div className="space-y-4">
                    {/* Vehicle Type Form */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Vehicle Type</label>
                        {/* FIXED: Added defaultValue="" here */}
                        <select defaultValue="" className="w-full p-2 border-b border-gray-200 focus:border-black outline-none bg-transparent font-medium">
                            {/* FIXED: Removed 'selected' from here */}
                            <option value="" disabled>Select vehicle classification...</option>
                            <option value="auto">Auto Rickshaw (3-Wheeler)</option>
                            <option value="sedan">Mini Truck (Yellow Plate)</option>
                            <option value="suv">Large Trucks (Yellow Plate)</option>
                        </select>
                    </div>

                    {/* Driving Location Form */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Default Location of Drive</label>
                        {/* FIXED: Added defaultValue="" here */}
                        <select defaultValue="" className="w-full p-2 border-b border-gray-200 focus:border-black outline-none bg-transparent font-medium">
                            {/* FIXED: Removed 'selected' from here */}
                            <option value="" disabled>Select primary routing...</option>
                            <option value="city">Strictly Within City Limits</option>
                            <option value="intercity">Across Cities (Inter-city Corridors)</option>
                            <option value="interstate">Across States (Long Haul)</option>
                        </select>
                    </div>

                    {/* RTO Upload Form */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">RTO Permit Upload</label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors group">
                            <FileText size={24} className="mx-auto mb-2 text-gray-400 group-hover:text-black transition-colors" />
                            <p className="font-medium">Tap to scan RC & Permit</p>
                            <p className="text-[10px] uppercase tracking-widest mt-1 text-gray-400">Image format only</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="button"
                        onClick={() => setViewMode('onboarded')}
                        className="w-full bg-black text-white py-4 mt-2 rounded-lg font-bold shadow-lg hover:bg-gray-800 transition-colors"
                    >
                        Submit for Verification
                    </button>
                </div>
            </div>
        )}

        {/* ==========================================
            STATE 2: ONBOARDED (PENDING OPT-IN OR ACTIVE)
            ========================================== */}
        {viewMode === 'onboarded' && (
            <div className="animate-in fade-in duration-500">
                
                {/* --- 2A: THE INCOMING CAMPAIGN POP-UP --- */}
                {campaignState === 'pending' && (
                    <div className="relative">
                        {/* Fake Map Background mimicking Uber Driver App Radar */}
                        <div className="absolute inset-0 bg-[#e5e3df] rounded-3xl overflow-hidden shadow-inner -z-10 h-[600px]">
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                            
                            {/* Radar Ping Animation */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-32 h-32 bg-blue-500/20 rounded-full animate-ping absolute -top-16 -left-16"></div>
                                <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative z-10">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Sheet Request UI */}
                        <div className="pt-[180px]">
                            <div className="bg-white rounded-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-10">
                                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
                                
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                                        <IndianRupee size={32} />
                                    </div>
                                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Incoming Campaign Request</h3>
                                    <h2 className="text-3xl font-black italic text-gray-900 leading-tight">Coca-Cola Summer</h2>
                                </div>

                                <div className="rounded-2xl overflow-hidden mb-4 border border-gray-100 shadow-sm relative">
                                    <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600" className="w-full h-32 object-cover" alt="Campaign Banner" />
                                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[9px] font-black uppercase px-2 py-1 rounded">Banner Preview</div>
                                </div>

                                {!showDetails ? (
                                    <button 
                                        type="button"
                                        onClick={() => setShowDetails(true)} 
                                        className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mb-6 border border-gray-200"
                                    >
                                        <Info size={14} /> View More Details
                                    </button>
                                ) : (
                                    <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-200 animate-in fade-in slide-in-from-top-2">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                                <div className="flex items-center gap-2 text-gray-500"><IndianRupee size={14}/> <span className="text-xs font-bold uppercase">Max Expected Earnings</span></div>
                                                <span className="text-base font-black text-green-600">₹12,500</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Duration</span>
                                                <span className="text-sm font-black text-gray-900">45 Days</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Pasting Date</span>
                                                <span className="text-sm font-bold text-gray-900">June 1, 2026</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Removal Date</span>
                                                <span className="text-sm font-bold text-gray-900">July 15, 2026</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-gray-500">Expected Locality</span>
                                                <span className="text-sm font-bold text-gray-900 text-right max-w-[150px]">Bengaluru CBD & Airport</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Uber-style Accept/Reject Actions */}
                                <div className="flex gap-3">
                                    <button 
                                        type="button"
                                        className="w-16 bg-gray-100 text-gray-500 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 font-black"
                                        onClick={() => alert('Campaign Rejected. Searching for new offers...')}
                                    >
                                        <X size={24} />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setCampaignState('active')}
                                        className="flex-1 bg-black text-white rounded-2xl font-black text-lg py-4 shadow-xl active:scale-95 transition-all"
                                    >
                                        TAP TO OPT-IN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- 2B: EXACT ACTIVE CAMPAIGN UI --- */}
                {campaignState === 'active' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-4">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-green-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Bonus Earnings</p>
                                    <h2 className="text-4xl font-black italic">₹3,420</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-600 text-[10px] font-black uppercase">Condition</p>
                                    <h2 className="text-2xl font-black text-green-600">9.8<span className="text-sm">/10</span></h2>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-xl flex items-center">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
                                <p className="text-[10px] font-bold text-blue-700 uppercase">Banner Verified: UBR-COKE-BLR-992</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                                <h3 className="font-black uppercase text-xs tracking-widest text-gray-900 italic">Campaign Terms</h3>
                                <span className="bg-black text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Active</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-y-5">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Brand Partner</p>
                                    <p className="font-bold text-sm">Coca-Cola India</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Banner ID</p>
                                    <p className="font-mono font-bold text-sm">COKE-BLR-992</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Fleet Duration</p>
                                    <p className="font-bold text-sm text-gray-900">45 Days <span className="text-[10px] text-gray-500 font-medium">(Day 14)</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Expected Payout</p>
                                    <p className="font-bold text-sm text-green-600">₹12,500 <span className="text-[10px] text-gray-500 font-medium">Est.</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Target Distance</p>
                                    <p className="font-bold text-sm">1,200 KM</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Earnings Rate</p>
                                    <p className="font-bold text-sm">₹3.50 / KM</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Paint-Safe Vinyl Warranty Active</p>
                                </div>
                                <p className="text-[10px] font-black text-blue-600 uppercase cursor-pointer hover:underline">View Contract</p>
                            </div>
                        </div>

                        <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-wider">Security Check Required</span>
                                </div>
                                <p className="text-sm opacity-90 mb-6 font-medium leading-tight">Verify ad condition to release your ₹850 weekly bonus.</p>
                                <button 
                                    type="button"
                                    onClick={() => setIsCameraOpen(true)} 
                                    className="w-full bg-white text-blue-600 font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <Camera size={20} /> OPEN CAMERA
                                </button>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
                        </div>

                        <div className="bg-black text-white p-6 rounded-3xl shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Upcoming Hub Visit</h4>
                                    <p className="text-xl font-bold">Indiranagar Hub</p>
                                    <p className="text-xs text-gray-400 mt-1">12, 80 Feet Rd, HAL 2nd Stage</p>
                                </div>
                                <div className="bg-gray-800 p-3 rounded-xl text-center min-w-[60px]">
                                    <p className="text-[10px] font-black uppercase text-gray-500">June</p>
                                    <p className="text-xl font-black">15</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button type="button" className="flex-1 bg-white text-black py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-gray-100 transition-colors">Navigate</button>
                                <button type="button" className="flex-1 border border-gray-700 hover:border-gray-500 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">Reschedule</button>
                            </div>
                        </div>

                        {/* Camera Modal */}
                        {isCameraOpen && (
                            <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center animate-in fade-in">
                                <div className="w-72 aspect-[3/4] border-4 border-dashed border-white/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                                    <p className="text-white/60 text-center px-6 text-sm font-bold uppercase italic z-10">Align Vinyl QR Code Inside Guide</p>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => {setIsCameraOpen(false); alert('Verification Received & Analyzed by AI!')}} 
                                    className="mt-12 bg-white w-20 h-20 rounded-full border-4 border-gray-300 shadow-[0_0_0_4px_rgba(255,255,255,0.2)] active:scale-90 transition-all flex items-center justify-center"
                                >
                                    <div className="w-16 h-16 rounded-full border-2 border-black"></div>
                                </button>
                                <button type="button" onClick={() => setIsCameraOpen(false)} className="absolute top-6 right-6 text-white font-bold uppercase text-xs tracking-widest">Cancel</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
}