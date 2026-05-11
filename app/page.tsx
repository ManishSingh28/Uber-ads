// app/page.tsx
"use client";
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import BrandPortal from '@/components/BrandPortal';
import CampaignWizard from '@/components/CampaignWizard';
import DriverPortal from '@/components/DriverPortal'; // Make sure this path is correct
import RiderExperience from '@/components/RiderExperience'; 

export default function Home() {
  // Master state controlling the global view (Brand vs Driver mode)
  const [activeApp, setActiveApp] = useState('brand');
  
  // State controlling the specific page within the Brand flow
  const [activePage, setActivePage] = useState('brand-portal');

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Global Top Navigation */}
      <Navigation activeApp={activeApp} setActiveApp={setActiveApp} setActivePage={setActivePage} />

      <div className="flex-1">
          {/* DRIVER MODE */}
          {activeApp === 'driver' && (
              <DriverPortal /> 
          )}

          {/* BRAND MODE ROUTING */}
          {activeApp === 'brand' && (
              <>
                  {activePage === 'brand-portal' && (
                    <BrandPortal setActivePage={setActivePage} />
                  )}
                  
                  {activePage === 'create-campaign' && (
                    <CampaignWizard setActivePage={setActivePage} />
                  )}

                  {activePage === 'rider-experience' && (
                    <RiderExperience setActivePage={setActivePage} />
                  )}
              </>
          )}
      </div>
    </main>
  );
}