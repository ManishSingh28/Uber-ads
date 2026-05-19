// components/DriverPortal.tsx
"use client";
import React, { useState, useRef } from 'react';
import {
  Camera, FileText, IndianRupee, X, AlertTriangle, CheckCircle, Clock,
  Star, ChevronDown, ChevronUp, Send, Bell, Shield, Layers, Upload,
} from 'lucide-react';
import {
  VEHICLE_TYPES, VEHICLE_MODELS, ELIGIBLE_VEHICLE_TYPES, ELIGIBLE_ZONES,
  BANGALORE_ZONES, driverEarningsData, getBannerConditionScore, useInventoryStore,
} from '@/lib/data';

type OnboardingState = 'form' | 'ineligible' | 'waitlist-success' | 'onboarded';
type OnboardingStep  = 1 | 2 | 3 | 4;

const TESTIMONIALS = [
  { name: "Ravi K.",    city: "Koramangala", vehicle: "Sedan", earnings: "₹3,850/mo", quote: "Started earning extra without changing my route. The wrap team came to my home pin — zero inconvenience." },
  { name: "Suresh M.", city: "Whitefield",   vehicle: "Auto",  earnings: "₹2,940/mo", quote: "First month payout was credited on the 5th. No delays. Best passive income I've found on the platform." },
  { name: "Kavitha R.",city: "HSR Layout",   vehicle: "SUV",   earnings: "₹4,120/mo", quote: "I was skeptical at first. Three campaigns later, it's become my favourite part of driving with Uber." },
];

const STEP_LABELS: Record<OnboardingStep, string> = {
  1: "Eligibility Check",
  2: "Document Verification",
  3: "Inspection Scheduled",
  4: "Installation Complete",
};

const INSPECTION_SLOTS = [
  'Mon May 20 · 10:00 AM (Home visit)',
  'Mon May 20 · 2:00 PM (Home visit)',
  'Tue May 21 · 11:00 AM (Home visit)',
  'Tue May 21 · 4:00 PM (Service centre — Koramangala)',
  'Wed May 22 · 9:00 AM (Home visit)',
];

