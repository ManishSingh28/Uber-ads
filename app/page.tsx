// app/page.tsx
"use client";
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import BrandPortal from '@/components/BrandPortal';
import CampaignWizard from '@/components/CampaignWizard';
import DriverPortal from '@/components/DriverPortal'; 
import BrandLogin from '@/components/BrandLogin';

export default function Home() {
  const [activeApp, setActiveApp] = useState('brand');
  
  // <-- CHANGE THIS STATE TO 'login' SO IT LOADS FIRST -->
  const [activePage, setActivePage] = useState('login');

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Hide the global navigation if we are on the login page */}
      {activePage !== 'login' && (
          <Navigation activeApp={activeApp} setActiveApp={setActiveApp} setActivePage={setActivePage} />
      )}

      <div className="flex-1">
          {activeApp === 'driver' && (
              <DriverPortal /> 
          )}

          {activeApp === 'brand' && (
              <>
                  {/* <-- NEW ROUTE FOR LOGIN --> */}
                  {activePage === 'login' && (
                      <BrandLogin setActivePage={setActivePage} />
                  )}

                  {activePage === 'brand-portal' && (
                    <BrandPortal setActivePage={setActivePage} />
                  )}
                  {activePage === 'create-campaign' && (
                    <CampaignWizard setActivePage={setActivePage} />
                  )}
              </>
          )}
      </div>
    </main>
  );
}