// components/CampaignWizard.tsx
"use client";
import React, { useState } from 'react';
import { ArrowRight, Library, CheckCircle2 } from 'lucide-react';

interface CampaignWizardProps {
  setActivePage: (page: string) => void;
}

export default function CampaignWizard({ setActivePage }: CampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto p-6 pt-10">
      <div className="flex items-center mb-10">
          <button onClick={() => setActivePage('brand-portal')} className="mr-4 text-gray-500 hover:text-black transition-colors font-bold flex items-center gap-2"><ArrowRight size={16} className="rotate-180"/> Back to Portal</button>
      </div>
      <h2 className="text-4xl font-black uppercase italic mb-10">Campaign Builder</h2>
      
      <div className="flex justify-between mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          {[1, 2, 3].map(step => (
              <div key={step} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full font-black flex items-center justify-center border-4 border-gray-50 shadow-sm transition-colors ${currentStep >= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>{step}</div>
                  <span className={`text-[10px] font-black mt-3 uppercase tracking-wider ${currentStep >= step ? 'text-black' : 'text-gray-400'}`}>{step === 1 ? 'Details' : step === 2 ? 'Location' : 'Review'}</span>
              </div>
          ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">
          {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Campaign Name</label>
                    <input type="text" placeholder="e.g. Summer Refresh 2026" className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-bold" />
                  </div>
                  <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Creative Assets</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:bg-gray-50 cursor-pointer transition-colors group">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors"><Library size={24}/></div>
                      <p className="text-gray-500 font-bold">Tap to Upload Vinyl Creative Assets</p>
                      <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, PDF formats</p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4"><button onClick={() => setCurrentStep(2)} className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">Next Step <ArrowRight size={16}/></button></div>
              </div>
          )}
          {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in">
                    <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Primary Zone</label>
                    <select className="w-full p-4 border border-gray-300 rounded-xl font-bold outline-none focus:border-black appearance-none bg-white"><option>Bengaluru, KA</option><option>Mumbai, MH</option><option>Delhi NCR</option></select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Hyper-Local Targeting Hubs</label>
                    <div className="grid grid-cols-2 gap-4">
                        {['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Jayanagar', 'Malleswaram'].map(area => (
                            <label key={area} className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-black transition-colors">
                              <input type="checkbox" defaultChecked={['Indiranagar', 'Koramangala', 'HSR Layout'].includes(area)} className="w-5 h-5 accent-black mr-3" /> 
                              <span className="text-sm font-bold">{area}</span>
                            </label>
                        ))}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                      <button onClick={() => setCurrentStep(1)} className="text-gray-500 font-bold hover:text-black transition-colors">← Back</button>
                      <button onClick={() => setCurrentStep(3)} className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">Next Step <ArrowRight size={16}/></button>
                  </div>
              </div>
          )}
          {currentStep === 3 && (
              <div className="space-y-8 text-center animate-in fade-in py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40}/></div>
                  <h3 className="text-2xl font-black">Campaign Ready for Review</h3>
                  <p className="text-gray-500 max-w-md mx-auto">Your campaign targeting 3 zones in Bengaluru is ready to be routed to local hubs for vinyl printing and installation.</p>
                  
                  <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 max-w-md mx-auto mt-8">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Estimated Fleet Commitment</p>
                      <h4 className="text-3xl font-black text-gray-900 mb-6">500 Autos</h4>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Total Estimated Budget</p>
                      <h4 className="text-4xl font-black text-green-600">₹900,000</h4>
                  </div>
                  
                  <div className="flex justify-between pt-10">
                      <button onClick={() => setCurrentStep(2)} className="text-gray-500 font-bold hover:text-black transition-colors">← Back</button>
                      <button onClick={() => {alert('Campaign Deployed to Hubs!'); setActivePage('brand-portal')}} className="bg-blue-600 text-white px-12 py-4 rounded-xl font-black shadow-lg hover:bg-blue-700 transition-all hover:shadow-blue-200 active:scale-95">AUTHORIZE & DEPLOY</button>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}