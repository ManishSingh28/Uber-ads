"use client";
import React, { useState } from 'react';
import { Camera, FileText, IndianRupee, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { VEHICLE_TYPES, ELIGIBLE_VEHICLE_TYPES, ELIGIBLE_ZONES } from '@/lib/data';

type OnboardingState = 'form' | 'ineligible' | 'waitlist-success' | 'onboarded';

export default function DriverPortal() {
  const [viewMode, setViewMode] = useState<'not-onboarded' | 'onboarded'>('not-onboarded');
  const [onboardingState, setOnboardingState] = useState<OnboardingState>('form');
  const [campaignState, setCampaignState] = useState<'pending' | 'active'>('pending');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Form state
  const [vehicleType, setVehicleType] = useState('');
  const [drivingZone, setDrivingZone] = useState('');
  const [weeklyTrips, setWeeklyTrips] = useState(0);

  // Earnings calculator — based on weekly trips input
  const estimatedMonthly = weeklyTrips > 0 ? Math.round(weeklyTrips * 4 * (vehicleType === 'Auto Rickshaw' ? 38 : vehicleType === 'Sedan Cabs' ? 52 : vehicleType === 'SUV Cab' ? 65 : 0)) : 0;

  const handleSubmit = () => {
    const isVehicleEligible = ELIGIBLE_VEHICLE_TYPES.includes(vehicleType);
    const isZoneEligible = ELIGIBLE_ZONES.includes(drivingZone);

    if (isVehicleEligible && isZoneEligible) {
      setViewMode('onboarded');
      setOnboardingState('onboarded');
    } else {
      setOnboardingState('ineligible');
    }
  };

  const handleExitCampaign = () => {
    setCampaignState('pending');
    setShowExitConfirm(false);
  };

  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-64px)] pb-24 font-sans">

      {/* Platform Toggle */}
      <div className="bg-white border-b border-zinc-100 p-4 sticky top-0 z-40 flex justify-center">
        <div className="bg-zinc-100 p-1 rounded-full flex w-full max-sm max-w-sm">
          <button
            onClick={() => { setViewMode('not-onboarded'); setOnboardingState('form'); setCampaignState('pending'); }}
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

        {/* ONBOARDING SECTION */}
        {viewMode === 'not-onboarded' && (

          <>
            {/* STATE: FORM */}
            {onboardingState === 'form' && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold mb-2 tracking-tight">Earn with Uber Ads</h2>
                <p className="text-zinc-500 mb-8 text-sm">Monetize your vehicle while you drive. Simple, compliant, and passive income.</p>

                <div className="space-y-4">
                  {/* Vehicle Category */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Vehicle Category</label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none"
                    >
                      <option value="" disabled>Select vehicle...</option>
                      {VEHICLE_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {vehicleType && !ELIGIBLE_VEHICLE_TYPES.includes(vehicleType) && (
                      <p className="text-[10px] text-amber-600 font-bold mt-2 flex items-center gap-1">
                        <AlertTriangle size={10} /> This vehicle type may not qualify for v1 — we'll check eligibility.
                      </p>
                    )}
                  </div>

                  {/* Driving Zone */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Driving Location / Range</label>
                    <select
                      value={drivingZone}
                      onChange={(e) => setDrivingZone(e.target.value)}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none"
                    >
                      <option value="" disabled>Select primary routing...</option>
                      <option value="Strictly Within City Limits">Strictly Within City Limits</option>
                      <option value="Across Cities (Inter-city Corridors)">Across Cities (Inter-city)</option>
                      <option value="Across States (Long Haul)">Across States (Long Haul)</option>
                    </select>
                  </div>

                  {/* Weekly Trips — Earnings Calculator */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Avg. Weekly Trips</label>
                    <input
                      type="number"
                      min={0}
                      placeholder="e.g. 80"
                      value={weeklyTrips || ''}
                      onChange={(e) => setWeeklyTrips(Number(e.target.value))}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none text-zinc-900"
                    />

                    {/* Live earnings estimate */}
                    {estimatedMonthly > 0 && (
                      <div className="mt-4 bg-zinc-900 text-white rounded-xl p-4 animate-in fade-in">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Your Estimated Monthly Bonus</p>
                        <p className="text-3xl font-black tracking-tighter">₹{estimatedMonthly.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">Based on {weeklyTrips} trips/week · {vehicleType || 'selected vehicle'} · no extra driving hours</p>
                      </div>
                    )}
                    {weeklyTrips > 0 && estimatedMonthly === 0 && vehicleType && (
                      <p className="text-[10px] text-zinc-400 font-bold mt-3">
                        Earnings estimate not available for this vehicle type in v1. You'll be notified when eligible.
                      </p>
                    )}
                  </div>

                  {/* Documentation */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Documentation</label>
                    <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center hover:bg-zinc-50 cursor-pointer transition-colors">
                      <FileText size={20} className="mx-auto mb-2 text-zinc-400" />
                      <p className="text-sm font-bold">Scan Permit & RC</p>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!vehicleType || !drivingZone}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Check Eligibility & Submit
                  </button>
                </div>
              </div>
            )}

            {/* STATE: INELIGIBLE — alternate path instead of dead-end */}
            {onboardingState === 'ineligible' && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white rounded-[32px] p-8 border border-zinc-200 shadow-sm text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={28} className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Not Eligible for v1</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    Your vehicle or routing doesn't qualify for the current Bangalore pilot.
                    This could be due to vehicle type or operating zone restrictions.
                  </p>
                  <div className="bg-zinc-50 rounded-2xl p-5 text-left space-y-3 mb-6">
                    <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Why you may not qualify</p>
                    {!ELIGIBLE_VEHICLE_TYPES.includes(vehicleType) && (
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                        <X size={14} className="text-red-400" />
                        {vehicleType} is not in the v1 fleet category (Auto, Sedan, SUV only)
                      </div>
                    )}
                    {!ELIGIBLE_ZONES.includes(drivingZone) && (
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                        <X size={14} className="text-red-400" />
                        Inter-city / long-haul routes not supported in v1 (city-only zones)
                      </div>
                    )}
                  </div>
                </div>

                {/* Waitlist CTA */}
                <div className="bg-zinc-900 text-white rounded-[32px] p-8 text-center">
                  <Clock size={28} className="mx-auto mb-3 text-zinc-400" />
                  <h3 className="text-xl font-bold mb-2">Join the Waitlist</h3>
                  <p className="text-zinc-400 text-sm mb-6">
                    We're expanding to more vehicle types and zones in v2. We'll notify you the moment you qualify.
                  </p>
                  <button
                    onClick={() => setOnboardingState('waitlist-success')}
                    className="w-full bg-white text-black py-4 rounded-xl font-bold text-base active:scale-95 transition-all"
                  >
                    Notify Me When I'm Eligible
                  </button>
                  <button
                    onClick={() => setOnboardingState('form')}
                    className="mt-3 text-zinc-500 text-sm font-bold underline underline-offset-4 hover:text-white transition-colors"
                  >
                    ← Edit my details
                  </button>
                </div>
              </div>
            )}

            {/* STATE: WAITLIST CONFIRMED */}
            {onboardingState === 'waitlist-success' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 text-center pt-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-3">You're on the list.</h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                  We'll send you a push notification and SMS the moment your vehicle type or zone becomes eligible. No action needed.
                </p>
                <div className="bg-zinc-100 rounded-2xl p-5 text-left max-w-sm mx-auto">
                  <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-3">What happens next</p>
                  {['Uber-Ads v2 eligibility expands (Q3 2026)', 'You receive a personalised income projection', 'One-tap enrolment from your driver app'].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 mb-2 last:mb-0">
                      <div className="w-5 h-5 rounded-full bg-zinc-300 text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                      <p className="text-xs font-bold text-zinc-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ACTIVE ADS SECTION */}
        {viewMode === 'onboarded' && (
          <div className="animate-in fade-in duration-500">
            {campaignState === 'pending' ? (
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
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 font-medium">Minimum Commitment</span>
                    <span className="font-bold">30 Days</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[11px] font-bold text-amber-700">
                    ⚠ Early exit before 30 days incurs a ₹500 penalty deducted from earnings.
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500"><X size={24} /></button>
                  <button onClick={() => setCampaignState('active')} className="flex-1 bg-black text-white rounded-xl font-bold text-lg py-4 active:scale-95 transition-all">Accept Offer</button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                {/* Earnings & Condition Score */}
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

                {/* Live Verification */}
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

                {/* Active Campaign Card */}
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
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setShowExitConfirm(true)}
                        className="text-red-500 hover:text-red-700 hover:underline underline-offset-4 transition-colors"
                      >
                        Exit Campaign
                      </button>
                      <button className="text-blue-600 hover:underline underline-offset-4">Request Removal Help</button>
                    </div>
                  </div>
                </div>

                {/* Exit confirmation modal */}
                {showExitConfirm && (
                  <div className="fixed inset-0 bg-black/60 z-[100] flex items-end justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in slide-in-from-bottom-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={24} className="text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">Exit this campaign?</h3>
                      <p className="text-zinc-500 text-sm text-center leading-relaxed mb-6">
                        Exiting before the 30-day minimum commitment period will result in a <strong className="text-zinc-900">₹500 early exit penalty</strong> deducted from your current earnings.
                      </p>
                      <div className="bg-zinc-50 rounded-xl p-4 mb-6 text-sm font-bold">
                        <div className="flex justify-between mb-2">
                          <span className="text-zinc-500">Earned so far</span>
                          <span className="text-zinc-900">₹3,420</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-zinc-500">Early exit penalty</span>
                          <span className="text-red-600">− ₹500</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-zinc-200">
                          <span className="text-zinc-900">You'll receive</span>
                          <span className="text-zinc-900 font-black">₹2,920</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowExitConfirm(false)}
                          className="flex-1 bg-zinc-100 text-zinc-900 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all"
                        >
                          Stay in Campaign
                        </button>
                        <button
                          onClick={handleExitCampaign}
                          className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95"
                        >
                          Confirm Exit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
