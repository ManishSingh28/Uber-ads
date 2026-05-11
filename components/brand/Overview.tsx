"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Overview({ setActiveBrandSection }: any) {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 pt-12">
       <h1 className="text-5xl font-bold mb-6 leading-tight">Maximize your brand’s <br/>reach on the road.</h1>
       <p className="text-lg text-zinc-600 mb-10 max-w-xl">
         Deploy digital and vinyl advertising across the world’s largest mobility fleet. 
         Track real-time impressions and optimize your OOH spend with Uber's first-party data.
       </p>
       
       <div className="grid md:grid-cols-2 gap-6">
          <div className="uber-card p-8 group cursor-pointer hover:border-black transition-all">
             <h3 className="text-xl mb-4">Start a campaign</h3>
             <p className="text-sm text-zinc-500 mb-6">Create new vinyl or digital ad-sets for targeted city zones.</p>
             <button 
                onClick={() => setActiveBrandSection('Campaign Manager')}
                className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all"
             >
                Get started <ArrowRight size={18} />
             </button>
          </div>
          
          <div className="uber-card p-8 group cursor-pointer hover:border-black transition-all">
             <h3 className="text-xl mb-4">View fleet performance</h3>
             <p className="text-sm text-zinc-500 mb-6">See how your active ads are performing in real-time across hubs.</p>
             <button className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                Analytics <ArrowRight size={18} />
             </button>
          </div>
       </div>
    </div>
  );
}