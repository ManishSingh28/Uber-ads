// components/BrandPortal.tsx
"use client";
import React, { useState } from 'react';
import Sidebar from './brand/Sidebar';
import Overview from './brand/Overview';
import CampaignManager from './brand/CampaignManager';
import CampaignModal from './brand/CampaignModal';
import HeatmapModal from './brand/HeatmapModal';

interface BrandPortalProps {
  setActivePage: (page: string) => void;
}

export default function BrandPortal({ setActivePage }: BrandPortalProps) {
  const [activeBrandSection, setActiveBrandSection] = useState('Overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      
      <Sidebar 
        activeBrandSection={activeBrandSection} 
        setActiveBrandSection={setActiveBrandSection} 
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            {activeBrandSection === 'Overview' && (
              <Overview setActiveBrandSection={setActiveBrandSection} />
            )}

            {activeBrandSection === 'Campaign Manager' && (
              <CampaignManager 
                setActivePage={setActivePage} 
                setSelectedCampaign={setSelectedCampaign} 
                setIsModalOpen={setIsModalOpen}
                setIsHeatmapOpen={setIsHeatmapOpen}
              />
            )}
        </div>
      </main>

      {/* MODALS */}
      {isModalOpen && selectedCampaign && (
        <CampaignModal 
            selectedCampaign={selectedCampaign} 
            setIsModalOpen={setIsModalOpen} 
            setActivePage={setActivePage} 
        />
      )}

      {isHeatmapOpen && (
        <HeatmapModal setIsHeatmapOpen={setIsHeatmapOpen} />
      )}
      
    </div>
  );
}