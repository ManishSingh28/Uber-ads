// component/RiderExperience.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Star, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function RiderExperience({ setActivePage }: any) {
  // Flow States: 'en-route' -> 'ad-triggered' -> 'interacted' -> 'arrived'
  const [rideState, setRideState] = useState('en-route');

  // Simulate the flow automatically for the presentation
  useEffect(() => {
      if (rideState === 'en-route') {
          // After 3 seconds of driving, trigger the ad
          const timer = setTimeout(() => setRideState('ad-triggered'), 3500);
          return () => clearTimeout(timer);
      }
      if (rideState === 'interacted') {
          // After 3 seconds of showing the success state, finish the ride
          const timer = setTimeout(() => setRideState('arrived'), 3000);
          return () => clearTimeout(timer);
      }
  }, [rideState]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      
      {/* MOBILE DEVICE SIMULATOR */}
      <div className="w-[390px] h-[844px] bg-slate-900 rounded-[50px] shadow-2xl relative overflow-hidden border-[8px] border-slate-800 flex flex-col justify-between">
        
        {/* Fake Map Background */}
        <div className="absolute inset-0 z-0 bg-[#e5e3df] overflow-hidden flex items-center justify-center">
            {/* Grid pattern simulating map blocks */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            {/* The "Route" line */}
            {rideState !== 'arrived' && (
                <div className="absolute w-1 h-64 bg-black rotate-45 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                    <div className="w-4 h-4 bg-black rounded-full absolute -top-2 -left-1.5 border-2 border-white"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded-full absolute -bottom-3 -left-2.5 border-4 border-white shadow-lg animate-pulse flex items-center justify-center"><Navigation size={10} className="text-white"/></div>
                </div>
            )}
        </div>

        {/* Top UI Bar */}
        <div className="relative z-10 pt-14 px-6 flex justify-between items-center">
            <div className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer" onClick={() => setActivePage('brand-portal')}>
                <X size={20} className="text-gray-900"/>
            </div>
            {rideState !== 'arrived' && (
                <div className="bg-white shadow-md px-4 py-2 rounded-full font-black text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    En Route
                </div>
            )}
        </div>

        {/* BOTTOM SHEETS */}
        <div className="relative z-20 w-full transition-all duration-700 ease-in-out pb-8">
            
            {/* STATE 1: STANDARD RIDE UI */}
            {(rideState === 'en-route' || rideState === 'arrived') && (
                <div className="bg-white mx-4 rounded-3xl p-6 shadow-xl animate-in slide-in-from-bottom-10 fade-in">
                    {rideState === 'en-route' ? (
                        <>
                            <h2 className="text-2xl font-black text-gray-900 mb-1">Arriving at 15:42</h2>
                            <p className="text-gray-500 text-sm font-medium mb-6">Kempegowda Int'l Airport (BLR)</p>
                            <div className="flex items-center gap-4 border-t pt-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden"><img src="https://ui-avatars.com/api/?name=Ramesh+K&background=random" alt="Driver" /></div>
                                <div className="flex-1">
                                    <p className="font-bold">Ramesh Kumar</p>
                                    <div className="flex items-center text-xs font-bold text-gray-500 gap-1"><Star size={12} className="fill-amber-400 text-amber-400"/> 4.9 • KA 01 AB 1234</div>
                                </div>
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"><Navigation size={16}/></div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32}/></div>
                            <h2 className="text-2xl font-black text-gray-900 mb-2">You have arrived</h2>
                            <p className="text-gray-500 text-sm font-medium mb-6">Hope you enjoyed your ride.</p>
                            <button onClick={() => setActivePage('brand-portal')} className="w-full bg-black text-white font-bold py-4 rounded-xl">Rate Trip & Exit</button>
                        </div>
                    )}
                </div>
            )}

            {/* STATE 2: THE ADVERTISEMENT TRIGGER */}
            {rideState === 'ad-triggered' && (
                <div className="bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-20 duration-500">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2"></div>
                    
                    <div className="px-6 py-4 flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-200 px-2 py-1 rounded">Sponsored</span>
                        <button onClick={() => setRideState('arrived')} className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">Skip Ad</button>
                    </div>

                    <div className="px-6 pb-6 text-center">
                        <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600" className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" alt="Coca Cola Ad" />
                        <h2 className="text-2xl font-black italic tracking-tight mb-2">Beat the Heat in Bengaluru</h2>
                        <p className="text-gray-500 text-sm px-4 mb-6 leading-relaxed">Save 50% on your next order of Coca-Cola via Blinkit. Offer valid for the next 2 hours.</p>
                        
                        {/* Micro-Interaction: Claiming the offer */}
                        <button 
                            onClick={() => setRideState('interacted')} 
                            className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-red-700 active:scale-95 transition-all flex justify-center items-center gap-2"
                        >
                            CLAIM 50% OFF OFFER <ChevronRight size={18}/>
                        </button>
                    </div>
                </div>
            )}

            {/* STATE 3: INTERACTED (SUCCESS) */}
            {rideState === 'interacted' && (
                <div className="bg-white mx-4 rounded-3xl p-8 shadow-xl text-center animate-in zoom-in-95 fade-in">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-[4px] border-green-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1024px-Coca-Cola_logo.svg.png" className="w-12 object-contain opacity-80" alt="Coke"/>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Offer Saved to Wallet!</h3>
                    <p className="text-gray-500 text-sm mb-4">Check your email or Uber Wallet for the Blinkit promo code.</p>
                    <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-black h-full animate-[progress_3s_ease-in-out_forwards]"></div>
                    </div>
                </div>
            )}
            
        </div>
      </div>

      {/* Presentation Context for Directors */}
      <div className="ml-16 max-w-sm">
          <h3 className="text-xl font-black uppercase italic text-gray-900 mb-4 border-b-2 border-black pb-2 inline-block">Rider End-to-End Flow</h3>
          <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-gray-200 text-xs font-black text-black flex items-center justify-center flex-shrink-0 mt-0.5">1</div> Ride enters targeted geo-fence.</li>
              <li className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-gray-200 text-xs font-black text-black flex items-center justify-center flex-shrink-0 mt-0.5">2</div> High-context ad triggers automatically.</li>
              <li className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-gray-200 text-xs font-black text-black flex items-center justify-center flex-shrink-0 mt-0.5">3</div> Micro-interaction captures intent & routes to partner (Blinkit).</li>
              <li className="flex items-start gap-3"><div className="w-5 h-5 rounded-full bg-gray-200 text-xs font-black text-black flex items-center justify-center flex-shrink-0 mt-0.5">4</div> Frictionless exit upon arrival.</li>
          </ul>
          
          <button 
              onClick={() => setRideState('en-route')}
              className="mt-8 border-2 border-black text-black font-black uppercase text-xs tracking-widest px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors"
          >
              Restart Simulation
          </button>
      </div>

    </div>
  );
}