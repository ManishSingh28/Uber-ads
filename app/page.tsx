// app/page.tsx
"use client";
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import BrandPortal from '../components/BrandPortal';
import CampaignWizard from '../components/CampaignWizard';
import DriverPortal from '../components/DriverPortal';

export default function UberAdDrive() {
  const [activePage, setActivePage] = useState('brand-portal');

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <Navigation activePage={activePage} setActivePage={setActivePage} />

      {activePage === 'brand-portal' && (
        <BrandPortal setActivePage={setActivePage} />
      )}

      {activePage === 'create-campaign' && (
        <CampaignWizard setActivePage={setActivePage} />
      )}

      {activePage === 'driver-portal' && (
        <DriverPortal />
      )}
    </div>
  );
}