// component/CampaignWizard.tsx
"use client";
import React, { useState } from 'react';
import Step1Details from './wizard/Step1Details';
import Step2Location from './wizard/Step2Location';
import Step3Review from './wizard/Step3Review';
import { ArrowRight } from 'lucide-react';

interface CampaignWizardProps {
  setActivePage: (page: string) => void;
}

export default function CampaignWizard({ setActivePage }: CampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Master State for the entire form
  const [formData, setFormData] = useState({
    name: '', brand: '', category: '', costModel: '', startDate: '', endDate: '', cities: [] as string[]
  });

  // Helper to update state from child components
  const updateForm = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  // Action Handlers
  const handleGoBack = () => {
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
    } else {
        setActivePage('brand-portal'); // If on step 1, go back to dashboard
    }
  };

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard this campaign? All progress will be lost.")) {
      setActivePage('brand-portal');
    }
  };

  const handleSaveDraft = () => {
    alert("Campaign saved to Drafts!");
    setActivePage('brand-portal');
  };

  const handleContinue = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else {
      alert('Campaign Submitted for Approval!');
      setActivePage('brand-portal');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-10 pb-24">
      {/* TOP NAVIGATION HEADER */}
      <div className="flex items-center mb-10">
          <button onClick={() => setActivePage('brand-portal')} className="mr-4 text-gray-500 hover:text-black transition-colors font-bold flex items-center gap-2">
              <ArrowRight size={16} className="rotate-180"/> Back to Portal
          </button>
      </div>
      <h2 className="text-4xl font-black uppercase italic mb-10">Campaign Builder</h2>
      
      {/* PROGRESS TRACKER */}
      <div className="flex justify-between mb-12 relative max-w-2xl mx-auto">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          {[1, 2, 3].map(step => (
              <div key={step} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full font-black flex items-center justify-center border-4 border-gray-50 shadow-sm transition-colors ${currentStep >= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}>{step}</div>
                  <span className={`text-[10px] font-black mt-3 uppercase tracking-wider ${currentStep >= step ? 'text-black' : 'text-gray-400'}`}>
                      {step === 1 ? 'Campaign Details' : step === 2 ? 'Banner & Locations' : 'Review & Pay'}
                  </span>
              </div>
          ))}
      </div>

      {/* RENDER CURRENT STEP */}
      <div className="bg-white border border-gray-200 rounded-[32px] p-10 shadow-sm mb-8 min-h-[500px]">
          {currentStep === 1 && <Step1Details formData={formData} updateForm={updateForm} />}
          {currentStep === 2 && <Step2Location formData={formData} updateForm={updateForm} />}
          {currentStep === 3 && <Step3Review formData={formData} />}
      </div>

      {/* GLOBAL FOOTER (ACTION BAR) */}
      <div className="flex justify-between items-center px-2">
        
        {/* BOTTOM LEFT: GO BACK */}
        <div>
            <button 
                onClick={handleGoBack} 
                className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:text-black transition-all uppercase text-sm tracking-wide shadow-sm"
            >
                ← Go Back
            </button>
        </div>

        {/* BOTTOM RIGHT: ACTION CLUSTER */}
        <div className="flex gap-4 items-center">
            <button 
                onClick={handleDiscard} 
                className="bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all uppercase text-sm tracking-wide shadow-sm"
            >
                Discard Campaign
            </button>
            
            <button 
                onClick={handleSaveDraft} 
                className="bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 hover:text-black transition-all uppercase text-sm tracking-wide shadow-sm"
            >
                Save as Draft
            </button>
            
            <button 
                onClick={handleContinue} 
                className="bg-blue-600 border border-blue-600 text-white px-10 py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 uppercase text-sm tracking-wide active:scale-95"
            >
                {currentStep === 3 ? 'Submit for Approval' : 'Continue →'}
            </button>
        </div>

      </div>
    </div>
  );
}