export default function DriverPortal() {
  const [viewMode,        setViewMode]        = useState<'not-onboarded' | 'onboarded'>('not-onboarded');
  const [onboardingState, setOnboardingState] = useState<OnboardingState>('form');
  const [onboardingStep,  setOnboardingStep]  = useState<OnboardingStep>(1);
  const [campaignState,   setCampaignState]   = useState<'pending' | 'active'>('pending');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isCameraOpen,    setIsCameraOpen]    = useState(false);
  const [earningsTab,     setEarningsTab]     = useState<'breakdown' | 'history'>('breakdown');
  const [showNPS,         setShowNPS]         = useState(false);
  const [npsScore,        setNpsScore]        = useState<number | null>(null);
  const [npsFeedback,     setNpsFeedback]     = useState('');
  const [npsSubmitted,    setNpsSubmitted]    = useState(false);
  const [inspectionBooked,setInspectionBooked]= useState(false);
  const [selectedSlot,    setSelectedSlot]    = useState('');
  const [showNudge,       setShowNudge]       = useState(true);
  const [rcUploaded,      setRcUploaded]      = useState(false);
  const [permitUploaded,  setPermitUploaded]  = useState(false);

  // Extended form state
  const [vehicleType,     setVehicleType]     = useState('');
  const [vehicleModel,    setVehicleModel]    = useState('');
  const [vehicleYear,     setVehicleYear]     = useState('');
  const [rcNumber,        setRcNumber]        = useState('');
  const [licenseNumber,   setLicenseNumber]   = useState('');
  const [uberDriverId,    setUberDriverId]    = useState('UBD-BLR-98421'); // pre-filled mock
  const [selectedZones,   setSelectedZones]   = useState<string[]>([]);
  const [drivingZone,     setDrivingZone]     = useState('');
  const [weeklyTrips,     setWeeklyTrips]     = useState(0);
  const [dpdpConsent,     setDpdpConsent]     = useState(false);

  const rcInputRef     = useRef<HTMLInputElement>(null);
  const permitInputRef = useRef<HTMLInputElement>(null);

  const acceptCampaign = useInventoryStore((s) => s.acceptCampaign);

  const availableModels = vehicleType ? (VEHICLE_MODELS[vehicleType] || []) : [];

  const estimatedMonthly = weeklyTrips > 0
    ? Math.round(weeklyTrips * 4 * (vehicleType === 'Auto Rickshaw' ? 38 : vehicleType === 'Sedan Cabs' ? 52 : vehicleType === 'SUV Cab' ? 65 : 0))
    : 0;

  const toggleZone = (zone: string) => {
    setSelectedZones(prev =>
      prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone],
    );
  };

  const isStep1FormValid = vehicleType && drivingZone && rcNumber.length >= 6 && licenseNumber.length >= 6 && dpdpConsent;

  const handleSubmit = () => {
    const isVehicleEligible = ELIGIBLE_VEHICLE_TYPES.includes(vehicleType);
    const isZoneEligible    = ELIGIBLE_ZONES.includes(drivingZone);
    if (isVehicleEligible && isZoneEligible) {
      // Step 1 done — advance stepper to doc verification
      setOnboardingStep(2);
    } else {
      setOnboardingState('ineligible');
    }
  };

  const handleDocVerificationDone = () => {
    if (rcUploaded && permitUploaded) setOnboardingStep(3);
  };

  const handleInspectionBook = () => {
    setInspectionBooked(true);
    setOnboardingStep(3);
  };

  const handleCompleteOnboarding = () => {
    setViewMode('onboarded');
    setOnboardingState('onboarded');
  };

  const handleAcceptCampaign = () => {
    acceptCampaign('current-driver', 'camp_001');
    setCampaignState('active');
  };

  const handleExitCampaign = () => { setCampaignState('pending'); setShowExitConfirm(false); };
  const handleNPSSubmit    = () => { if (npsScore !== null) setNpsSubmitted(true); };

  const data           = driverEarningsData;
  const conditionScore = getBannerConditionScore();

  const CURRENT_YEAR = 2026;
  const YEARS = Array.from({ length: 20 }, (_, i) => String(CURRENT_YEAR - i));

  // ─── ONBOARDING STEPPER ────────────────────────────────────────────────────
  const renderStepper = (activeStep: OnboardingStep) => (
    <div className="flex items-center mb-8 relative">
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-zinc-100 z-0" />
      {([1, 2, 3, 4] as OnboardingStep[]).map((step) => {
        const done    = activeStep > step;
        const current = activeStep === step;
        const locked  = activeStep < step;
        return (
          <div key={step} className="flex-1 flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
              done    ? 'bg-green-600 border-green-600 text-white' :
              current ? 'bg-black border-black text-white' :
                        'bg-white border-zinc-200 text-zinc-400'
            }`}>
              {done ? <CheckCircle size={14} /> : step}
            </div>
            <p className={`text-[9px] font-bold mt-1.5 text-center leading-tight max-w-[60px] ${
              current ? 'text-black' : done ? 'text-green-600' : 'text-zinc-400'
            }`}>
              {STEP_LABELS[step]}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-zinc-50 min-h-[calc(100vh-64px)] pb-24 font-sans">

      {/* Toggle */}
      <div className="bg-white border-b border-zinc-100 p-4 sticky top-0 z-40 flex justify-center">
        <div className="bg-zinc-100 p-1 rounded-full flex w-full max-w-sm">
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

        {/* ══ NOT ONBOARDED ══ */}
        {viewMode === 'not-onboarded' && (
          <>
            {/* ── App-Open Earnings Nudge Banner ── */}
            {onboardingState === 'form' && showNudge && (
              <div className="relative bg-gradient-to-br from-black to-zinc-800 text-white rounded-2xl p-5 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => setShowNudge(false)}
                  className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Bell size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Earnings Opportunity</p>
                    <p className="font-bold text-base leading-snug mb-1">
                      You could earn <span className="text-green-400">₹3,200/month</span> extra with Uber Ads
                    </p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Based on your average of 18 trips/day in Koramangala — no extra hours needed.
                    </p>
                    <button
                      onClick={() => setShowNudge(false)}
                      className="mt-3 bg-white text-black text-xs font-black px-4 py-2 rounded-lg active:scale-95 transition-all"
                    >
                      See How It Works →
                    </button>
                  </div>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full" />
              </div>
            )}

            {/* ── FORM (Step 1) ── */}
            {onboardingState === 'form' && onboardingStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold mb-1 tracking-tight">Earn with Uber Ads</h2>
                <p className="text-zinc-500 mb-6 text-sm">Monetize your vehicle while you drive. Simple, compliant, passive income.</p>

                {renderStepper(1)}

                {/* Testimonials */}
                <div className="space-y-3 mb-8">
                  {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="bg-white border border-zinc-100 rounded-2xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{t.name} · {t.city}</p>
                          <p className="text-[10px] text-zinc-400 font-medium">{t.vehicle}</p>
                        </div>
                        <span className="text-sm font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">{t.earnings}</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed italic">"{t.quote}"</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">

                  {/* Vehicle Category */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Vehicle Category *</label>
                    <select
                      value={vehicleType}
                      onChange={(e) => { setVehicleType(e.target.value); setVehicleModel(''); }}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none"
                    >
                      <option value="" disabled>Select vehicle...</option>
                      {VEHICLE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    {vehicleType && !ELIGIBLE_VEHICLE_TYPES.includes(vehicleType) && (
                      <p className="text-[10px] text-amber-600 font-bold mt-2 flex items-center gap-1">
                        <AlertTriangle size={10} /> This vehicle type may not qualify for v1 — we'll check eligibility.
                      </p>
                    )}
                  </div>

                  {/* Vehicle Model */}
                  {vehicleType && availableModels.length > 0 && (
                    <div className="bg-white p-5 rounded-2xl border border-zinc-200 animate-in fade-in">
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Vehicle Model *</label>
                      <select
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none"
                      >
                        <option value="" disabled>Select model...</option>
                        {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Vehicle Year */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Year of Manufacture *</label>
                    <select
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none"
                    >
                      <option value="" disabled>Select year...</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>

                  {/* RC Number */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Vehicle Registration (RC Number) *</label>
                    <input
                      type="text"
                      placeholder="e.g. KA01AB1234"
                      value={rcNumber}
                      onChange={(e) => setRcNumber(e.target.value.toUpperCase())}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none text-zinc-900 uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal"
                    />
                  </div>

                  {/* Driver License */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Driver License Number *</label>
                    <input
                      type="text"
                      placeholder="e.g. KA0120220001234"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none text-zinc-900 uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal"
                    />
                  </div>

                  {/* Uber Driver ID (pre-filled) */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Uber Driver ID</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={uberDriverId}
                        readOnly
                        className="w-full py-2 border-b border-zinc-100 font-bold bg-transparent outline-none text-zinc-900"
                      />
                      <span className="text-[9px] font-black text-green-700 bg-green-50 px-2 py-1 rounded-lg shrink-0">Pre-filled</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-medium mt-1">Auto-populated from your Uber driver profile.</p>
                  </div>

                  {/* Operating Zones */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Primary Operating Zones</label>
                    <p className="text-[10px] text-zinc-400 font-medium mb-3">Select all zones you regularly drive in.</p>
                    <div className="flex flex-wrap gap-2">
                      {BANGALORE_ZONES.map(zone => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => toggleZone(zone)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                            selectedZones.includes(zone)
                              ? 'bg-black text-white border-black'
                              : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-400'
                          }`}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Driving Zone */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Driving Range *</label>
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

                  {/* Weekly Trips */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Avg. Weekly Trips</label>
                    <input
                      type="number" min={0} placeholder="e.g. 80"
                      value={weeklyTrips || ''}
                      onChange={(e) => setWeeklyTrips(Number(e.target.value))}
                      className="w-full py-2 border-b border-zinc-200 font-bold bg-transparent outline-none text-zinc-900"
                    />
                    {estimatedMonthly > 0 && (
                      <div className="mt-4 bg-zinc-900 text-white rounded-xl p-4 animate-in fade-in">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Your Estimated Monthly Bonus</p>
                        <p className="text-3xl font-black tracking-tighter">₹{estimatedMonthly.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">Based on {weeklyTrips} trips/week · {vehicleType} · no extra driving hours</p>
                      </div>
                    )}
                    {weeklyTrips > 0 && estimatedMonthly === 0 && vehicleType && (
                      <p className="text-[10px] text-zinc-400 font-bold mt-3">Earnings estimate not available for this vehicle type in v1. You'll be notified when eligible.</p>
                    )}
                  </div>

                  {/* DPDP Consent */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div
                        onClick={() => setDpdpConsent(!dpdpConsent)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${dpdpConsent ? 'bg-black border-black' : 'border-zinc-300'}`}
                      >
                        {dpdpConsent && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900 leading-snug">
                          I consent to Uber collecting and processing my vehicle and location data for advertising purposes under the Digital Personal Data Protection (DPDP) Act, 2023. *
                        </p>
                        <p className="text-[10px] text-zinc-400 font-medium mt-1">
                          Your data is used solely for campaign assignment and earnings calculation. See Uber's Privacy Policy.
                        </p>
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!isStep1FormValid}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                  >
                    Check Eligibility & Continue
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Document Verification ── */}
            {onboardingState === 'form' && onboardingStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-bold mb-1 tracking-tight">Document Verification</h2>
                <p className="text-zinc-500 mb-6 text-sm">Upload your RC and permit to proceed.</p>

                {renderStepper(2)}

                <div className="space-y-4">
                  {/* RC Upload */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Vehicle Registration (RC)</label>
                    <input ref={rcInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={() => setRcUploaded(true)} />
                    {rcUploaded ? (
                      <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl p-3 text-xs font-bold">
                        <CheckCircle size={14} /> RC uploaded successfully
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => rcInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-zinc-200 rounded-xl p-6 text-center hover:bg-zinc-50 cursor-pointer transition-colors"
                      >
                        <Upload size={18} className="mx-auto mb-2 text-zinc-400" />
                        <p className="text-sm font-bold text-zinc-700">Upload RC Document</p>
                        <p className="text-[10px] text-zinc-400 mt-1">PDF or image, max 5 MB</p>
                      </button>
                    )}
                  </div>

                  {/* Permit Upload */}
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Vehicle Permit</label>
                    <input ref={permitInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={() => setPermitUploaded(true)} />
                    {permitUploaded ? (
                      <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl p-3 text-xs font-bold">
                        <CheckCircle size={14} /> Permit uploaded successfully
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => permitInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-zinc-200 rounded-xl p-6 text-center hover:bg-zinc-50 cursor-pointer transition-colors"
                      >
                        <FileText size={18} className="mx-auto mb-2 text-zinc-400" />
                        <p className="text-sm font-bold text-zinc-700">Upload Permit</p>
                        <p className="text-[10px] text-zinc-400 mt-1">PDF or image, max 5 MB</p>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleDocVerificationDone}
                    disabled={!rcUploaded || !permitUploaded}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                  >
                    Continue to Inspection →
                  </button>
                  <button onClick={() => setOnboardingStep(1)} className="w-full text-zinc-500 text-sm font-bold py-2 hover:text-black transition-colors">
                    ← Back
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Inspection Scheduling ── */}
            {onboardingState === 'form' && onboardingStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-2xl font-bold mb-1 tracking-tight">Schedule Inspection</h2>
                <p className="text-zinc-500 mb-6 text-sm">A mobile van comes to your location. Pick a slot.</p>

                {renderStepper(3)}

                <div className="bg-white p-5 rounded-2xl border border-zinc-200">
                  <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">Available Slots</label>
                  <p className="text-[10px] text-zinc-400 font-medium mb-4">Home visit slots available near your registered zone.</p>
                  {!inspectionBooked ? (
                    <div className="space-y-2">
                      {INSPECTION_SLOTS.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all ${selectedSlot === slot ? 'border-black bg-zinc-50' : 'border-zinc-100 hover:border-zinc-300'}`}
                        >
                          {slot}
                        </button>
                      ))}
                      {selectedSlot && (
                        <button
                          onClick={handleInspectionBook}
                          className="w-full bg-zinc-900 text-white py-3 rounded-xl font-bold text-sm mt-2 active:scale-95 transition-all"
                        >
                          Confirm Slot
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-100 rounded-xl p-3 text-xs font-bold">
                      <CheckCircle size={14} /> Inspection booked · {selectedSlot}
                    </div>
                  )}
                </div>

                {inspectionBooked && (
                  <button
                    onClick={handleCompleteOnboarding}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg mt-4 active:scale-95 transition-all"
                  >
                    View Dashboard →
                  </button>
                )}
              </div>
            )}

            {/* ── INELIGIBLE ── */}
            {onboardingState === 'ineligible' && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white rounded-[32px] p-8 border border-zinc-200 shadow-sm text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={28} className="text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Not Eligible for v1</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    Your vehicle or routing doesn't qualify for the current Bangalore pilot.
                  </p>
                  <div className="bg-zinc-50 rounded-2xl p-5 text-left space-y-3 mb-6">
                    <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Why you may not qualify</p>
                    {!ELIGIBLE_VEHICLE_TYPES.includes(vehicleType) && (
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                        <X size={14} className="text-red-400" />
                        {vehicleType} is not in v1 fleet category (Auto, Sedan, SUV only)
                      </div>
                    )}
                    {!ELIGIBLE_ZONES.includes(drivingZone) && (
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                        <X size={14} className="text-red-400" />
                        Inter-city / long-haul routes not supported in v1
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-zinc-900 text-white rounded-[32px] p-8 text-center">
                  <Clock size={28} className="mx-auto mb-3 text-zinc-400" />
                  <h3 className="text-xl font-bold mb-2">Join the Waitlist</h3>
                  <p className="text-zinc-400 text-sm mb-6">We're expanding to more types and zones in v2. We'll notify you when you qualify.</p>
                  <button onClick={() => setOnboardingState('waitlist-success')} className="w-full bg-white text-black py-4 rounded-xl font-bold text-base active:scale-95 transition-all">
                    Notify Me When I'm Eligible
                  </button>
                  <button onClick={() => { setOnboardingState('form'); setOnboardingStep(1); }} className="mt-3 text-zinc-500 text-sm font-bold underline underline-offset-4 hover:text-white transition-colors">
                    ← Edit my details
                  </button>
                </div>
              </div>
            )}

            {/* ── WAITLIST CONFIRMED ── */}
            {onboardingState === 'waitlist-success' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 text-center pt-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={36} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-3">You're on the list.</h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                  We'll send a push notification and SMS the moment your zone becomes eligible. No action needed.
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

        {/* ══ ACTIVE ADS ══ */}
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
                  <div className="flex justify-between items-center text-sm"><span className="text-zinc-500 font-medium">Estimated Payout</span><span className="font-bold text-lg">₹12,500</span></div>
                  <div className="flex justify-between items-center text-sm"><span className="text-zinc-500 font-medium">Duration</span><span className="font-bold">45 Days</span></div>
                  <div className="flex justify-between items-center text-sm"><span className="text-zinc-500 font-medium">Minimum Commitment</span><span className="font-bold">30 Days</span></div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[11px] font-bold text-amber-700">
                    ⚠ Early exit before 30 days incurs a ₹500 penalty deducted from earnings.
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="w-14 h-14 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500"><X size={24} /></button>
                  <button onClick={handleAcceptCampaign} className="flex-1 bg-black text-white rounded-xl font-bold text-lg py-4 active:scale-95 transition-all">Accept Offer</button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">

                {/* ── Earnings Dashboard ── */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-100 overflow-hidden">
                  <div className="p-6 border-b border-zinc-100">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Earnings This Month</p>
                      <span className="text-green-600 text-[10px] font-black bg-green-50 px-2 py-0.5 rounded-full">↑ vs last month</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter italic text-zinc-900">
                      ₹{data.currentMonth.total.toLocaleString('en-IN')}
                    </h2>
                    <div className="flex gap-4 mt-3 text-[10px] font-bold">
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-lg">₹{data.currentMonth.paid.toLocaleString('en-IN')} paid</span>
                      <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">₹{data.currentMonth.pending.toLocaleString('en-IN')} pending</span>
                    </div>
                  </div>

                  <div className="flex border-b border-zinc-100">
                    {(['breakdown', 'history'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setEarningsTab(tab)}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${earningsTab === tab ? 'text-black border-b-2 border-black' : 'text-zinc-400'}`}
                      >
                        {tab === 'breakdown' ? 'Per Campaign' : 'Payout History'}
                      </button>
                    ))}
                  </div>

                  {earningsTab === 'breakdown' && (
                    <div className="p-5 space-y-4">
                      {data.currentMonth.campaigns.map((c, i) => (
                        <div key={i} className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm font-bold text-zinc-900">{c.name}</p>
                              <p className="text-[10px] text-zinc-400 font-medium">{c.brand} · {c.period}</p>
                            </div>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${c.status === 'Active' ? 'bg-black text-white' : 'bg-green-100 text-green-700'}`}>
                              {c.status}
                            </span>
                          </div>
                          <div className="flex gap-4 text-xs font-bold">
                            <span className="text-green-700">₹{c.earned.toLocaleString('en-IN')} earned</span>
                            <span className="text-zinc-400">{c.adKms} Ad-KMs</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {earningsTab === 'history' && (
                    <div className="p-5 space-y-3">
                      {data.payoutHistory.map((p, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0">
                          <div>
                            <p className="text-sm font-bold text-zinc-900">{p.month}</p>
                            <p className="text-[10px] text-zinc-400 font-medium">Paid {p.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-zinc-900">₹{p.amount.toLocaleString('en-IN')}</p>
                            <span className="text-[9px] font-black text-green-700 bg-green-50 px-2 py-0.5 rounded-full uppercase">{p.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Banner Condition Score ── */}
                <div className="bg-white p-5 rounded-[2rem] border border-zinc-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Banner Condition Score</p>
                      <p className="text-[9px] text-zinc-400 font-medium">As per last image uploaded · {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg bg-zinc-50 ${conditionScore.color}`}>
                      {conditionScore.label}
                    </span>
                  </div>

                  <div className="flex items-end gap-3 mb-3">
                    <p className={`text-4xl font-black tracking-tighter ${conditionScore.color}`}>
                      {conditionScore.score}
                    </p>
                    <p className="text-sm font-medium text-zinc-400 mb-1">/10</p>
                  </div>

                  {/* Score bar */}
                  <div className="w-full h-2 bg-zinc-100 rounded-full mb-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        conditionScore.score >= 9 ? 'bg-green-500' :
                        conditionScore.score >= 7.5 ? 'bg-lime-500' :
                        conditionScore.score >= 6 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(conditionScore.score / 10) * 100}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-zinc-500 font-medium leading-snug mb-3">{conditionScore.detail}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Bonus</p>
                      <p className="text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded-lg inline-block">
                        {conditionScore.score >= 9 ? '2% Commission Discount' :
                         conditionScore.score >= 7.5 ? '1% Commission Discount' : 'No bonus — improve score'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      className="text-[10px] font-bold text-blue-600 hover:underline underline-offset-4 flex items-center gap-1"
                    >
                      <Camera size={12} /> Update Image
                    </button>
                  </div>
                </div>

                {/* ── Live Verification ── */}
                <div className="bg-blue-600 text-white p-6 rounded-[2rem] shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Live Ad-Check Required</span>
                    </div>
                    <p className="text-sm opacity-90 mb-6 font-medium leading-tight max-w-[200px]">
                      Verification expires in 2 hours. Ensure number plate is visible.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCameraOpen(true)}
                      className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      OPEN LIVE CAMERA
                    </button>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
                </div>

                {/* ── Active Campaign Card ── */}
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
                  </div>
                  <div className="p-5 bg-zinc-50 flex justify-between items-center text-[11px] font-bold">
                    <span className="text-zinc-400 italic">"Campaign ends in 12 days"</span>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setShowExitConfirm(true)} className="text-red-500 hover:text-red-700 hover:underline underline-offset-4 transition-colors">Exit Campaign</button>
                      <button className="text-blue-600 hover:underline underline-offset-4">Request Removal Help</button>
                    </div>
                  </div>
                </div>

                {/* ── NPS Capture ── */}
                <div className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden">
                  <button
                    onClick={() => setShowNPS(!showNPS)}
                    className="w-full flex items-center justify-between p-5 hover:bg-zinc-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Star size={18} className="text-amber-500" />
                      <div className="text-left">
                        <p className="text-sm font-bold text-zinc-900">Rate your Uber Ads experience</p>
                        <p className="text-[10px] text-zinc-400 font-medium">Helps us improve driver satisfaction</p>
                      </div>
                    </div>
                    {showNPS ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                  </button>

                  {showNPS && (
                    <div className="px-5 pb-5 border-t border-zinc-100 pt-5">
                      {npsSubmitted ? (
                        <div className="text-center py-4">
                          <CheckCircle size={28} className="text-green-600 mx-auto mb-2" />
                          <p className="font-bold text-sm text-zinc-900">Thanks for your feedback!</p>
                          <p className="text-[10px] text-zinc-400 font-medium mt-1">Your response helps us keep driver NPS healthy.</p>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-bold text-zinc-600 mb-3">How likely are you to recommend Uber Ads to another driver?</p>
                          <div className="flex gap-2 mb-4 flex-wrap">
                            {Array.from({ length: 11 }, (_, i) => i).map(n => (
                              <button
                                key={n}
                                onClick={() => setNpsScore(n)}
                                className={`w-9 h-9 rounded-lg text-xs font-black transition-all border ${
                                  npsScore === n ? 'bg-black text-white border-black' : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-400'
                                }`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                          <div className="flex justify-between text-[9px] text-zinc-400 font-bold mb-4">
                            <span>0 = Not at all</span><span>10 = Definitely</span>
                          </div>
                          {npsScore !== null && (
                            <>
                              <textarea
                                value={npsFeedback}
                                onChange={(e) => setNpsFeedback(e.target.value)}
                                placeholder="Optional: anything we should improve?"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-medium outline-none focus:border-black transition-all resize-none h-20 mb-3"
                              />
                              <button
                                onClick={handleNPSSubmit}
                                className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
                              >
                                <Send size={14} /> Submit Feedback
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Exit confirm modal ── */}
                {showExitConfirm && (
                  <div className="fixed inset-0 bg-black/60 z-[100] flex items-end justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl animate-in slide-in-from-bottom-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={24} className="text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">Exit this campaign?</h3>
                      <p className="text-zinc-500 text-sm text-center leading-relaxed mb-6">
                        Exiting before the 30-day minimum incurs a <strong className="text-zinc-900">₹500 early exit penalty</strong>.
                      </p>
                      <div className="bg-zinc-50 rounded-xl p-4 mb-6 text-sm font-bold">
                        <div className="flex justify-between mb-2"><span className="text-zinc-500">Earned so far</span><span className="text-zinc-900">₹3,420</span></div>
                        <div className="flex justify-between mb-2"><span className="text-zinc-500">Early exit penalty</span><span className="text-red-600">− ₹500</span></div>
                        <div className="flex justify-between pt-2 border-t border-zinc-200"><span className="text-zinc-900">You'll receive</span><span className="text-zinc-900 font-black">₹2,920</span></div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setShowExitConfirm(false)} className="flex-1 bg-zinc-100 text-zinc-900 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all">Stay in Campaign</button>
                        <button onClick={handleExitCampaign} className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95">Confirm Exit</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Camera overlay */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-6 animate-in fade-in">
          <div className="w-full max-w-sm aspect-[3/4] border-2 border-dashed border-white/30 rounded-[3rem] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
            <p className="text-white text-xs font-bold uppercase tracking-[0.2em] text-center z-10 px-10">Scan Vinyl QR Code on Rear Window</p>
          </div>
          <button onClick={() => setIsCameraOpen(false)} className="mt-12 w-20 h-20 rounded-full border-4 border-white/20 p-1">
            <div className="w-full h-full bg-white rounded-full" />
          </button>
          <button onClick={() => setIsCameraOpen(false)} className="absolute top-8 right-8 text-white font-bold text-sm">Cancel</button>
        </div>
      )}
    </div>
  );
}
